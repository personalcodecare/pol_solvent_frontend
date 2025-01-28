import { z } from 'zod'

const FeeSchema = z.object({
  fee: z.number(),
})

export const FeeResponseSchema = FeeSchema
