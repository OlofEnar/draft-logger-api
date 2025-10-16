import { z } from "zod";

export const PlayerCreate = z.object({
    name: z.string().min(1).max(20),
});

export type Player = z.Infer<typeof PlayerCreate>;