import line from '@line/bot-sdk'

export default function lineBotLib({ accessToken, secret }) {
  const config = {
    channelAccessToken: accessToken,
    channelSecret: secret,
  }

  return {
    lineClient: new line.Client(config),
    lineMw: line.middleware(config),
  }
}
