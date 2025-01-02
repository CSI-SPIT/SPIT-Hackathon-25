import axios from 'axios';

export const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem('authToken');
    console.log(token)
    if (!token) {
        return false;
    }

    try {
        const response = await axios.get('http://127.0.0.1:3000/features', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        return response.status === 200;
    } catch (error) {
        console.error('Error checking authentication:', error);
        return false;
    }
};