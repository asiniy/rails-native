type DIRECTION = 'in'|'out'

// functionality is similar to message.rb
class Message {
  direction: DIRECTION
  event: string
  payload: object

  constructor({ direction, event, payload }: { direction: DIRECTION, event: string, payload: object }) {
    this.direction = direction
    this.event = event
    this.payload = payload
  }

  get serialize(): { direction: DIRECTION, event: string, payload: object|null } {
    return {
      direction: this.direction,
      event: this.event,
      payload: this.payload,
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
