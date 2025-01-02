# rails-native

### Before release Developer roadmap

1. Pushes
    1. Look at the docs for pushes in this article - especially, for a custom rails server
    1. TODO add steps
1. Usual menu rename into bottom bar menu - and reducer and other react-native file names
1. Bottom bar menu - add colors, themes et.c.
1. Add top native menu
1. App name - using the `.yml` file
1. Offline mode
1. `asiniy` -> `mad.online` as a GitHub username
1. User agent - include all the details from the expo device + helpers
1. Custom icon
1. [TODO] Search for all `TODO`, `mad` & `crocodile`, `webview-app` in the code, and handle these

Painless ✅, Ultrafast ⚡ & Free-minded 💡 way to build Native Mobile Apps using Ruby on Rails

* Truly native app (Menu, Pushes, et.c.)
* Good old Ruby on Rails development
* No need for MacOS, Android, iOS. You can develop & build Native Mobile App even on Linux!
* No XCode/Android Studio required
* No line of Swift/Java/Kotlin/JavaScript et.c.. Just a pure Ruby.

[TODO] bring a document menu here

## How does it work under the hood?

[TODO] write it later on

## Getting Started

Add to your Gemfile

```
gem 'rails-native'
```

After installation, run `rails g rails_native:install`. This command will add config file et.c.

After that, add to your rails app

```rb
class ApplicationController < ActionController::Base
  include RailsNative::Controller # <- include rails-native controller methods

  ...
```

```rb
module ApplicationHelper
  include RailsNative::Helpers # <- include rails-native helper methods

  ...
```

## Develop with device emulator

[TODO]

## Develop on Expo

### How to obtain my IP on local network?

## Developer API

//

### `is_rails_native_request?`

Available in both controller & helper.

```rb
# Doing request on your Rails app from the mobile app
is_rails_native_request? # => true
```

### Build native menu with `rails_native_menu`/`rails_native_menu_item`

[TODO] It's a bottom bar menu actually, not just a menu. Rename everything, including TypeScript & JSON files

Take icons from the [FontAwesome V6](https://fontawesome.com/v6/search?o=r&m=free) free collection set.

```
<% if is_rails_native_request? %>
  <%= rails_native_menu do %>
    <%= rails_native_menu_item "Home", root_path, active: current_page?(root_path), icon: "house" %>
    <%= rails_native_menu_item "Adminpanel", admin_path, active: current_page?(admin_path), icon: "user" %>
    ...
  <% end %>
<% else %>
  <your-website-html-regular-menu-goes-there>
<% end %>
```

### [TODO] Document Push notifications

* https://docs.expo.dev/push-notifications/overview/
* https://github.com/expo-community/expo-server-sdk-ruby
* https://github.com/expo/simple-rails-push-server-example?tab=readme-ov-file
* https://blog.logrocket.com/react-native-push-notifications-complete-guide/

## Building a production-app

[TODO]

# After release developer roadmap TODO

1. Add the device emulator
1. Implement the autoclean mechanism - remove old ruby messages
1. Add validations to the `RailsNative::Message`
1. RSpec coverage
1. WebviewApp test coverage
1. Icon - not only fontawesome, but custom svg's too! (8 hrs)
1. GPS (16hrs)
1. Bluetooth/BLE (48hrs)
