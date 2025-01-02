import * as globals from '@/globals.json'
import { BottomMenuItem } from './menuReducer'

const handleBottomMenu = ({ html, menuDispatch }) => {
  const menu = html.getElementsByTagName(globals.BOTTOM_MENU_TAG)[0]

  if (!menu) { return null }
  const menuItems = menu.getElementsByTagName(globals.BOTTOM_MENU_ITEM_TAG)
  const items: BottomMenuItem[] = menuItems.map(({ attributes }) => (
    {
      active: attributes['data-active'] === 'true',
      icon: attributes['data-icon'],
      title: attributes['data-title'],
      url: attributes['data-url'],
    }
  ))
  menuDispatch({ type: 'setMenu', data: items })
}

export { handleBottomMenu }
