import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { RegexExpression } from '../../domain/entities/RegexExpression';
import { RegexStorageSQLite } from '../../data/local/RegexStorageSQLite';
import { useRouter } from 'expo-router';

export const SavedExpressionsScreen = () => {
  const [savedExpressions, setSavedExpressions] = useState<RegexExpression[]>([]);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      const data = await RegexStorageSQLite.getAll();
      setSavedExpressions(data);
    };
    load();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expresiones Guardadas</Text>

      {savedExpressions.length === 0 ? (
        <Text>No hay expresiones guardadas.</Text>
      ) : (
        savedExpressions.map((item, idx) => (
          <Text key={idx} style={styles.item}>
            /{item.pattern}/{item.flags}
          </Text>
        ))
      )}

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
