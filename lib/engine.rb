class RailsNative
  class Engine < Rails::Engine
    initializer "rails_native.asset" do
      config.after_initialize do |app|
        if app.config.respond_to?(:assets)
          app.config.assets.precompile += %w(rails-native)
        end
      end
    end
  end
end
