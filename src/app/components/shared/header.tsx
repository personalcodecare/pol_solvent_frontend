'use client'
import { formatAddress } from '@/utils/format-address'
import Link from 'next/link'
import { useAccount } from 'wagmi'
import SolventLabsLogo from '../icons/logo'
import { DisconnectWalletButton } from './disconnect-wallet-button'
import { OpenWalletButton } from './open-wallet-button'

interface HeaderProps {
  isGameStarting?: boolean
}

export const Header = ({ isGameStarting }: HeaderProps) => {
  const { address, isConnected } = useAccount()
  const isDevelopment = false

  return (
    <header className="bg-transparent p-[20px] text-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between">
        <div className="text-4xl font-bold">
          <Link href="/">
            <SolventLabsLogo />
          </Link>
        </div>
        {isConnected ? (
          <div className="flex items-center gap-4">
            <OpenWalletButton
              className={`${isGameStarting ? 'text-darkMain' : 'text-brightGreen'} text-[20px] leading-[25.6px]`}
            >
              {isConnected ? formatAddress(address) : 'Connect Wallet'}
            </OpenWalletButton>
            {isDevelopment && (
              <DisconnectWalletButton className="border-steelBlue bg-transparent px-4 py-2 text-[20px] leading-[25.6px] text-white transition-colors duration-300 hover:border-white hover:text-white">
                Disconnect
              </DisconnectWalletButton>
            )}
          </div>
        ) : (
          <OpenWalletButton
            className={`${isGameStarting ? 'text-darkMain' : 'text-brightGreen'} text-[20px] leading-[25.6px]`}
          >
            Connect Wallet
          </OpenWalletButton>
        )}
      </div>
    </header>
  )
}
