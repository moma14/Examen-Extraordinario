import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RegexExpression } from '../domain/entities/RegexExpression';

interface RegexStore {
  recentExpressions: RegexExpression[];// la lista de expresiones recientes guardadas
  setRecentExpressions: (expr: RegexExpression[]) => void;// este es el método para reemplazar toda la lista
  addRecentExpression: (expr: RegexExpression) => void;// y este es el método para agregar una nueva expresión
}

export const useRegexStore = create<RegexStore>()(
  persist(
    (set) => ({
      recentExpressions: [],
      setRecentExpressions: (expr) => set({ recentExpressions: expr }),
      // reemplaza todo el arreglo de expresiones recientes
      addRecentExpression: (expr) =>
        set((state) => {
          // agrega la nueva expresión al principio del array, y elimina duplicados por pattern
          const updated = [expr, ...state.recentExpressions.filter(e => e.pattern !== expr.pattern)];
          // devuelve solo los primeros 10 elementos para limitar la lista
          return { recentExpressions: updated.slice(0, 10) };// máximo 10 recientes
        }),
    }),
    {
      name: 'recent-regex-storage', // nombre de la clave en AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
