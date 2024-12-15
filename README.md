# rails-native

[TODO] Search for all `TODO`, `mad` & `crocodile`, `webview-app` in the code, and handle these
[TODO] Handle `.gitignore` for the gem

Painless ✅, Ultrafast ⚡ & Free-minded 💡 way to build Native Mobile Apps using Ruby on Rails

* Truly native app (Menu, Pushes, Bluetooth, GPS et.c.)
* Good old Ruby on Rails development
* No need for MacOS, Android, iOS. You can develop & build Native Mobile App even on Linux!
* No XCode/Android Studio required
* No line of Swift/Java/Kotlin/JavaScript et.c.. Just a pure Ruby.

[TODO] bring a menu here

## How does it work under the hood?

[TODO] write it later on

## Getting Started

Add to your Gemfile

```
gem 'rails-native'
```

and run `bundle install`. After that, add to your rails app

```rb
class ApplicationController < ActionController::Base
  include RailsNative::Controller # <- include rails-native controller methods

  ...
```

```rb
module ApplicationHelper
  include RailsNative::Helpers # <- include rails-native helper methods
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

```
if is_rails_native_request?
  <%= rails_native_menu do %>
    <%= rails_native_menu_item "Home", root_path, active: current_page?(root_path), icon: "house" %>
    <%= rails_native_menu_item "Adminpanel", admin_path, active: current_page?(admin_path), icon: "user" %>
  <% end %>
else
  <your-website-html-regular-menu-goes-there>
end
```

[TODO] Document both methods

## Building a production-app

[TODO]
