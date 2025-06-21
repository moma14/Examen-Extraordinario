import { create } from 'zustand';
import { RegexExpression } from '../../features/regexTester/domain/entities/RegexExpression';

interface FavoriteStore {
  favorites: RegexExpression[]; // esta es para la lista de expresiones favoritas
  addFavorite: (expr: RegexExpression) => void;  // este método para agregar una nueva
}

export const useFavoriteRegexStore = create<FavoriteStore>((set) => ({
  favorites: [],
  addFavorite: (expr) =>
    set((state) => {
      const updated = [expr, ...state.favorites.filter(e => e.pattern !== expr.pattern)];//quita cualquier expresión con el mismo pattern (evita duplicados).
        //luego agrega la nueva expr al inicio del arreglo.
        //el resultado se guarda como el nuevo estado.
      return { favorites: updated };
    }),
}));
