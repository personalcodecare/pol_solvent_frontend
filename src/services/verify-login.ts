import { api } from './api'

export const verifyLogin = async (address: string, signature: string) => {
  const response = await api(
    '/auth/verify',
    { method: 'POST' },
    { address, signature },
  )
  return response
}
