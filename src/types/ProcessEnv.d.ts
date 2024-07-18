export {};

declare global {
	namespace NodeJS {
		interface ProcessEnv {			
			DISCORD_APP_TOKEN: string | undefined;
			DISCORD_APP_INTENTS: string | undefined;
			DISCORD_DEPLOY_COMMANDS: string | undefined;

			OPENAI_BASE_URL: string | undefined;
		}
	}
}
