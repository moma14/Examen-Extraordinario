import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface Props {
  onClear: () => void;
}

export const ClearFavoritesButton = ({ onClear }: Props) => {
  return (
    //boton para quitar todas las expresiones favoritas actuales
    <Pressable onPress={onClear} style={styles.clearButton}>
      <Text style={styles.clearText}> Borrar todas</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  clearButton: {
    alignSelf: 'flex-end',
    marginBottom: 10,
    backgroundColor: '#FF3B30',
    padding: 8,
    borderRadius: 6,
  },
  clearText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
