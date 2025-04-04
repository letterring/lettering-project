import AiClient from './axios_fastapi';

// 엽서 임시 저장
export const submitPostcard = async (images, message) => {
  try {
    const formData = new FormData();
    formData.append('message', message);
    images.forEach((image) => {
      formData.append('images', image);
    });

    const response = await AiClient.post('/submit', formData, {
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
    const response = await AiClient.get(`/submit/${key}`);
    return response.data;
  } catch (error) {
    console.error('엽서 조회 에러:', error);
    return null;
  }
};

export const updateRedisMessage = async (key, newMessage) => {
  try {
    const response = await AiClient.patch(`/submit/${key}`, { message: newMessage });
    return response.data;
  } catch (error) {
    console.error('Redis 메시지 업데이트 실패:', error);
    return null;
  }
};

export const segmentText = async (text, count = 5) => {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('count', count.toString());

  try {
    const response = await AiClient.post('/segment', formData);
    return response.data.response;
  } catch (error) {
    console.error(error);
  }
};

export const refineWithImage = async ({ slideTexts, filenames }) => {
  const formData = new FormData();
  slideTexts.forEach((text) => formData.append('texts', text));
  filenames.forEach((name) => formData.append('filenames', name));

  try {
    const response = await AiClient.post('/refine', formData);
    return response.data.response;
  } catch (error) {
    console.error('AI 문장 수정 실패:', error);
    return null;
  }
};

export const enhanceWithImage = async ({ text, filename }) => {
  const formData = new FormData();
  formData.append('text', text);
  formData.append('filename', filename);

  try {
    const response = await AiClient.post('/enhance', formData);
    return response.data.response;
  } catch (error) {
    console.error('AI 감성 팁 요청 실패:', error);
    return null;
  }
};
