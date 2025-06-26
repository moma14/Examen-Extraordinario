import React from 'react';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { RegexStorageSQLite } from '../../../features/regexTester/data/local/RegexStorageSQLite';
import { useFavoriteRegexStore } from '../../../app/store/useFavoriteRegexStore';
import { useRouter } from 'expo-router';

interface Props {
  expression: string;
  onSaved?: (message: string) => void;//se se guarda o no muestra un mensaje
}

export const ExpressionSavePanel = ({ expression, onSaved }: Props) => {
  const { addFavorite } = useFavoriteRegexStore();
  const router = useRouter();

  const handleSave = async () => {
    try {
      if (!expression.trim()) return;

      const match = expression.match(/^\/(.+)\/([gimsuy]*)$/);
      const pattern = match ? match[1] : expression;
      const flags = match ? match[2] : 'g';

      const exprObj = { pattern, flags };

      await RegexStorageSQLite.save(exprObj);
      addFavorite(exprObj); //lo guarda en la store de zustand

      onSaved?.('Expresión guardada en favoritos');//muestra este mensaje si se guardo correctamente la expresión
    } catch (err) {
      console.error('Error al guardar en favoritos:', err); 
      onSaved?.('Error al guardar en favoritos');//si aparece un error
    }
  };

  return (
    <View style={styles.panel}>
      <Pressable style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Guardar Expresión</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={() => router.push('/(drawer)/Favoritos')}>
        <Text style={styles.buttonText}>Mostrar expresiones favoritas</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  panel: {
    gap: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 10,
    marginBottom: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
});
