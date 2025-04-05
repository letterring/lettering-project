/* eslint-disable no-void */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Platform,
  PermissionsAndroid,
  StyleSheet,
} from 'react-native';
import DeviceInfo from 'react-native-device-info';
import {WebView} from 'react-native-webview';
import type {WebView as WebViewType} from 'react-native-webview';
import NfcManager, {Ndef} from 'react-native-nfc-manager';
import {Linking} from 'react-native';
import axios from 'axios';

// NFC 초기화
NfcManager.start();

type KeyringData = {
  url: string;
  text: string;
  keyringId: string;
  device: {
    model: string;
    brand: string;
    manufacturer: string;
    deviceId: string;
    systemName: string;
    systemVersion: string;
    uniqueId: string;
  };
};

const App = () => {
  const [data, setData] = useState<KeyringData | null>(null);
  const [isReady, setIsReady] = useState(false);

  const webViewRef = useRef<WebViewType>(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (Platform.OS === 'android') {
          await PermissionsAndroid.request('android.permission.NFC' as any);
        }

        // ✅ 최초 실행 시 딥링크 처리
        const initialUrl = await Linking.getInitialURL();
        if (initialUrl) {
          handleDeepLink({url: initialUrl});
        }

        // ✅ 실행 중일 때 딥링크
        const sub = Linking.addEventListener('url', handleDeepLink);

        // ✅ NFC 태깅 리스너 등록
        await (NfcManager as any).registerTagEvent((tag: any) => {
          void handleNfcTag(tag);
        });

        return () => {
          NfcManager.unregisterTagEvent().catch(() => {});
          sub.remove();
        };
      } catch (e) {
        console.error('❌ 초기화 오류:', e);
      }
    };

    init();
  }, []);

  useEffect(() => {
    if (data) {
      sendDeviceInfoToServer(data);
    }
  }, [data]);

  const handleDeepLink = async ({url}: {url: string}) => {
    try {
      const match = url.match(/^yourapp:\/\/nfc\/([^?]+)(\?.*)?$/);
      const keyringId = match?.[1] ?? '';
      const queryString = match?.[2] ?? '';

      const query: Record<string, string> = {};
      if (queryString.startsWith('?')) {
        queryString
          .slice(1)
          .split('&')
          .forEach(pair => {
            const [key, value] = pair.split('=');
            query[key] = decodeURIComponent(value || '');
          });
      }

      const text = query.text ?? '';
      const device = await getDeviceInfo();

      if (keyringId) {
        const webUrl = 'https://letterring.shop/dear';
        setData({
          url: webUrl,
          text,
          keyringId,
          device,
        });
      }
    } catch (err) {
      console.error('❌ 딥링크 처리 오류:', err);
    }
  };

  const sendDeviceInfoToServer = async (info: KeyringData) => {
    try {
      console.log(info);
      const res = await axios.post(
        'https://letterring.shop/api/keyrings/nfc-access',
        {
          id: Number(info?.keyringId),
          deviceId: info?.device.uniqueId,
        },
        {
          withCredentials: true,
        },
      );
      setIsReady(true);
      console.log('✅ 서버 응답:', res.data);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error(
          '❌ API 호출 실패:',
          err.response?.status,
          err.response?.data,
        );
      } else {
        console.error('❌ 알 수 없는 에러:', err);
      }
    }
  };

  const handleNfcTag = async (tag: any) => {
    try {
      const ndefRecords = tag.ndefMessage ?? [];

      let url = '';
      let text = '';

      for (const record of ndefRecords) {
        const type = String.fromCharCode(...record.type);

        if (record.tnf === Ndef.TNF_WELL_KNOWN && type === 'T') {
          text = decodeTextPayload(record.payload);
        } else if (record.tnf === Ndef.TNF_WELL_KNOWN && type === 'U') {
          url = decodeUriPayload(record.payload);
        }
      }

      const match = url.match(/^https:\/\/[^/]+\/nfc\/([^?]+)(\?.*)?$/);
      const keyringId = match?.[1] ?? '';
      const searchParams = new URLSearchParams(match?.[2] ?? '');
      const textParam = searchParams.get('text') ?? text;

      const device = await getDeviceInfo();
      console.log(device);

      if (keyringId) {
        setData({
          url,
          text: textParam,
          keyringId,
          device,
        });
      }

      await NfcManager.unregisterTagEvent();
    } catch (err) {
      console.error('❌ 태그 처리 중 오류:', err);
    }
  };

  const decodeTextPayload = (payload: number[]): string => {
    if (payload.length < 3) {
      return '';
    }
    const textBytes = payload.slice(3);
    return String.fromCharCode(...textBytes);
  };

  const decodeUriPayload = (payload: number[]): string => {
    try {
      return Ndef.uri.decodePayload(Uint8Array.from(payload));
    } catch (e) {
      return '';
    }
  };

  const getDeviceInfo = async () => ({
    model: await DeviceInfo.getModel(),
    brand: await DeviceInfo.getBrand(),
    manufacturer: await DeviceInfo.getManufacturer(),
    deviceId: await DeviceInfo.getDeviceId(),
    systemName: await DeviceInfo.getSystemName(),
    systemVersion: await DeviceInfo.getSystemVersion(),
    uniqueId: await DeviceInfo.getUniqueId(),
  });

  if (!data || !isReady) {
    return (
      <View style={styles.center}>
        <Text style={styles.waitText}>
          📡 NFC 키링을 태깅하거나 링크로 실행하세요
        </Text>
      </View>
    );
  }

  console.log(data.url);

  return (
    // <View style={{flex: 1}}>
    //   <View style={styles.infoBox}>
    //     <Text style={styles.infoTitle}>📋 태깅 정보</Text>
    //     <Text style={styles.infoText}>🔑 Keyring ID: {data.keyringId}</Text>
    //     <Text style={styles.infoText}>📝 Text: {data.text}</Text>
    //     <Text style={styles.infoText}>📱 Model: {data.device.model}</Text>
    //     <Text style={styles.infoText}>🏷️ Brand: {data.device.brand}</Text>
    //     <Text style={styles.infoText}>
    //       🏭 Manufacturer: {data.device.manufacturer}
    //     </Text>
    //     <Text style={styles.infoText}>
    //       🔧 Device ID: {data.device.deviceId}
    //     </Text>
    //     <Text style={styles.infoText}>
    //       🧬 OS: {data.device.systemName} {data.device.systemVersion}
    //     </Text>
    //     <Text style={styles.infoText}>
    //       🆔 Unique ID: {data.device.uniqueId}
    //     </Text>
    //   </View>

    <WebView
      ref={webViewRef}
      source={{uri: data?.url ?? ''}}
      // onLoadEnd={() => {
      //   if (webViewRef.current) {
      //     const payload = {
      //       keyringId: data?.keyringId,
      //       text: data?.text,
      //       device: data?.device,
      //     };
      //     webViewRef.current.postMessage(JSON.stringify(payload));
      //   }
      // }}
      sharedCookiesEnabled={true}
      javaScriptEnabled
      originWhitelist={['*']}
      style={{flex: 1}}
    />
    // </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  waitText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 2,
  },
});

export default App;
