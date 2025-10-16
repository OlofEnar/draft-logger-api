import { z } from "zod"

export const MatchCreate = z.object ({
  sessionId: z.string(),
  round: z.number().int().nullable().optional(),
  playerA: z.string(),
  playerB: z.string(),
  winner: z.enum(["A","B"]).nullable().optional(),
  aGamesWon: z.number().int(),
  bGamesWon: z.number().int(),
});

export type Match = z.infer<typeof MatchCreate>;