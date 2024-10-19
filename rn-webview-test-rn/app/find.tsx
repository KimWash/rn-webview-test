import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { SafeAreaView, Platform, Button, View } from "react-native";
import WebView from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import AuthManager from "@/lib/AuthManager";
import { Message, parseMessage, handleMessage, MessageEvent, useMessageManager } from "@/lib/MessageManager";


export default function Find() {
  const webViewRef = useRef<WebView>(null);
  const [cookie, setCookie] = useState<string | null>(null);
  const messageManager = useMessageManager(webViewRef);
  useEffect(() => {
    AuthManager.getCredentialFromStorage().then((cookie) => {
      messageManager.sendMessage({ event: MessageEvent.Auth, value: cookie });
      setCookie(cookie);
    });
  }, []);



  return (
    <View>
      <View style={{height:'100%',}}>
      <WebView
        ref={webViewRef}
        injectedJavaScriptBeforeContentLoaded={`document.cookie=${cookie}`}
        source={{
          uri: "http://192.168.1.146:3000/find",
        }}
        userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
        sharedCookiesEnabled
        onMessage={(event) => {
          const message = parseMessage(event.nativeEvent.data);
          handleMessage(message, {
            [MessageEvent.Navigation]: () => {
              router.push('/find')
            },
          });
        }}
      ></WebView>

      </View>
    </View>
  );
}