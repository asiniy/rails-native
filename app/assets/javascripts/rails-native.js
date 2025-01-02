import { createConsumer } from '@rails/actioncable'
const consumer = createConsumer()

// TODO figure out how to change RailsNativeChannel
const railsNativeSubscription = consumer.subscriptions.create({ channel: "RailsNativeChannel" }, {
  connected() {
    this.send({ event: 'rails_native.device.connected', payload: {  } })
  },

  received(data) {
    console.log('datum')
    console.log('I received the payload', data)
    window.ReactNativeWebView.postMessage(JSON.stringify(data))
  }
})

window.RailsNative = {
  send: (event, payload) => { railsNativeSubscription.send({ event, payload }) }
}
