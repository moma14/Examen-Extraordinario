import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useRegexStore } from '../../../../app/store/useRegexStore'; // Asegúrate de que esta ruta sea correcta

export const SavedExpressionsScreen = () => {
  const router = useRouter();
  const { recentExpressions } = useRegexStore(); // ← usamos la store Zustand

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expresiones Guardadas</Text>

      {/*Este texto se mostrará si no hay ninguna expresion guardada */}
      {recentExpressions.length === 0 ? (
        <Text>No hay expresiones guardadas.</Text>
      ) : (
        recentExpressions.map((item, idx) => (
          <Text key={idx} style={styles.item}>
            /{item.pattern}/{item.flags}
          </Text>
        ))
      )}

      {/*Este boton es para regresar a la vista principal */}
      <View style={{ marginTop: 20 }}>
        <Button title="Regresar" onPress={() => router.back()} />
      </View>
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
});

export default SavedExpressionsScreen;