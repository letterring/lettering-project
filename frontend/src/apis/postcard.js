// src/apis/postcard.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendPostcard = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}/messages/postcards`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('엽서 전송 실패');
    }

    const result = await response.json();
    console.log('📮 엽서 전송 성공:', result);
    return result;
  } catch (error) {
    console.error('❌ 엽서 전송 중 오류 발생:', error);
    throw error;
  }
};
