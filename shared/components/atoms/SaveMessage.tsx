import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  message: string;
}

export const SaveMessage = ({ message }: Props) => {
  if (!message) return null;
    {/*se muestra el mensaje de Expresion guardada o error al guardar, al presionar el bton */}
  return <Text style={styles.info}>{message}</Text>;
};

const styles = StyleSheet.create({
  info: {
    color: 'blue',
    fontSize: 14,
    marginTop: 5,
  },
});
