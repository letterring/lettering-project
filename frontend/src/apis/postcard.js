import client from './axios';

export const sendPostcard = async ({ postcardData, imageFile }) => {
  const formData = new FormData();

  const postcardBlob = new Blob([JSON.stringify(postcardData)], {
    type: 'application/json',
  });

  formData.append('postcard', postcardBlob);
  formData.append('image', imageFile);

  try {
    const response = await client.post('/messages/postcards', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('엽서 전송 실패');
  }
};

export const getPostcardDetail = async (messageId) => {
  try {
    const response = await client.get(`/messages/postcards/dear/${messageId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const replyToPostcard = async (messageId, replyText) => {
  try {
    const response = await client.patch(`/messages/reply/${messageId}`, {
      replyText,
    });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const markPostcardAsUnread = async (messageId) => {
  try {
    const response = await client.patch(`/messages/unread/backoffice/${messageId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getSentPostcardDetail = async (messageId) => {
  try {
    const { data } = await client.get(`/messages/postcards/sender/${messageId}`);
    return data;
  } catch (err) {
    console.error('엽서상세조회에 실패했습니다.', err);
  }
};

export const getHighImageUrl = async (messageId) => {
  try {
    const { data } = await client.get(`/messages/highimage`, {
      params: {
        messageId,
        index: 0,
      },
    });
    return data;
  } catch (err) {
    console.error('엽서상세조회에 실패했습니다.', err);
  }
};

export const downloadPostcardImage = async (imageUrl) => {
  try {
    const response = await client.post(
      '/messages/postcards/dear/image',
      { imageUrl },
      {
        responseType: 'blob', // 이미지 다운로드를 위해 blob으로 받아야 함
      },
    );

    return response;
  } catch (error) {
    console.error('엽서 이미지 다운로드 실패', error);
    throw new Error('엽서 이미지 다운로드 실패');
  }
};
