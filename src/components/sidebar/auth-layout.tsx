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

    if (user.id !== null && user.username !== "" && user.role !== "") {
        return <Outlet />;
    }



    if (data?.id && data?.username && data?.role?.role) {
        setUser({ id: data.id, username: data.username, role: data.role.role });
    }

    return (
        <Outlet />
    );
}

export default AuthLayer;