import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface Props {
  pattern: string;
  flags?: string; 
}

export const ExpressionItem = ({ pattern, flags }: Props) => {
  return (
    <Text style={styles.item}>
      /{pattern}/{flags ?? ''}
    </Text>
  );
};

const styles = StyleSheet.create({
  item: {
    fontSize: 19,
    paddingVertical: 4,
    fontWeight: 'bold',
    color: '#444',
  },
});
