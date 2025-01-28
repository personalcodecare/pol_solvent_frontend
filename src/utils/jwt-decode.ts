import { getCookie } from 'cookies-next'
import { jwtDecode } from 'jwt-decode'

export const getPlayerIdFromToken = (): string | null => {
  const authToken = getCookie('auth_token')

  if (authToken) {
    try {
      const decodedToken = jwtDecode<{ userId: string }>(authToken)
      return decodedToken.userId
    } catch (error) {
      console.error('Error decoding access token:', error)
    }
  }
  return null
}
