import { useToast } from '@/components/ui/use-toast'
import { useSocket } from '@/contexts/socket'
import { requestLogin } from '@/services/request-login'
import { verifyLogin } from '@/services/verify-login'
import { isTokenExpired } from '@/utils/is-token-expired'
import { getCookie, setCookie } from 'cookies-next'
import { useEffect } from 'react'
import { useAccount, useSignMessage } from 'wagmi'

export const useAutoLogin = () => {
  const { address } = useAccount()
  const { signMessage } = useSignMessage()
  const { toast } = useToast()
  const { initializeConnection } = useSocket()

  useEffect(() => {
    const handleLogin = async () => {
      if (address) {
        try {
          const responseRequestLogin = await requestLogin(address)
          const { message } = await responseRequestLogin.json()

          signMessage(
            { message },
            {
              onSuccess: async (data) => {
                const responseVerify = await verifyLogin(address, data)

                if (responseVerify.status === 200) {
                  const { token } = await responseVerify.json()
                  setCookie('auth_token', token)
                  initializeConnection()
                  toast({
                    title: 'Login successful',
                    description: 'You have successfully logged in',
                  })
                } else {
                  toast({
                    title: 'Login failed',
                    description: 'An error occurred while signing the message',
                    variant: 'destructive',
                  })
                }
              },
              onError: (error) => {
                console.error('Error signing message:', error)
                toast({
                  title: 'Login failed',
                  description: 'An error occurred while signing the message',
                  variant: 'destructive',
                })
              },
            },
          )
        } catch (error) {
          console.error('Login error:', error)
        }
      }
    }

    const token = getCookie('auth_token') as string | undefined
    const prevAddress = localStorage.getItem('prevAddress')
    const shouldLogin = address !== prevAddress || isTokenExpired(token)

    if (shouldLogin) {
      handleLogin()
    }

    if (address) {
      localStorage.setItem('prevAddress', address)
    }
  }, [address, signMessage, toast, initializeConnection])
}
