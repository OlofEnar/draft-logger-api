import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/client";
import { sessionSeats } from "../db/schema";
import {SessionSeatCreate} from "../models/sessionSeat";

const sessionSeatRoutes: FastifyPluginAsync = async (app) => {

    type NewSessionSeat = typeof sessionSeats.$inferInsert; 

    app.get('/', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await db.select().from(sessionSeats);
        } catch (err) {
            app.log.error(err);
            rep.status(500).send({ error: "Failed to fetch session seats"});
        }
    });

        app.post('/', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
    
                const body = SessionSeatCreate.parse(req.body);
    
                const newSessionSeat: NewSessionSeat = {
                    sessionId: body.sessionId,
                    seat: body.seat,
                    playerId: body.playerId,
                    colors: body.colors, 
                    archetype: body.archetype
            };
    
            const inserted = await db
            .insert(sessionSeats)
            .values(newSessionSeat)
            .onConflictDoNothing()
            .returning()
            .get();
        
            return rep.status(201).send(inserted);
        } catch (err) {
            app.log.error(err);
            return rep.status(500).send({ error: "Failed to insert session"});
        }
        });
};

export default sessionSeatRoutes;