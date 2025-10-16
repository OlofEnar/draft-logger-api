import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/client";
import { matches } from "../db/schema";
import { z } from "zod";

const matchesRoutes: FastifyPluginAsync = async (app) => {
    app.get('/', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const allMatches = await db.select().from(matches);
            return allMatches; 
        } catch (err) {
            app.log.error(err);
            rep.status(500).send({ error: "Failed to fetch matches"});
        }
    });

        app.get('/:id', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const match = await db.select().from(matches);
            return match; 
        } catch (err) {
            app.log.error(err);
            rep.status(500).send({ error: "Failed to fetch match"});
        }
    });
};

export default matchesRoutes;