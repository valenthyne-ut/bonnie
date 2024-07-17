import { Client } from "discord.js";
import { Logger } from "../classes/Logger";
import config from "../config";

export const logger = new Logger("Client");

export const client = new Client({
	intents: config.DISCORD_APP_INTENTS
});

client.on("ready", client => {
	logger.info(`${client.user.tag} logged in.`);
});
