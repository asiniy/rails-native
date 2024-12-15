class RailsNative
  class Message
    attr_reader :room, :direction, :event, :payload

    def initialize(room:, direction:, event:, payload:)
      @room = room
      @direction = direction
      @event = event
      @payload = payload
    end

    def in?
      direction == :out
    end

    def out?
      direction == :in
    end

    def rails_native?
      system_level == :rails_native
    end

    def device?
      service_level == :device
    end

    def bluetooth?
      service_level == :bluetooth
    end

    def system_level
      event_levels[0]
    end

    def service_level
      event_levels[1]
    end

    def action_level
      event_levels[2]
    end

    private

    def event_levels
      @event_levels ||= event.split(".").map(&:to_sym)
    end
  end
end
