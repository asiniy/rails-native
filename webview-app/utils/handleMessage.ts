import Message from "./message"

const handleMessage = async (message: Message) => {
  if (message.systemLevel !== 'rails_native') {
    console.log('Not a rails_native message')
    return
  }

  await storeMessage(message)
  await ackMessage(message)

  if (message.serviceLevel === 'ble') {
    return handleBleMessage(message)
  }

  throw new Error(`This should never ever happen`)
}

const handleBleMessage = (message: Message) => {
  //
}

export default handleMessage
