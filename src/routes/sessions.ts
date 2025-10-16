import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/client";
import { sessions } from "../db/schema";
import { SessionCreate } from "../models/session";

const sessionsRoutes: FastifyPluginAsync = async (app) => {

    type NewSession = typeof sessions.$inferInsert;
    const formattedDate = new Date().toISOString().slice(0, 10);


    app.get('/', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await db.select().from(sessions);
        } catch (err) {
            app.log.error(err);
            rep.status(500).send({ error: "Failed to fetch sessions"});
        }
    });

    app.post('/', async (req: FastifyRequest, rep: FastifyReply) => {
    try {

            const body = SessionCreate.parse(req.body);
            const newSession: NewSession = {
                date: formattedDate,
                format: body.format,
                setCode: body.setCode,
                cubeId: body.cubeId,
                notes: body.notes,
        };

        const inserted = await db
        .insert(sessions)
        .values(newSession)
        .onConflictDoNothing()
        .returning()
        .get();

        if (!inserted) {
        }

        return rep.status(201).send(inserted);
    } catch (err) {
        app.log.error(err);
        return rep.status(500).send({ error: "Failed to insert session"});
    }
    });
};

export default sessionsRoutes;