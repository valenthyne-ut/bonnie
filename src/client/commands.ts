import { Client, Routes, SlashCommandBuilder } from "discord.js";
import { Logger } from "../classes/Logger";
import { unrollError } from "../util/Errors";

const logger = new Logger("CommandDeployment");

const commands: SlashCommandBuilder[] = [
	new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with pong.")
];

export async function deployCommands(client: Client<true>) {
	const guilds = client.guilds.cache.map(guild => guild.id);

	for(const guildId of guilds) {
		const name = client.guilds.cache.find(guild => guild.id === guildId)?.name || "Unknown";

		try {
			await client.rest.put(Routes.applicationGuildCommands(client.user.id, guildId), {
				body: commands.map(command => command.toJSON())
			});

			logger.info(`Deployed commands to guild "${name}".`);
		} catch(error) {
			logger.error(`Failed to deploy commands to guild "${name}".`);
			logger.error(unrollError(error).message);
		}
	}
}
