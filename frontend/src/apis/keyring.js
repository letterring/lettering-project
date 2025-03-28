const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getKeyringList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/keyrings/manage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch keyring list');
    }

    const data = await response.json();
    console.log('Keyring List:', data);
    return data; // 배열 형태로 반환됨
  } catch (error) {
    console.error('Error fetching keyring list:', error);
    throw error;
  }
};
