import { useEffect, useLayoutEffect, useState } from "react";

export const platformResolver = (userAgent) => {
  let os = 'web';
  let isWebView = userAgent.indexOf('inunity_webview') > -1
  if (userAgent.indexOf("android") > -1) os = 'android'
  else if (
    userAgent.indexOf("ios") > -1
  )
    os = 'ios';
  return { os, isWebView }
}

export const usePlatformResolver = () => {
  const [platform, setPlatform] = useState({});
  const userAgent = navigator.userAgent.toLowerCase()
  useLayoutEffect(() => {
    let os = 'web';
    let isWebView = userAgent.indexOf('inunity_webview') > -1
    if (userAgent.indexOf("android") > -1) os = 'android'
    else if (
      userAgent.indexOf("ios") > -1
    )
      os = 'ios';
    setPlatform({os, isWebView})
  }, []);

  return platform;
}