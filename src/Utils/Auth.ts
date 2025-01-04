import jwt from 'jsonwebtoken';

export const isAuthenticated = async (): Promise<boolean> => {
    const token = localStorage.getItem('authToken');
    console.log(token);
    if (!token) {
        return false;
    }

    try {
        const decodedToken = jwt.decode(token) as { privilege?: string };
        if (decodedToken && decodedToken.privilege === 'admin') {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};