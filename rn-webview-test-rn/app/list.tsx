import { router } from "expo-router";
import { useRef, useState, useEffect } from "react";
import { SafeAreaView, Platform, Button, View } from "react-native";
import WebView from "react-native-webview";
import * as SecureStore from "expo-secure-store";
import { ThemedText } from "@/components/ThemedText";
import { Message, parseMessage, handleMessage, MessageEvent, NavigationEvent } from "@/lib/MessageManager";
import AuthManager from "@/lib/AuthManager";


export default function List() {
  const webViewRef = useRef<WebView>(null);
  const [cookie, setCookie] = useState<string | null>(null);
  useEffect(() => {
    AuthManager.getCredentialFromStorage().then((cookie) => {
      sendMessage({ event: MessageEvent.Auth, value: cookie });
      setCookie(cookie);
    });
  }, []);

  const sendMessage = (message: Message) => {
    webViewRef.current?.postMessage(JSON.stringify(message));
  };

  return (
    <View>
      <View style={{height:'100%',}}>
      <WebView
        ref={webViewRef}
        injectedJavaScriptBeforeContentLoaded={`document.cookie=${cookie}`}
        source={{
          uri: "http://192.168.1.146:3000/list",
        }}
        userAgent={`Mozilla/5.0 (${Platform.OS}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36 INUnity_WebView`}
        sharedCookiesEnabled
        onMessage={(event) => {
          const message = parseMessage(event.nativeEvent.data);
          handleMessage(message, {
            [MessageEvent.Navigation]: () => {
              const navigation = message.value as NavigationEvent;
              console.log(message)
              router.push({pathname: navigation.path as any, params: navigation.params as any})
            },
          });
        }}
      ></WebView>

      </View>
    </View>
  );
}