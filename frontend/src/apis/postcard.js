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
