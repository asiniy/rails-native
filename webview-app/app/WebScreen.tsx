import { WebView } from 'react-native-webview'
import DOMParser from 'react-native-dom-parser'
import * as config from '@/config.json'
import Message from '@/utils/message'
import handleMenu from '@/utils/handleMenu'

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
const handleMessage = ({ menuDispatch }) => ({ nativeEvent }: { nativeEvent: NativeEvent }) => {
  console.log('nativeEvent Data', nativeEvent.data)
  const { event, payload }: { event: string, payload: object } = JSON.parse(nativeEvent.data)
  const message = new Message({ direction: 'in', event, payload })
  console.log('received a message', message.serialize)

  switch (message.event) {
    case 'rails-native.html.change':
      const html = new DOMParser(message.payload.html as string)
      handleMenu({ menuDispatch, html })
      return
    default:
      handleMessage(message)
      return
  }
}

const source = { uri: 'http://192.168.1.142:3000' } // TODO fix it

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
