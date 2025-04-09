import axios from 'axios';

const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

export const isAuthenticated = async (): Promise<boolean> => {
  const token = localStorage.getItem('authToken');
  if (!token) return false;

  try {
    const response = await axios.get(`${SERVER_URL}/admin/health`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) return true;

    return false;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};