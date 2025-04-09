import client from './axios';

export const getUserAdress = async () => {
  try {
    const { data, status } = await client.get('/users/address', {
      validateStatus: () => true,
    });

    return {
      status,
      data,
    };
  } catch (err) {
    console.error('회원 주소 조회에 실패했습니다.', err);
  }
};

// export const submitOrder = async (orderData) => {
//   try {
//     const data = await client.post('/payment/order', orderData);
//     return data;
//   } catch (err) {
//     console.error('주문정보 생성에 실패했습니다.', err);
//   }
// };

export const submitOrder = async (orderData) => {
  try {
    const { data } = await client.post('/payment/order', orderData);
    const { orderNumber, pcUrl, mobileUrl } = data;

    return { orderNumber, pcUrl, mobileUrl }; // 💡 여기가 핵심
  } catch (err) {
    console.error('주문정보 생성에 실패했습니다.', err);
    throw err;
  }
};

export const approvePayment = async ({ pgToken, orderNumber }) => {
  try {
    const res = await client.get('/payment/approve', {
      params: {
        pg_token: pgToken,
        orderNumber,
      },
    });
    return res.data;
  } catch (err) {
    console.error('주문 실패', err);
    const errorMessage = err.response?.data?.message || '주문에 실패했습니다.';

    throw new Error(errorMessage);
  }
};

export const submitKeyringCustomization = async (keyringList) => {
  try {
    const payload = { keyrings: keyringList };
    await client.patch('/keyrings/customize', payload);
  } catch (err) {
    console.error('키링 초기 세팅 실패', err);
  }
};
