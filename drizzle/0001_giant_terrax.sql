PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_session_seats` (
	`session_id` integer NOT NULL,
	`seat` integer NOT NULL,
	`player_id` integer NOT NULL,
	`colors` text,
	`archetype` text,
	PRIMARY KEY(`session_id`, `seat`),
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_session_seats`("session_id", "seat", "player_id", "colors", "archetype") SELECT "session_id", "seat", "player_id", "colors", "archetype" FROM `session_seats`;--> statement-breakpoint
DROP TABLE `session_seats`;--> statement-breakpoint
ALTER TABLE `__new_session_seats` RENAME TO `session_seats`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `ux_session_player` ON `session_seats` (`session_id`,`player_id`);--> statement-breakpoint
CREATE INDEX `ix_session_seats_player` ON `session_seats` (`player_id`);