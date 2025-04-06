import client from './axios';

export const getUnreadMessage = async () => {
  try {
    const response = await client.get('/messages/unread');
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getHighImage = async (messageId) => {
  try {
    const response = await client.get('/messages/highimage', {
      params: { messageId },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const terminateKeyring = async () => {
  try {
    const { data } = await client.delete('/keyrings/delete');
  } catch (error) {
    console.error('키링 영구 삭제 실패', error);
  }
};
