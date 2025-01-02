require "channel"
require "controller"
require "engine"
require "generators/rails-native/install_generator"
require "helpers"
require "message"

class RailsNative
  config_file = File.open(File.join(File.dirname(__FILE__), "../webview-app/config.json"))
  config = JSON.load(config_file)

  USER_AGENT = config.fetch("USER_AGENT")
  MENU_TAG = config.fetch("MENU_TAG")
  MENU_ITEM_TAG = config.fetch("MENU_ITEM_TAG")

  def self.crypt
    return @@crypt if defined?(@@crypt)

    len = ActiveSupport::MessageEncryptor.key_len
    salt = 'rails-native'
    key = ActiveSupport::KeyGenerator.new(Rails.application.credentials.secret_key_base).generate_key(salt, len)
    @@crypt = ActiveSupport::MessageEncryptor.new(key)
    @@crypt
  end
end
