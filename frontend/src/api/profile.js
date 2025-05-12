// src/api/profile.js
export const getProfile = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        return { success: false, message: 'No token found' };
    }

    try {
        const res = await fetch("/api/users/profile", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            return { success: false, message: 'Failed to fetch profile' };
        }

        const data = await res.json();
        if (!data.success) {
            return { success: false, message: data.message };
        }

        return { success: true, user: data.data };
    } catch (error) {
        return { success: false, message: 'Error fetching profile' };
    }
};
