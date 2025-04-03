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
