import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface Props {
  onPress: () => void;
  label: string;
}

export const DownloadButton = ({ onPress, label }: Props) => {
  return (
    //boton para descargar el AST como json en un txt
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginLeft: 10,
    marginBottom: 3,
  },
  label: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
  },
});
