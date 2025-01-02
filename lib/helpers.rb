class RailsNative
  module Helpers
    def rails_native_bottom_menu
      items = capture { yield }
      content_tag(RailsNative::BOTTOM_MENU_TAG, items)
    end

    def rails_native_bottom_menu_item(title, url, active: false, icon:)
      content_tag(RailsNative::BOTTOM_MENU_ITEM_TAG, nil, data: { active:, icon:, title:, url: })
    end
  end
end
