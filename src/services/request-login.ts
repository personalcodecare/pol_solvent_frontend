import { api } from './api'

export const requestLogin = async (address: string) => {
  const response = await api(
    '/auth/request-login',
    { method: 'POST' },
    { address },
  )
  return response
}
