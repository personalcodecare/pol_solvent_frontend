import { defaultWagmiConfig } from '@web3modal/wagmi/react/config'
import { cookieStorage, createStorage } from 'wagmi'
import { polygonAmoy } from 'wagmi/chains'
import { publicEnvs } from './env'

const metadata = {
  name: 'Solvent Labs',
  description: 'Decision duel game',
  url: process.env.NEXT_PUBLIC_APP_BASE_URL || '',
  icons: [],
}

export const config = defaultWagmiConfig({
  chains: [polygonAmoy],
  projectId: publicEnvs.NEXT_PUBLIC_PROJECT_ID,
  metadata,
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
})
