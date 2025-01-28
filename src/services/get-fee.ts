import { FeeResponseSchema } from '@/validators/feeSchema'
import { api } from './api'

export const getFee = async () => {
  const apiResponse = await api('/fee', { method: 'GET' })
  const parsedResponse = FeeResponseSchema.parse(await apiResponse.json())
  return parsedResponse
}
