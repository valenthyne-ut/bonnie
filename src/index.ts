import config from "./config";
import { client, logger } from "./client";
import { unrollError } from "./util/Errors";

void (async () => {
	try {
		await client.login(config.DISCORD_APP_TOKEN);
	} catch(error) {
		logger.fatal(unrollError(error, true));
	}
})();
