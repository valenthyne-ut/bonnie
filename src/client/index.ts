import { Client, InteractionType } from "discord.js";
import { Logger } from "../classes/Logger";
import config from "../config";
import { deployCommands } from "./commands";

export const logger = new Logger("Client");

export const client = new Client({
	intents: config.DISCORD_APP_INTENTS
});

client.on("ready", client => {
	void (async () => {
		logger.info(`${client.user.tag} logged in.`);
		if(config.DISCORD_DEPLOY_COMMANDS) { await deployCommands(client); }
	})();
});

client.on("interactionCreate", interaction => {
	void (async () => {
		if(interaction.user.bot) { return; }

		switch(interaction.type) {
		case InteractionType.ApplicationCommand: 
		{
			const commandName = interaction.commandName;

			switch(commandName) {
			case "ping":
			{
				await interaction.reply("Pong!");
				break; 
			}

			default: 
			{ 
				return logger.error(`Invalid command "${commandName}" invoked.`); 
			}}

			break;
		}

		default: 
		{ 
			return logger.error("Invalid interaction invoked."); 
		}}
	})();
});
