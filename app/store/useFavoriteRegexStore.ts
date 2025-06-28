import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegexExpression } from '../../features/regexTester/domain/entities/RegexExpression';

interface FavoriteStore {
  favorites: RegexExpression[]; //se agrega la expresión al arreglo
  addFavorite: (expr: RegexExpression) => void;//el resultado se pone al inicio del arreglo
  removeFavorite: (pattern: string) => void//para borrar la expresión individualmente
  clearFavorites: () => void; //para quitar todas las expresiones
}

export const useFavoriteRegexStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      //agrega la nueva expresion a favoritos al inicio
      addFavorite: (expr) =>
        set((state) => {
          const updated = [expr, ...state.favorites.filter(e => e.pattern !== expr.pattern)];
          return { favorites: updated };
        }),
      //quita la expresion individualmente
      removeFavorite: (pattern) =>
        set((state) => ({
          favorites: state.favorites.filter((e) => e.pattern !== pattern),
        })),
      //quita todas las expresiones que existan
      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: 'favorite-regex-storage',//nombre de la asyncstorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
