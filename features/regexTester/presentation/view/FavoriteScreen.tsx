import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useFavoriteRegexStore } from '../../../../app/store/useFavoriteRegexStore';

export const HistorialScreen = () => {
  const router = useRouter();
  const { favorites } = useFavoriteRegexStore();//usamos la store Zustand

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expresiones Favoritas</Text>
       {/*Este texto se mostrará si no hay ninguna expresion guardada */}
      {favorites.length === 0 ? (
        <Text>No hay expresiones favoritas.</Text>
      ) : (
        favorites.map((item, idx) => (
          <Text key={idx} style={styles.item}>
            /{item.pattern}/{item.flags}
          </Text>
        ))
      )}
      {/*Este boton es para regresar a la vista principal */}
      <Pressable style={styles.button} onPress={() => router.back()}>
        <Text style={styles.buttonText}>Regresar</Text>
      </Pressable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    fontSize: 18,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#444',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#007AFF",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default HistorialScreen;
