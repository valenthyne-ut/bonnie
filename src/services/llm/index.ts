import OpenAI from "openai";

export let openAIInstance: OpenAI;

export async function initializeOpenAIInstance(address: string) {
	const openAI = new OpenAI({
		// I'm setting the address property manually because I don't like the
		// "default to environment variable" approach as it's unclear and can
		// cause confusion for people who aren't aware of the functionality
		baseURL: address,
		apiKey: "" 
		// The API key property is empty because as of 18/07, I'm running this 
		// off a local Jan.ai instance and don't need an API key. Will fix!
		// TODO
	});

	try {
		// Call the API to make sure we can talk to it
		await openAI.models.list();
		openAIInstance = openAI;
	} catch(error) {
		throw new Error("Invalid LLM API server address provided. Couldn't initialize.");
	}
}
