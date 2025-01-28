import { z } from 'zod'
import { withDevDefault } from './withDevDefault'

const schema = z.object({
  NEXT_PUBLIC_API_BASE_URL: withDevDefault(
    z.string().url(),
    'http://localhost:3333',
  ).transform((value) => {
    if (value.endsWith('/')) {
      return value.slice(0, -1)
    }
    return value
  }),
  NEXT_PUBLIC_APP_BASE_URL: withDevDefault(
    z.string().url(),
    'http://localhost:3000',
  ).transform((value) => {
    if (value.endsWith('/')) {
      return value.slice(0, -1)
    }
    return value
  }),
  NEXT_PUBLIC_CONTRACT_ADDRESS_SVTOKEN: z.string().startsWith('0x'),
  NEXT_PUBLIC_PROJECT_ID: withDevDefault(z.string(), 'no-tag'),
  NEXT_PUBLIC_WS_BASE_URL: withDevDefault(
    z.string().url(),
    'ws://localhost:8001',
  ),
  NEXT_PUBLIC_CONTRACT_ADDRESS_SOLVENT_LABS: z.string().startsWith('0x'),
})

export const publicEnvs = schema.parse({
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
  NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
  NEXT_PUBLIC_CONTRACT_ADDRESS_SVTOKEN:
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SVTOKEN,
  NEXT_PUBLIC_PROJECT_ID: process.env.NEXT_PUBLIC_PROJECT_ID,
  NEXT_PUBLIC_WS_BASE_URL: process.env.NEXT_PUBLIC_WS_BASE_URL,
  NEXT_PUBLIC_CONTRACT_ADDRESS_SOLVENT_LABS:
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SOLVENT_LABS,
})
