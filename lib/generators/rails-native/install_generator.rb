require "rails/generators"

class RailsNative
  class InstallGenerator < Rails::Generators::Base
    desc "Installing rails-native"

    source_root File.expand_path("templates", __dir__)

    def copy_config
      copy_file "config/rails-native.yml"
    end
  end
end
