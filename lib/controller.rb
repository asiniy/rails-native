class RailsNative
  module Controller
    extend ActiveSupport::Concern

    included do
      helper_method :is_rails_native_request?
    end

    def is_rails_native_request?
      request.headers["HTTP_USER_AGENT"].include?(USER_AGENT)
    end
  end
end
