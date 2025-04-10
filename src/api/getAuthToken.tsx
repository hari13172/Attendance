import { getCookie } from 'typescript-cookie';

export const getAuthToken = () => {
    const auth_token = getCookie('access_token');
    return auth_token;
};