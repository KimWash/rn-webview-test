import WebView from "react-native-webview";
import AuthManager from "./AuthManager";
import { Ref, RefObject } from "react";

export const enum MessageEvent {
  Login = "login",
  Logout = "logout",
  Log = "log",
  Auth = "auth",
  Navigation = "navigation",
}

export interface NavigationEvent {
  path: string;
  params?: Record<string, any>
}

export interface Message {
  event: MessageEvent;
  value: any;
}

export const handleMessage = (
  message: Message,
  handlers: Record<string, () => void>
) => {
  switch (message.event) {
    case MessageEvent.Login: {
      console.log(message);
      AuthManager.saveCredential(message.value)
      
      break;
    }
    case MessageEvent.Log: {
      console.log(message);
      break;
    }
    case MessageEvent.Navigation: {
      handlers[MessageEvent.Navigation]?.();
      break;
    }
  }
};

export const parseMessage = (messageText: string) => {
  return JSON.parse(messageText) as Message;
};

export const useMessageManager = (webViewRef: RefObject<WebView>) => {
  const sendMessage = (message: Message) => {
    webViewRef.current?.postMessage(JSON.stringify(message));
  };
  return {sendMessage}

}