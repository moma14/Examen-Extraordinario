import { Pressable, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

//este es el boton reutilizable para volver a la vista principal
export const BackButton = ({ onPress }: { onPress: () => void }) => {

  const colors = useThemeColors();
  return (
    <Pressable style={[styles.button, { backgroundColor: colors.primary }]} onPress={onPress}>
      <Text style={[styles.text, { color: colors.text }]}>Regresar</Text>
    </Pressable>
  )
};

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});