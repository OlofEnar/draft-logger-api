CREATE TABLE `matches` (
	`id` integer PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`player_a` text NOT NULL,
	`player_b` text NOT NULL,
	`winner` text,
	`a_games_won` integer DEFAULT 0 NOT NULL,
	`b_games_won` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_a`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`player_b`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE INDEX `ix_matches_players` ON `matches` (`player_a`,`player_b`);--> statement-breakpoint
CREATE TABLE `players` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `players_name_unique` ON `players` (`name`);--> statement-breakpoint
CREATE TABLE `session_seats` (
	`session_id` integer NOT NULL,
	`seat` integer NOT NULL,
	`player_id` text NOT NULL,
	`colors` text,
	`archetype` text,
	PRIMARY KEY(`session_id`, `seat`),
	FOREIGN KEY (`session_id`) REFERENCES `sessions`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`player_id`) REFERENCES `players`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX `ux_session_player` ON `session_seats` (`session_id`,`player_id`);--> statement-breakpoint
CREATE INDEX `ix_session_seats_player` ON `session_seats` (`player_id`);--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` integer PRIMARY KEY NOT NULL,
	`date` text NOT NULL,
	`format` text NOT NULL,
	`set_code` text,
	`cube_id` text,
	`notes` text
);
