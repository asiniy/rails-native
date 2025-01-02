import * as globals from '@/globals.json'
import { MenuItem } from './menuReducer'

const handleMenu = ({ html, menuDispatch }) => {
  const menu = html.getElementsByTagName(globals.MENU_TAG)[0]

  if (!menu) { return null }
  const menuItems = menu.getElementsByTagName(globals.MENU_ITEM_TAG)
  const items: MenuItem[] = menuItems.map(({ attributes }) => (
    {
      active: attributes['data-active'] === 'true',
      icon: attributes['data-icon'],
      title: attributes['data-title'],
      url: attributes['data-url'],
    }
  ))
  menuDispatch({ type: 'setMenu', data: items })
}

export default handleMenu
