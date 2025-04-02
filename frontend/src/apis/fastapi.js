import client from './axios_fastapi';

// 엽서 임시 저장
export const submitPostcard = async (images, message) => {
  try {
    const formData = new FormData();
    formData.append('message', message);
    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await client.post('/submit', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('엽서 저장 에러:', error);
    return null;
  }
};

// 엽서 key로 조회
export const getPostcard = async (key) => {
  try {
    const response = await client.get(`/submit/${key}`);
    return response.data;
  } catch (error) {
    console.error('엽서 조회 에러:', error);
    return null;
  }
};
