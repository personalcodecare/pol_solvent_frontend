import { useToast } from '@/components/ui/use-toast'
import { deleteCookie } from 'cookies-next'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useDisconnect } from 'wagmi'

interface DisconnectWalletButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const DisconnectWalletButton = ({
  children,
  ...props
}: DisconnectWalletButtonProps) => {
  const { disconnect } = useDisconnect()
  const { toast } = useToast()

  const handleDisconnect = async () => {
    try {
      disconnect()
      deleteCookie('auth_token')
      toast({
        title: 'Wallet disconnected',
        description: 'You have successfully disconnected your wallet',
        variant: 'default',
      })
    } catch (error) {
      console.error('Disconnect error:', error)
      toast({
        title: 'Disconnect failed',
        description: 'An error occurred while disconnecting your wallet',
        variant: 'destructive',
      })
    }
  }

  return (
    <button onClick={handleDisconnect} {...props}>
      {children}
    </button>
  )
}
