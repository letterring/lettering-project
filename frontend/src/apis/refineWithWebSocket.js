import { aiSocket } from './aiWebSocketClient';

// export const refineWithWebSocket = ({ slideTexts, filenames }) => {
//   return new Promise((resolve, reject) => {
//     const socket = aiSocket;

//     const handleMessage = (data) => {
//       if (data.response) {
//         resolve(data.response);
//       } else if (data.error) {
//         reject(data.error);
//       }
//       socket.offMessage(handleMessage); // 🔁 한 번만 받기
//     };

//     socket.onMessage(handleMessage);

//     // 연결됐을 때만 바로 전송
//     if (socket.socket?.readyState === 1) {
//       socket.send('refine', { texts: slideTexts, filenames });
//     } else {
//       console.warn('[⚠️ WebSocket 연결 안 됨] refine 요청 대기 중...');
//       // readyState가 CONNECTING이면 대기
//       const interval = setInterval(() => {
//         if (socket.socket?.readyState === 1) {
//           clearInterval(interval);
//           socket.send('refine', { texts: slideTexts, filenames });
//         }
//       }, 100);
//     }
//   });
// };

export const refineWithWebSocket = ({ slideTexts, filenames, onStream, onDone, onError }) => {
  aiSocket.onMessage((data) => {
    if (data.stream) {
      onStream?.(data.stream);
    }
    if (data.done) {
      onDone?.();
      aiSocket.offMessage(onStream); // 안전하게 클린업
    }
    if (data.error) {
      onError?.(data.error);
      aiSocket.offMessage(onStream);
    }
  });

  aiSocket.send('refine', { texts: slideTexts, filenames });
};
