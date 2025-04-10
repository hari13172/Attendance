import { useAtom } from 'jotai';
import { Outlet, useNavigate } from 'react-router';

import { useQuery } from '@tanstack/react-query';
import { userAtom } from '@/jotai/userAtom';
import { getAuthToken } from '@/api/getAuthToken';
import { base_path } from '@/api/api';


function AuthLayer() {
    const [user, setUser] = useAtom(userAtom);
    const navigate = useNavigate()

    console.log("AuthLayer user", user);

    const fetchUserData = async () => {
        const authToken = getAuthToken();
        console.log("AuthLayer authToken", authToken);
        if (!authToken) {
            navigate('/auth/login', { replace: true });
            return { id: null, username: null, role: null };
        };
        const response = await fetch(`${base_path}/users/me`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
            navigate('/auth/login', { replace: true });
            return { id: null, username: null, role: null };
        }
        return response.json();
    };

    const { isLoading, data } = useQuery({
        queryKey: ['user'],
        queryFn: fetchUserData,
        enabled: true, // Disable automatic query
    });

    console.log("AuthLayer data", data);

    setUser(data);
    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Loading...</p>
            </div>
        );
    }


    return (
        <Outlet />
    );
}

export default AuthLayer;