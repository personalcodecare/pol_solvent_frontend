import { api } from './api'

type DeleteDuelParams = {
  duelId: number
}

export const deleteDuel = async ({ duelId }: DeleteDuelParams) => {
  const apiResponse = await api(`/duels/${duelId}`, { method: 'DELETE' }, {})

  if (!apiResponse.ok) {
    const errorData = await apiResponse.json()
    throw new Error(
      errorData.error || 'An error occurred while trying to cancel the duel',
    )
  }

  return await apiResponse.json()
}
