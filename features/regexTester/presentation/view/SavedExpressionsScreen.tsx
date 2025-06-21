import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useRegexStore } from '../../../../app/store/useRegexStore';

export const SavedExpressionsScreen = () => {
  const router = useRouter();
  const { recentExpressions } = useRegexStore(); // usamos la store Zustand

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expresiones Recientes</Text>

      {/*Este texto se mostrará si no hay ninguna expresion guardada */}
      {recentExpressions.length === 0 ? (
        <Text>Aún no hay expresiones guardadas.</Text>
      ) : (
        recentExpressions.map((item, idx) => (
          <Text key={idx} style={styles.item}>
            /{item.pattern}/{item.flags}
          </Text>
        ))
      )}

      {/*Este boton es para regresar a la vista principal */}
      <Pressable style={styles.button} onPress={() => router.back()} >
        <Text style={styles.buttontext}>Regresar</Text>
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
  buttontext: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 2,
    color:'white'
  },
  item: {
    fontSize: 19,
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
  }
});

export default SavedExpressionsScreen;