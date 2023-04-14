import { Configuration, OpenAIApi } from 'openai'

export default function openaiLib(apiKey) {
  const config = new Configuration({ apiKey })

  return {
    openAIApi: new OpenAIApi(config),
  }
}
