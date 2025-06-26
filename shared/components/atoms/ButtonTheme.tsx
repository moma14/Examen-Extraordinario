import { Pressable, Text, StyleSheet } from 'react-native';
import { useThemeStore } from '../../../app/store/useThemeStore';
import { useThemeColors } from '../../hooks/useThemeColors';

export const ButtonTheme = () => {
  const toggleTheme = useThemeStore(state => state.toggleTheme);
  const currentTheme = useThemeStore(state => state.theme);
  const colors = useThemeColors();

  return (
    //este boton es el que hace posible el cambio de tema
    <Pressable
      style={[styles.button, { backgroundColor: colors.primary }]}
      onPress={toggleTheme}
    >
      <Text style={[styles.text, { color: colors.text }]}>
        Tema: {currentTheme === 'light' ? 'Claro' : 'Oscuro'}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 10,
    alignSelf: 'flex-end',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
