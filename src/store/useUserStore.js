import { create } from 'zustand';
import { getMe } from '../services/userService';

// Create a Zustand store for user information
const useUserStore = create((set) => ({
  userInfo: null,
  isLoading: false,
  setUserInfo: (userInfo) => set({ userInfo }),
  setLoading: (isLoading) => set({ isLoading }),
  logout: () => {
    localStorage.removeItem('token');
    set({ userInfo: null });
  },

  fetchUserInfo: async (force) => {
    const token = localStorage.getItem("token");
    const state = useUserStore.getState();
    if (token) {
      if (force || !state.userInfo) { 
        set({ isLoading: true });
        try {
            const userInfo = await getMe();
            set({ userInfo, isLoading: false });
        } catch (error) {
            console.error("Error fetching user info:", error);
            set({ isLoading: false });
        }
    } else {
        set({ isLoading: false });
      }
    }
  },
}));

export default useUserStore;