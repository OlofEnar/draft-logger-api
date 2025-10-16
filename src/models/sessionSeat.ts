import { z } from "zod"

export const SessionSeatCreate = z.object ({
      sessionId: z.int(),
      seat: z.int(),
      playerId: z.int(),
      colors: z.string(),
      archetype: z.string(),
});

export type SessionSeat = z.infer<typeof SessionSeatCreate>;