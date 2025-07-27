import { create } from 'zustand';
import { AuthState, LoginForm, RegisterForm } from '../../utils/types';
import { AuthService } from '../../services/auth';

interface AuthStore extends AuthState {
  // Actions
  signIn: (form: LoginForm) => Promise<void>;
  signUp: (form: RegisterForm) => Promise<void>;
  signOut: () => Promise<void>;
  loadUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  // Actions
  signIn: async (form: LoginForm) => {
    set({ isLoading: true, error: null });
    try {
      await AuthService.signIn(form);
      await get().loadUser();
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  signUp: async (form: RegisterForm) => {
    set({ isLoading: true, error: null });
    try {
      await AuthService.signUp(form);
      // User will need to verify email before they can sign in
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  signOut: async () => {
    set({ isLoading: true });
    try {
      await AuthService.signOut();
      set({ user: null, isAuthenticated: false });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ isLoading: false });
    }
  },

  loadUser: async () => {
    set({ isLoading: true });
    try {
      const user = await AuthService.getCurrentUser();
      set({ 
        user, 
        isAuthenticated: !!user,
      });
    } catch (error: any) {
      set({ error: error.message, user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },

  clearError: () => set({ error: null }),
}));