import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

interface Props {
  ast: any;
}

export const ASTViewer = ({ ast }: Props) => {
  return (
    /*muestra el arbol en tiempo real */
    <ScrollView style={styles.container}>
      <Text selectable style={styles.text}>
        {JSON.stringify(ast, null, 2)}
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    maxHeight: 300,
    marginTop: 10,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },
  text: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
});