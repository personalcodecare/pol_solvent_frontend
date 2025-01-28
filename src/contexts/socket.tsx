import { publicEnvs } from '@/config/env'
import { getCookie } from 'cookies-next'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { io, Socket } from 'socket.io-client'

interface WebSocketContextType {
  socket: Socket | null
  sendMessage: (
    event: string,
    message: unknown,
    options?: { volatile?: boolean },
  ) => void
  isConnected: boolean
  reconnectAttempts: number
  initializeConnection: () => void
}

const WebSocketContext = createContext<WebSocketContextType | null>(null)

export const useSocket = () => {
  const context = useContext(WebSocketContext)
  if (!context) {
    throw new Error('useSocket must be used within a WebSocketProvider')
  }
  return context
}

export const WebSocketProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [reconnectAttempts, setReconnectAttempts] = useState(0)

  const connect = useCallback(() => {
    const token = getCookie('auth_token')
    if (!token) {
      console.error('Authentication token is missing')
      return
    }

    if (socket && socket.connected) {
      console.warn('Socket already connected. Skipping reconnection.')
      return
    }

    const newSocket = io(publicEnvs.NEXT_PUBLIC_WS_BASE_URL, {
      auth: { token },
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 10000, // 10 seconds
      reconnectionDelayMax: 60000, // 60 seconds
      randomizationFactor: 0.5,
      timeout: 20000,
      autoConnect: false, // We'll connect manually
      transports: ['websocket'],
    })

    newSocket.on('connect', () => {
      console.warn('Socket.IO connected')
      setIsConnected(true)
      setReconnectAttempts(0)
    })

    newSocket.on('disconnect', (reason) => {
      console.warn('Socket.IO disconnected:', reason)
      setIsConnected(false)
    })

    newSocket.on('connect_error', (error) => {
      console.error('Socket.IO connection error:', error)
      setReconnectAttempts((prev) => prev + 1)
      if (error.message === 'Invalid token') {
        // TODO: Handle invalid token error here
      }
    })

    newSocket.on('error', (error) => {
      console.error('Socket.IO error:', error)
    })

    newSocket.io.on('reconnect_attempt', (attempt) => {
      console.warn('Reconnection attempt:', attempt)
    })

    newSocket.io.on('reconnect_failed', () => {
      console.error('Reconnection failed')
    })

    setSocket(newSocket)
    newSocket.connect()

    // const heartbeatInterval = setInterval(() => {
    //   if (newSocket.connected) {
    //     newSocket.emit('HEARTBEAT')
    //   }
    // }, 60000)

    return () => {
      // clearInterval(heartbeatInterval)
      newSocket.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    const cleanup = connect()
    return cleanup
  }, [connect])

  const sendMessage = useCallback(
    (event: string, message: unknown, options: { volatile?: boolean } = {}) => {
      if (socket && socket.connected) {
        if (options.volatile) {
          socket.volatile.emit(event, message)
        } else {
          socket.emit(event, message)
        }
      } else {
        console.warn(
          'Socket.IO is not connected. Message not sent:',
          event,
          message,
        )
        connect()
      }
    },
    [socket, connect],
  )

  const initializeConnection = useCallback(() => {
    const cleanup = connect()
    return cleanup
  }, [connect])

  const value = {
    socket,
    sendMessage,
    isConnected,
    reconnectAttempts,
    initializeConnection,
  }

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  )
}
