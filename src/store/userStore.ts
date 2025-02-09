// src/store/userStore.ts
import axios from "axios";
import { create } from "zustand";

interface Progress {
  word: string;
  listen: string;
  grammar: string;
}

interface User {
  _id: string;
  username: string;
  name: string;
  progress: Progress;
}

interface UserState {
  user: User | null;
  fetchUser: () => void;
}

const useUserStore = create<UserState>((set) => ({
  user: null,
  fetchUser: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.status === "success") {
          set({ user: response.data.data });
        } else {
          localStorage.removeItem("token");
          set({ user: null });
        }
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        localStorage.removeItem("token");
        set({ user: null });
      }
    }
  },
}));

export default useUserStore;
