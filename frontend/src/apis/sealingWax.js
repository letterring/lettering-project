const BASE_URL = '/api';

export const getSealingWaxList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sealing-wax`);
    if (!response.ok) {
      throw new Error('Failed to fetch sealing wax list');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching sealing wax:', error);
    throw error;
  }
};
