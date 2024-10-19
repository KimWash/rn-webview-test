import { platformResolver, usePlatformResolver } from "./PlatformResolver";
import { useState, useEffect } from "react";

export const MessageEvent = Object.freeze({
  Login: 'login',
  Logout: 'logout',
  Log: 'log',
  Auth: 'auth',
  Navigation: 'navigation'
})

export class MessageManager {
  constructor(webViewInstance) {
    this.webViewInstance = webViewInstance;
  }

  sendMessage(messageEvent, value) {
    this.webViewInstance.postMessage(
      JSON.stringify({ event: messageEvent, value })
    )
  }


  onMessageReceived({ data, ...event }, listeners) {
    if (!data) return;
    try {
      const message = JSON.parse(data);
      
      switch (message.event) {
        case MessageEvent.Auth: {
          alert(`네이티브에서 쿠키 복원: ${message.value}`);
          document.cookie = message.value;
          break;
        }
        case MessageEvent.Log: {
          alert(message.value);
          break;
        }
        default: {
          throw new Error('올바르지 않은 이벤트! ')
        }
      }
      listeners[message.event]();
      this.sendMessage(MessageEvent.Log, 'ack')
    } catch (e) {
      this.sendMessage(MessageEvent.Log, `[Event Parsing Error] ${e.message}`)
    }
  }

}


export const useMessageManager = () => {
  const [messageManager, setMessageManager] = useState(new MessageManager(window.ReactNativeWebView));
  const {os, isWebView} = usePlatformResolver();

  useEffect(() => {
    if (!isWebView) return;
    const msgManager = new MessageManager(window.ReactNativeWebView);
   
    msgManager.sendMessage(MessageEvent.Log, `adding event listener: ${os} ${isWebView}`)
    const onMessageReceived = (event, listeners) => {
      // 메시지 처리 로직
      msgManager.onMessageReceived(event, listeners)
    };

    if (os === 'ios')
      window.addEventListener('message', (e) => msgManager.onMessageReceived(e));
    else if (os === 'android')
      document.addEventListener('message', e => msgManager.onMessageReceived(e));

    setMessageManager(msgManager);

    return () => {
      const obj = os === 'ios' ? window : document
      obj.removeEventListener('message', onMessageReceived)

    }
  }, [isWebView]);

  return messageManager
}