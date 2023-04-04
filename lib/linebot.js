import line from "@line/bot-sdk"

export default function lineBotLib(env) {
  const config = {
    channelAccessToken: env.CHANNEL_ACCESSTOKEN,
    channelSecret: env.CHANNEL_SECRET,
  }

  return {
    lineClient: new line.Client(config),
    lineMw: line.middleware(config),
  }
}
