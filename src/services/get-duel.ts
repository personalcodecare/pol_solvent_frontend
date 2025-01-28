import { DuelResponseSchema } from '@/validators/duelsSchema'
import { api } from './api'

export const getDuel = async (duelId: number | null) => {
  if (!duelId || isNaN(duelId) || duelId <= 0) {
    return
  }

  try {
    const apiResponse = await api(`/duels/${duelId}`, { method: 'GET' })

    if (!apiResponse.ok) {
      const errorData = await apiResponse.json()
      throw new Error(errorData.error || `Failed to get duel with ID ${duelId}`)
    }

    const data = await apiResponse.json()
    return DuelResponseSchema.parse(data)
  } catch (error) {
    console.error(`Error fetching duel with ID ${duelId}:`, error)
    throw error
  }
}
