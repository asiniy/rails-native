class RailsNative
  module Helpers
    def rails_native_menu
      items = capture { yield }
      content_tag(RailsNative::MENU_TAG, items)
    end

    def rails_native_menu_item(title, url, active: false, icon:)
      content_tag(RailsNative::MENU_ITEM_TAG, nil, data: { active:, icon:, title:, url: })
    end
  end
end
