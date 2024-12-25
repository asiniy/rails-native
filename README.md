# rails-native

### Before release Developer roadmap

1. Message bus
    1. `expo-sqlite3` explore or other methods - how to store values: https://docs.expo.dev/develop/user-interface/store-data/
    1. Store messages on mobile without any hassle
    1. Implement :ack on rails-native
    1. Implement :ack on mobile
    1. check_ack mechanism on mobile
    1. check_ack mechanism on rails-native
    1. on connection - send all not acked messages (mobile)
    1. on connection - send all not acked messages (rails-native)
1. BLE methods
    1. request_permissions
    1. got_permission
    1. rejected permission
    1. search for devices
    1. devices_found
    1. device_connected
    1. device_disconnected
    1. transmit
    1. data_received
1. Pushes
    1. Look at the docs for pushes in this article - especially, for a custom rails server
    1. TODO add steps
1. Usual menu rename into bottom bar menu - and reducer and other react-native file names
1. Add top native menu
1. Offline mode
1. `asiniy` -> `mad.online` as a username

[TODO] Search for all `TODO`, `mad` & `crocodile`, `webview-app` in the code, and handle these

Painless ✅, Ultrafast ⚡ & Free-minded 💡 way to build Native Mobile Apps using Ruby on Rails

* Truly native app (Menu, Pushes, Bluetooth/BLE et.c.)
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

After installation, run `rails g rails_native:install`. This command will add missing migrations et.c.

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

```js
// application.js
import "rails-native" // import rails-native bridge functionality
```

## Develop with device emulator

[TODO]

## Develop on real mobile app

[TODO]

## Developer API

//

### `is_rails_native_request?`

Available in both controller & helper.

```rb
# Doing request on your Rails app from the mobile app
is_rails_native_request? # => true
```

### Build native menu with `rails_native_menu`/`rails_native_menu_item`

[TODO] It's a bottom bar menu actually, not a menu actually. Rename everything, including TypeScript & JSON files

Take icons from the [FontAwesome V6](https://fontawesome.com/v6/search?o=r&m=free) free collection set.

```
if is_rails_native_request?
  <%= rails_native_menu do %>
    <%= rails_native_menu_item "Home", root_path, active: current_page?(root_path), icon: "house" %>
    <%= rails_native_menu_item "Adminpanel", admin_path, active: current_page?(admin_path), icon: "user" %>
    ...
  <% end %>
else
  <your-website-html-regular-menu-goes-there>
end
```

### BlueTooth (BLE)

BlueTooth is implemented in BLE form - hence no ability to stream music or video, but you can easily send data to side devices! It uses [react-native-ble-pbx](https://github.com/dotintent/react-native-ble-plx) package under the hood.

#### [TODO] document BLE methods: `request_permissions`, `search_for_devices`, `stop_search_for_devices`, `connect`, `disconnect`, `transmit`
#### [TODO] describe events: `got_permission`, `rejected_permission`, `devices_found`, `device_connected`, `device_disconnected`, `data_received`

### Document GPS

16 hours of work
Add to the gem & github description when work is done

### [TODO] Document Push notifications

* https://docs.expo.dev/push-notifications/overview/
* https://github.com/expo-community/expo-server-sdk-ruby
* https://github.com/expo/simple-rails-push-server-example?tab=readme-ov-file
* https://blog.logrocket.com/react-native-push-notifications-complete-guide/

## Building a production-app

[TODO]

# After release developer roadmap

1. Add the device emulator
1. Implement the autoclean mechanism - remove old ruby messages
1. Add validations to the `RailsNative::Message`
1. RSpec coverage
1. WebviewApp test coverage
