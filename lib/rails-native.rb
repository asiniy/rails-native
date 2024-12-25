require "channel"
require "controller"
require "generators/rails-native/install_generator"
require "helpers"
require "message"

class RailsNative
  config_file = File.open(File.join(File.dirname(__FILE__), "../webview-app/config.json"))
  config = JSON.load(config_file)

  USER_AGENT = config.fetch("USER_AGENT")
  MENU_TAG = config.fetch("MENU_TAG")
  MENU_ITEM_TAG = config.fetch("MENU_ITEM_TAG")
end
