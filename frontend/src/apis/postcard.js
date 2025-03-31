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
