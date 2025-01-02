class RailsNative
  class Engine < Rails::Engine
    rake_tasks do
      path = File.expand_path(__dir__)
      Dir.glob("#{path}/rails-native/tasks/**/*.rake").each { |f| load f }
    end
  end
end
