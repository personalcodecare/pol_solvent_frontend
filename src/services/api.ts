import { publicEnvs } from '@/config/env'
import { getCookie } from 'cookies-next'

export const api = (
  path: string,
  options?: RequestInit,
  body?: Record<string, unknown>,
) => {
  const authToken = getCookie('auth_token')
  const firstChar = path.charAt(0)
  const separator = firstChar === '/' ? '' : '/'

  return fetch(`${publicEnvs.NEXT_PUBLIC_API_BASE_URL}${separator}${path}`, {
    ...options,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...options?.headers,
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  })
}
