import { create } from 'zustand';

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;// el tema actual: 'light' o 'dark'
  toggleTheme: () => void;//funcion para alternar entre temas
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'light', //valor inicial
  toggleTheme: () =>
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light', //alternar tema
    })),
}));