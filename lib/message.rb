class RailsNative
  class Message < ActiveRecord::Base
    self.table_name = "rails_native_messages"

    enum :sender, [:rails_native, :app]

    has_many :responses, class_name: "RailsNative::Message", foreign_key: "request_message_id"
    belongs_to :request_message, class_name: "RailsNative::Message"

    RESEND_INTERVAL = 10.seconds # TODO junior extract everything to initializer.rb of rails folder + write `Configuration` section in the doc
    RESEND_ATTEMPTS = 5 # TODO junior
    RETENTION = 1.week # TODO junior; also, if it's a nil, don't run any job

    # after_create :run_retention # TODO actually implement retention of messages; just run a mechanism of removing old messages once in probably hour; just schedule a sidekiq job once in (1 hour?).
    # after_create :check_ack # TODO before-release
    # TODO junior add validations: no duplicate available, request and response should have an opposite sender

    def rails_native?
      system_level == :rails_native
    end

    Service = Struct.new(:title, :actions)
    Action = Struct.new(:title, :sender)

    SERVICES = [
      Service.new(:device, [
        Action.new(:connected, :app),
        # Action.new(:ack, :app),
      ]),
      Service.new(:ble, [
        Action.new(:request_permissions, :rails_native),
        Action.new(:search_for_devices, :rails_native),
        Action.new(:stop_search_for_devices, :rails_native),
        Action.new(:connect, :rails_native),
        Action.new(:disconnect, :rails_native),
        Action.new(:transmit, :rails_native),

        Action.new(:got_permission, :app),
        Action.new(:rejected_permission, :app),
        Action.new(:devices_found, :app),
        Action.new(:device_connected, :app),
        Action.new(:device_disconnected, :app),
        Action.new(:data_received, :app),
      ]),
    ]

    def serialize
      {
        event:,
        payload:,
      }
    end

    def payload=(data)
      self.raw_payload = data.to_json if data
    end

    def payload
      raw_payload && JSON.parse(self.raw_payload)
    end

    SERVICES.each do |service|
      # TODO junior for all the methods defined in this block, check there is no instance method existing. `raise` if it exists
      # define service level checks
      method_name = "#{service.title}?"
      define_method method_name do
        service_level == service.title
      end

      service.actions.each do |action|
        # define action level checks
        method_name = "#{service.title}_#{action.title}?"
        define_method method_name do
          service_level == service.title && action_level == action.title
        end
      end
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
