const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const sendPostcard = async (postcardData, imageFile) => {
  try {
    const formData = new FormData();

    // postcard 객체를 JSON 문자열로 변환하여 FormData에 추가
    formData.append(
      'postcard',
      new Blob([JSON.stringify(postcardData)], { type: 'application/json' }),
    );

    // 이미지 파일 추가
    formData.append('image', imageFile); // imageFile은 File 객체여야 함

    const response = await fetch(`${BASE_URL}/messages/postcards`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('엽서 전송 실패');
    }

    const result = await response.json();
    console.log('엽서 전송 성공:', result);
    return result;
  } catch (error) {
    console.error('엽서 전송 에러:', error);
    throw error;
  }
};
