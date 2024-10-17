import { Image, StyleSheet, Platform, SafeAreaView } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import WebView from "react-native-webview";
import { useRef } from "react";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);
  return <WebView 
  ref={webViewRef}
   source={{ uri: "http://192.168.1.146:3000" }}
   onMessage={(event) => {
    console.log(event.nativeEvent.data);
    alert(event.nativeEvent.data)
   }}
   ></WebView>;
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
