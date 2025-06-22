import React, { useState } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { RegexStorageSQLite } from '../../../features/regexTester/data/local/RegexStorageSQLite';
import { useFavoriteRegexStore } from '../../../app/store/useFavoriteRegexStore';

interface Props {
  expression: string;
  onSaved?: (message: string) => void;
}

export const ExpressionSavePanel = ({ expression, onSaved }: Props) => {
  const { addFavorite } = useFavoriteRegexStore();

  const handleSave = async () => {
    try {
      if (!expression.trim()) return;

      const match = expression.match(/^\/(.+)\/([gimsuy]*)$/);
      const pattern = match ? match[1] : expression;
      const flags = match ? match[2] : 'g';

      const exprObj = { pattern, flags };

      await RegexStorageSQLite.save(exprObj);
      addFavorite(exprObj);//lo guarda en la store de zustand

      onSaved?.('Expresión guardada en favoritos'); //si se guardó el mensaje con éxito muestra este mensaje
    } catch (err) {
      onSaved?.('Error al guardar en favoritos');//si hubo algún problema muestra este
    }
  };

  return (
    //boton reutilizable para guardar la expresión
    <Pressable style={styles.button} onPress={handleSave}>
      <Text style={styles.buttonText}>Guardar Expresión</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
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
