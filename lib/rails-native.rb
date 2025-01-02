require "controller"
require "engine"
require "generators/rails-native/install_generator"
require "helpers"

class RailsNative
  def self.config
    @@config ||= YAML.load_file(Rails.root.join("config/rails-native.yml")).deep_symbolize_keys
  end

  def self.root
    Pathname.new(File.dirname(__FILE__))
  end

  globals_file = File.open(root.join("../webview-app/globals.json"))
  globals = JSON.load(globals_file)

  USER_AGENT = globals.fetch("USER_AGENT")
  MENU_TAG = globals.fetch("MENU_TAG")
  MENU_ITEM_TAG = globals.fetch("MENU_ITEM_TAG")
end
