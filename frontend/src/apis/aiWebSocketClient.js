const WS_URL = import.meta.env.VITE_WS_BASE_URL;

export class AiWebSocketClient {
  constructor() {
    this.socket = null;
    this.listeners = new Set();
    this.isConnected = false;
  }

  connect() {
    this.socket = new WebSocket(WS_URL);

    this.socket.onopen = () => {
      this.isConnected = true;
      console.log('[✅ WebSocket 연결됨]');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      for (const listener of this.listeners) {
        listener(data);
      }
    };

    this.socket.onclose = () => {
      this.isConnected = false;
      console.warn('[❌ WebSocket 연결 종료]');
    };

    this.socket.onerror = (err) => {
      console.error('[🔥 WebSocket 에러]', err);
    };
  }

  onMessage(callback) {
    this.listeners.add(callback);
  }

  offMessage(callback) {
    this.listeners.delete(callback);
  }

  send(action, payload = {}) {
    if (!this.isConnected) {
      console.warn('[⚠️ WebSocket 연결되지 않음]');
      return;
    }

    this.socket.send(JSON.stringify({ action, ...payload }));
  }

  close() {
    this.socket?.close();
  }
}

export const aiSocket = new AiWebSocketClient();
