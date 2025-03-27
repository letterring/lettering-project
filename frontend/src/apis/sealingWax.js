// apis/sealingWax.js
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getSealingWaxList = async () => {
  try {
    const response = await fetch(`${BASE_URL}/sealingwax`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch sealing wax list');
    }

    const data = await response.json();
    console.log('Sealing Wax Data:', data);
    return data.sealingWaxes;
  } catch (error) {
    console.error('Error fetching sealing wax:', error);
    throw error;
  }
};
