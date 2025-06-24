import { Pressable, Text, StyleSheet } from 'react-native';

//este es el boton reutilizable para volver a la vista principal
export const BackButton = ({ onPress }: { onPress: () => void }) => (
  <Pressable style={styles.button} onPress={onPress}>
    <Text style={styles.text}>Regresar</Text>
  </Pressable>
);

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