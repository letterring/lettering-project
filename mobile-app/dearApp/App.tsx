// import React from 'react';
// import {SafeAreaView, StyleSheet} from 'react-native';
// import {WebView} from 'react-native-webview';

// const App = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <WebView
//         source={{uri: 'https://letterring.shop/dear'}}
//         javaScriptEnabled
//         domStorageEnabled
//         startInLoadingState
//       />
//     </SafeAreaView>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });
// export default App;

import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {WebView} from 'react-native-webview';
import type {WebView as WebViewType} from 'react-native-webview';
import {Linking} from 'react-native';
import 'react-native-url-polyfill/auto'; // URL 지원

const App = () => {
  const [text, setText] = useState<string | null>(null);
  const webViewRef = useRef<WebViewType>(null);

  // ✅ 딥링크로 앱이 실행됐을 때 URL 파싱
  useEffect(() => {
    const handleDeepLink = (url: string) => {
      console.log('📥 딥링크 URL:', url);
      try {
        const parsed = new URL(url);
        const receivedText = parsed.searchParams.get('text');
        if (receivedText) {
          setText(receivedText);
        }
      } catch (err) {
        console.warn('❌ 딥링크 파싱 오류:', err);
      }
    };

    // 앱이 백그라운드 → 포그라운드로 실행될 때
    const linkingListener = Linking.addEventListener('url', ({url}) => {
      handleDeepLink(url);
    });

    // 앱이 딥링크로 처음 실행될 때
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      linkingListener.remove();
    };
  }, []);

  if (!text) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>📡 NFC 태깅 또는 링크로 앱을 실행해보세요</Text>
      </View>
    );
  }

  return (
    <WebView
      ref={webViewRef}
      source={{uri: 'https://letterring.shop/dear'}}
      onLoadEnd={() => {
        if (webViewRef.current && text) {
          webViewRef.current.postMessage(text); // ✅ 웹에 text 전달
        }
      }}
      javaScriptEnabled={true}
      originWhitelist={['*']}
    />
  );
};

export default App;
