import client from './axios';

export const getKeyringInfo = async (keyringId) => {
  try {
    const { data } = await client.get(`keyrings/${keyringId}`);
    console.log('응답 : ', data);
    return data;
  } catch (err) {
    console.error('키링 상세정보를 가져오지 못했습니다.', err);
  }
};

export const getLetterDetail = async (messageId) => {
  try {
    const { data } = await client.get(`/messages/letters/dear/${messageId}`);
    return data;
  } catch (err) {
    console.error('편지 상세정보 조회에 실패했습니다.', err);
  }
};

export const getSentLetterDetail = async (messageId) => {
  try {
    const { data } = await client.get(`/messages/letters/sender/${messageId}`);
    return data;
  } catch (err) {
    console.error('편지 상세정보 조회에 실패했습니다.', err);
  }
};

//편지쓰기
export const sendLetter = async (textList, imageFileList) => {
  console.log(textList, imageFileList);
  const formData = new FormData();

  const textBlob = new Blob([JSON.stringify(textList)], {
    type: 'application/json',
  });
  formData.append('letter', textBlob);

  // 이미지 파일 리스트를 하나씩 추가
  imageFileList.forEach((imageFile, index) => {
    formData.append('images', imageFile.file);
  });

  try {
    const response = await client.post('/messages/letters', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    throw new Error('편지 전송 실패');
  }
};

export const getHighImage = async (messageId, index) => {
  try {
    const { data } = await client.get(`/messages/highimage`, {
      params: {
        messageId,
        index,
      },
    });
    return data;
  } catch (err) {
    console.error('고화질 이미지 조회에 실패했습니다.', err);
    return null;
  }
};
