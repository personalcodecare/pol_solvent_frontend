'use client'

import { publicEnvs } from '@/config/env'
import { config } from '@/config/wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { ReactNode } from 'react'
import { State, WagmiProvider } from 'wagmi'
import { WebSocketProvider } from './socket'

const queryClient = new QueryClient()

createWeb3Modal({
  wagmiConfig: config,
  projectId: publicEnvs.NEXT_PUBLIC_PROJECT_ID,
  enableAnalytics: true,
})

export function ContextProvider({
  children,
  initialState,
}: {
  children: ReactNode
  initialState?: State
}) {
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <WebSocketProvider>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </WebSocketProvider>
    </WagmiProvider>
  )
}
