import { z } from 'zod'

const DuelStatusSchema = z.object({
  winner: z.string().nullable(),
  hostScore: z.number(),
  joinerScore: z.number(),
})

export const ActionSchema = z.object({
  id: z.number(),
  gameId: z.number(),
  playerId: z.number(),
  actionType: z.string(),
  roundNumber: z.number(),
  createdAt: z.string().datetime(),
})

export const DuelSchema = z.object({
  id: z.number(),
  hostId: z.number(),
  joinerId: z.number().nullable(),
  wagerAmount: z.string(),
  gameStatus: z.string(),
  contractGameId: z.string().nullable(),
  winnerId: z.number().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  actions: z.array(ActionSchema).optional(),
  duelStatus: DuelStatusSchema.optional(),
})

export const DuelsResponseSchema = z.array(DuelSchema)
export const DuelResponseSchema = DuelSchema
