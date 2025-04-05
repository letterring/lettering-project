import client from './axios';

export const sendReply = async (letterId, data) => {
  try {
    const response = await client.patch(`/messages/reply/${letterId}`, {
      replyText: data,
    });
    console.log('reply response', response.data);
  } catch (error) {
    console.error('답장 작성 실패:', error);
  }
};
