import type { FastifyPluginAsync, FastifyReply, FastifyRequest } from "fastify";
import { db } from "../db/client";
import { players } from "../db/schema";
import z from "zod";
import { eq } from "drizzle-orm";
import {PlayerCreate} from "../models/player";

const playersRoutes: FastifyPluginAsync = async (app) => {

    type NewPlayer = typeof players.$inferInsert;

    app.get('/', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            return await db.select().from(players);
        } catch (err) {
            app.log.error(err);
            rep.status(500).send({ error: "Failed to fetch players"});
        }
    });

    app.get('/:id', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
            const { id } = req.params as { id: number };
            const player = await db
            .select()
            .from(players)
            .where(eq(players.id, id))
            .get()

            if (!player) {
                return rep.status(404).send({ error: "Player not found"});
            }          
            return player; 

        } catch (err) {
            app.log.error(err);
            rep.status(500).send({ error: "Failed to fetch player"});
        }
    });

        app.post('/', async (req: FastifyRequest, rep: FastifyReply) => {
        try {
                const body = PlayerCreate.parse(req.body);
                const newPlayer: NewPlayer = {
                name: body.name
            };

            const inserted = await db
            .insert(players)
            .values(newPlayer)
            .onConflictDoNothing({ target: players.name})
            .returning()
            .get();

            if (!inserted) {
                return rep.status(409).send({ error: "Player already exists"});
            }

            return rep.status(201).send(inserted);
        } catch (err) {
            app.log.error(err);
            return rep.status(500).send({ error: "Failed to insert player"});
        }
    });
};

export default playersRoutes;