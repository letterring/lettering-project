import client from './axios';

export const sendPostcard = async ({ postcardData, imageFile }) => {
  try {
    // const formData = new FormData();
    // formData.append('postcard', JSON.stringify(postcardData));
    // formData.append('image', imageFile);

    const requestBody = new FormData();
    const jsonDraftData = JSON.stringify(postcardData);
    const post = new Blob([jsonDraftData], { type: 'application/json' });
    requestBody.append('postcard', post);
    requestBody.append('image', imageFile);

    console.log(requestBody);

    const response = await client.post('/messages/postcards', requestBody, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('📮 엽서 전송 성공:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ 엽서 전송 중 오류 발생:', error);
    throw error;
  }
};
