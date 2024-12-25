require "rails/generators"

class RailsNative
  class InstallGenerator < Rails::Generators::Base
    desc "Installing gem files"

    source_root File.expand_path("templates", __dir__)

    def copy_model_migrations
      copy_file "db/migrate/01_create_rails_native_messages.rb", "db/migrate/#{Time.now.utc.strftime("%Y%m%d%H%M%S")}_create_rails_native_messages.rb"
    end
  end
end
