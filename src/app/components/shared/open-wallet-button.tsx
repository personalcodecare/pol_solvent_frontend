'use client'

import { useAutoLogin } from '@/hooks/useAutoLogin'
import { useWeb3Modal } from '@web3modal/wagmi/react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { useAccount } from 'wagmi'

interface OpenWalletButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
}

export const OpenWalletButton = ({
  children,
  ...props
}: OpenWalletButtonProps) => {
  const { open } = useWeb3Modal()
  const { isConnected } = useAccount()

  useAutoLogin()

  const handleLogin = async () => {
    if (!isConnected) {
      await open()
    }
  }

  return (
    <button onClick={handleLogin} {...props}>
      {children}
    </button>
  )
}
