import "dotenv/config";
import { Logger } from "../classes/Logger";
import { GatewayIntentBits, GatewayIntentsString } from "discord.js";
import { yellow } from "chalk";

const logger = new Logger("Init");

function die(reason: string): never {
	logger.fatal(reason);
	process.exit(1);
}

function getDiscordAppToken(): string {
	return process.env.DISCORD_APP_TOKEN || die("No Discord app token was provided.");
}

function getDiscordAppIntents(): Array<GatewayIntentsString> {
	const rawClientIntents = process.env.DISCORD_APP_INTENTS;

	if(rawClientIntents) {
		let anyInvalidIntents = false;
		
		const validIntents = Object.keys(GatewayIntentBits);
		const userIntents = rawClientIntents.split(", ");

		for(const intent of userIntents) {
			if(validIntents.indexOf(intent) === -1) { 
				logger.error(`Invalid intent ${yellow(intent)}.`); 
				anyInvalidIntents = true;
			}
		}

		if(anyInvalidIntents) { die("One or more invalid intents were provided."); }
		else { return userIntents as Array<GatewayIntentsString>; }
	} else {
		die("Client intents were not provided.");
	}
}

export default {
	DISCORD_APP_TOKEN: getDiscordAppToken(),
	DISCORD_APP_INTENTS: getDiscordAppIntents()
};
