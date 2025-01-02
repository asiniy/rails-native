class RailsNative
  module Channel
    extend ActiveSupport::Concern

    class_methods do
      def rails_native_handler(handler_class, room_id:)
        @@handler_class = handler_class
        @@room_id = room_id

        Rails.logger.info "[rails-native] Started to handle connections with #{handler_class}"
      end

      # BLE
      # TODO junior DRY all the methods
      def ble_request_permissions(room)
        message = RailsNative::Message.create!(
          sender: :rails_native,
          room: room,
          event: "rails_native.ble.request_permissions",
        )
        ActionCable.server.broadcast(room, message.serialize)
        message
      end

      # def ble_search_for_devices(room)
      #   message = RailsNative::Message.create!(
      #     direction: :out,
      #     room: room,
      #     event: "rails_native.ble.search_for_devices",
      #   )
      #   ActionCable.server.broadcast(room, message.serialize)
      #   message
      # end

      # def ble_stop_search_for_devices(room)
      #   #
      # end
    end

    private

    def subscribed
      stream_from room
    end

    def receive(data)
      message = RailsNative::Message.new(
        room: room,
        sender: :in,
        event: data.fetch("event"),
        payload: data.fetch("payload"),
      )
      message.save!
      handler = @@handler_class.new(message:)
      handler.handle
    end

    def room
      @room ||= instance_eval &@@room_id
    end
  end
end
