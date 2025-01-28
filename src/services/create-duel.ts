import { api } from './api'

type CreateDuelParams = {
  wagerAmount: number
}

export const createDuel = async ({ wagerAmount }: CreateDuelParams) => {
  const apiResponse = await api(`/duels`, { method: 'POST' }, { wagerAmount })

  if (!apiResponse.ok) {
    const errorData = await apiResponse.json()
    throw new Error(errorData.error || 'Failed to create a duel')
  }

  const parsedResponse = await apiResponse.json()
  return parsedResponse
}
