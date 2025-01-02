namespace :rails_native do
  namespace :expo do
    desc "Runs expo development"
    task :run_development do
      webview_url = RailsNative.config.fetch(:webview_url).fetch(:development)
      puts "[rails-native] Starting expo app on #{webview_url}"
      exec("cd #{RailsNative.root.join("../webview-app")} && EXPO_PUBLIC_WEBVIEW_URL=#{webview_url} npm run start")
    end
  end
end
