import {
  sqliteTable as table,
  text,
  integer,
  primaryKey,
  uniqueIndex,
  index,
} from "drizzle-orm/sqlite-core";

/** PLAYERS **/
export const players = table("players", {
  id: integer("id").primaryKey(),
  name: text("name").notNull().unique(),
});

/** SESSIONS **/
export const sessions = table("sessions", {
  id: integer("id").primaryKey(),
  date: text("date").notNull(),
  format: text("format").notNull(), // 'Limited' | 'Cube'
  setCode: text("set_code"), // 'MH3'
  cubeId: text("cube_id"), // 'Cubecobra id'
  notes: text("notes"),
});

/** SESSION SEATS **/
export const sessionSeats = table(
  "session_seats",
  {
    sessionId: integer("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    seat: integer("seat").notNull(),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id),
    colors: text("colors"), // 'UR'
    archetype: text("archetype"), // 'Spells'
  },
  (t) => [
    // One row per seat within a session
    primaryKey({ columns: [t.sessionId, t.seat], name: "pk_session_seat" }),
    uniqueIndex("ux_session_player").on(t.sessionId, t.playerId),
    index("ix_session_seats_player").on(t.playerId),
  ],
);

/** MATCHES **/
export const matches = table(
  "matches",
  {
    id: integer("id").primaryKey(),
    sessionId: text("session_id")
      .notNull()
      .references(() => sessions.id, { onDelete: "cascade" }),
    playerA: text("player_a")
      .notNull()
      .references(() => players.id),
    playerB: text("player_b")
      .notNull()
      .references(() => players.id),
    winner: text("winner"),
    aGamesWon: integer("a_games_won").notNull().default(0),
    bGamesWon: integer("b_games_won").notNull().default(0),
  },
  (t) => [index("ix_matches_players").on(t.playerA, t.playerB)],
);
