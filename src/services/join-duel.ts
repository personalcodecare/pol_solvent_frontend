import { api } from './api'

type JoinDuelParams = {
  duelId: number
}

export const joinDuel = async ({ duelId }: JoinDuelParams) => {
  const apiResponse = await api(`/duels/${duelId}/join`, { method: 'POST' }, {})

  if (!apiResponse.ok) {
    const errorData = await apiResponse.json()
    throw new Error(errorData.error || 'Failed to join game')
  }

  const parsedResponse = await apiResponse.json()
  return parsedResponse
}
