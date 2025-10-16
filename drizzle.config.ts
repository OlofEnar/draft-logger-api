import "dotenv/config";
import { defineConfig } from "drizzle-kit";

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;
if (!authToken) throw new Error("authToken is missing");
if (!url) throw new Error("url is missing");

export default defineConfig({
  out: "./drizzle",
  schema: "./src/db/schema.ts",
  dialect: "turso",
  dbCredentials: {
    url,
    authToken,
  },
});
