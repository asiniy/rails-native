import { WebView } from 'react-native-webview'
import DOMParser from 'react-native-dom-parser'
import * as globals from '@/globals.json'
import { handleBottomMenu } from '@/utils/handleMenu'

type NativeEvent = {
  canGoBack: boolean,
  canGoForward: boolean,
  data: string,
  target: string,
  title: string,
  url: string,
}

const SEND_HTML = 'window.sendHTML = () => { window.ReactNativeWebView.postMessage(JSON.stringify({ event: "rails-native.html.change", payload: { html: document.body.outerHTML } })) }'
const OPEN_URL = 'window.openURL = (url) => { window.location.replace(url) }'

const injectedJavaScript = [SEND_HTML, OPEN_URL].join(';')
const handleHTML = ({ menuDispatch }) => ({ nativeEvent }: { nativeEvent: NativeEvent }) => {
  const { event, payload }: { event: string, payload: object } = JSON.parse(nativeEvent.data)

  switch (event) {
    case 'rails-native.html.change':
      const html = new DOMParser(payload.html as string)
      handleBottomMenu({ menuDispatch, html })
      return
    default:
      throw new Error()
  }
}

const source = { uri: process.env.EXPO_PUBLIC_WEBVIEW_URL }

const USER_AGENT = `${globals.USER_AGENT}/${globals.VERSION}`

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
      onMessage={handleHTML({ menuDispatch })}
      onNavigationStateChange={() => { innerRef.current.injectJavaScript('window.sendHTML()') }}
      source={source}
      userAgent={USER_AGENT}
    />
  )
}

export default WebScreen
