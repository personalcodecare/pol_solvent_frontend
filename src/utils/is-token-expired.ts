export const isTokenExpired = (token: string | undefined): boolean => {
  if (!token) return true
  try {
    const [, payload] = token.split('.')
    const { exp } = JSON.parse(atob(payload))
    return Date.now() >= exp * 1000
  } catch (error) {
    console.error('Error parsing token:', error)
    return true
  }
}
