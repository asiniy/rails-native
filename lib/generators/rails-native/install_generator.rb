require "rails/generators"

class RailsNative
  class InstallGenerator < Rails::Generators::Base
    desc "Installing rails-native"

    source_root File.expand_path("templates", __dir__)

    # do nothing right now
  end
end
