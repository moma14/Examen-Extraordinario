import { useThemeStore } from '../store/useThemeStore';
import { darkColors, lightColors } from '../theme/colors';

//con esto devuelve los colores segun el tema activo
export const useThemeColors = () => {
  const { theme } = useThemeStore();//con esto obtiene el valor inicial de zustand
  return theme === 'dark' ? darkColors : lightColors;//devuelve los colores correspondientes
};