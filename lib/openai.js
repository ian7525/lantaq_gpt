import { Configuration, OpenAIApi } from "openai"

export default function openaiLib(env) {
  const config = new Configuration({ apiKey: env.OPENAI_API_KEY })

  return {
    openai: new OpenAIApi(config),
  }
}
