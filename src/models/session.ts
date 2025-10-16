import { z } from "zod"

export const SessionFormat = z.enum(["LIMITED", "CUBE"]);

export const SessionCreate = z.object ({
      format: SessionFormat,
      setCode: z.string().length(3).optional(),
      cubeId: z.string().optional(),
      notes: z.string().max(500).optional(),
})
      .refine(s => s.format === "LIMITED" ? !!s.setCode : true, {
            message: "setCode is required when format is Limited",
            path: ["setCode"],
      })
      .refine(s => s.format === "CUBE" ? !!s.cubeId : true, {
            message: "cubeId is required when format is Cube",
            path: ["cubeId"]
      });

export type SessionCreate = z.infer<typeof SessionCreate>;

export const SessionDTO = z.object({
      id: z.string(),
      date: z.string(),
      format: SessionFormat,
      setCode: z.string().optional(),
      cubeId: z.string().optional(),
      notes: z.string().optional(),
});

export type SessionDTO = z.infer<typeof SessionDTO>;