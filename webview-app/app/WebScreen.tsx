import { useRef } from 'react'
import { WebView } from 'react-native-webview'
import DOMParser from 'react-native-dom-parser'
import * as config from '@/config.json'
import { MenuItem } from '@/utils/menuReducer'

type NativeEvent = {
  canGoBack: boolean,
  canGoForward: boolean,
  data: string,
  target: string,
  title: string,
  url: string,
}

const SEND_HTML = 'window.sendHTML = () => { window.ReactNativeWebView.postMessage(JSON.stringify({ type: "innerHTML", data: document.body.outerHTML })) }'
const OPEN_URL = 'window.openURL = (url) => { window.location.replace(url) }'

const injectedJavaScript = [SEND_HTML, OPEN_URL].join(';')
const handleMessage = ({ menuDispatch }) => ({ nativeEvent }: { nativeEvent: NativeEvent }) => {
  const { data, type }: { data: string|object, type: string } = JSON.parse(nativeEvent.data)

  switch (type) {
    case 'innerHTML':
      const htmlDoc = new DOMParser(data as string)
      const menu = htmlDoc.getElementsByTagName(config.MENU_TAG)[0]

      if (!menu) { return null }
      const menuItems = menu.getElementsByTagName(config.MENU_ITEM_TAG)
      const items: MenuItem[] = menuItems.map(({ attributes }) => (
        {
          active: attributes['data-active'] === 'true',
          icon: attributes['data-icon'],
          title: attributes['data-title'],
          url: attributes['data-url'],
        }
      ))
      menuDispatch({ type: 'setMenu', data: items })
      return

    default:
      console.log(`Don't know how to handle: ${type}`)
  }
}

const source = { uri: 'http://192.168.1.142:3000' }

const USER_AGENT = `${config.USER_AGENT}/${config.VERSION}`

const WebScreen = ({ menuDispatch, innerRef }) => {
  return (
    <WebView
      // @ts-ignore
      ref={innerRef}
      allowsFullscreenVideo
      allowsPictureInPictureMediaPlayback
      allowsProtectedMedia
      injectedJavaScript={injectedJavaScript}
      mediaPlaybackRequiresUserAction={false}
      onMessage={handleMessage({ menuDispatch })}
      onNavigationStateChange={() => { innerRef.current.injectJavaScript('window.sendHTML()') }}
      source={source}
      userAgent={USER_AGENT}
    />
  )
}

export default WebScreen
