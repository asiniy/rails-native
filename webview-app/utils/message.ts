type SENDER = 'rails-native'|'app'

// functionality is similar to message.rb
class Message {
  event: string
  payload: object
  room: string
  sender: SENDER

  // WITH ROOM
  constructor({ event, payload, room, sender }: { event: string, payload: object, room: string, sender: SENDER }) {
    this.event = event
    this.room = room
    this.payload = payload
    this.sender = sender
  }

  get serialize(): { sender: SENDER, event: string, payload: object|null } {
    return {
      event: this.event,
      payload: this.payload,
      sender: this.sender,
    }
  }

  get systemLevel(): string {
    return this.eventLevels[0]
  }

  get serviceLevel(): string {
    return this.eventLevels[1]
  }

  get actionLevel(): string {
    return this.eventLevels[2]
  }

  get eventLevels(): string[] {
    return this.event.split(".")
  }
}

export default Message
