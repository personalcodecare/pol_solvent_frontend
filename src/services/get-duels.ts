import { DuelsResponseSchema } from '@/validators/duelsSchema'
import { api } from './api'

export const getDuels = async () => {
  const apiResponse = await api('/duels', { method: 'GET' })

  if (!apiResponse.ok) {
    const errorData = await apiResponse.json()
    throw new Error(errorData.error || 'Failed to get duels')
  }

  const parsedDuels = DuelsResponseSchema.parse(await apiResponse.json())
  return parsedDuels
}
