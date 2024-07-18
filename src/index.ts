import config from "./config";
import { client, logger } from "./client";
import { unrollError } from "./util/Errors";
import { initializeOpenAIInstance } from "./services/llm";

void (async () => {
	try {
		await initializeOpenAIInstance(config.LLM_API_SERVER_ADDRESS);
		await client.login(config.DISCORD_APP_TOKEN);
	} catch(error) {
		logger.fatal(unrollError(error, true));
	}
})();
