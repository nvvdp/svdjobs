import { create } from "zustand";

export const useUserStore = create((set) => ({
    isLoggedIn: false,
    setIsLoggedIn: (status) => set({ isLoggedIn: status }),
    
    getLogin: async (email, password) => {
        const res = await fetch("/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (data.success) {
            localStorage.setItem('token', data.token); // Store the token in localStorage
            return { success: true, user: data.data };
        }
        if (!data.success) {
            return { success: false, message: data.message };
        }
    },
    getProfile: async () => {
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
    },
}));