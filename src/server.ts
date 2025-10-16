import Fastify from "fastify";
import cors from "@fastify/cors";
import "dotenv/config";
import { type ZodTypeProvider, validatorCompiler, serializerCompiler } from "fastify-type-provider-zod";

import playersRoutes from "./routes/players";  
import sessionsRoutes from "./routes/sessions";
import sessionSeatRoutes from "./routes/sessionSeat";
import matchesRoutes from "./routes/matches";

const app = Fastify({ logger: true })
.withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

await app.register(cors, {
  origin: [process.env.WEB_ORIGIN ?? "http://localhost:3000"],
});

app.register(playersRoutes,     { prefix: "/players" });
app.register(sessionsRoutes,    { prefix: "/sessions" });
app.register(sessionSeatRoutes, { prefix: "/session-seats" });
app.register(matchesRoutes,     { prefix: "/matches" });

const port = Number(process.env.PORT) || 3001;
app.listen({ host: "0.0.0.0", port });
