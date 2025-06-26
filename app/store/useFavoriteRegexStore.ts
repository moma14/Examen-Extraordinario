import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegexExpression } from '../../features/regexTester/domain/entities/RegexExpression';

interface FavoriteStore {
  favorites: RegexExpression[];//agrega la nueva expresion al arreglo
  addFavorite: (expr: RegexExpression) => void;//el resultado se guarda al inicio del arreglo
}

export const useFavoriteRegexStore = create<FavoriteStore>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (expr) =>
        set((state) => {
          const updated = [expr, ...state.favorites.filter(e => e.pattern !== expr.pattern)];
          return { favorites: updated };
        }),
    }),
    {
      name: 'FAVORITE_REGEX_STORE',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
