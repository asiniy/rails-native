class RailsNative
  module Channel
    extend ActiveSupport::Concern

    class_methods do
      def rails_native_handler(handler_class, room:)
        @@handler_class = handler_class
        @@room = room

        Rails.logger.info "[rails-native] Started to handle connections with #{handler_class}"
      end
    end

    def subscribed
      stream_from room
    end

    def receive(data)
      message = RailsNative::Message.new(
        room: room,
        direction: :in,
        event: data.fetch("event"),
        payload: data.fetch("payload"),
      )
      handler = @@handler_class.new(message:)
      handler.handle
    end

    def room
      @room ||= instance_eval &@@room
    end
  end
end
