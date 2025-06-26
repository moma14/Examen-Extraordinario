import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface Props {
  pattern: string;
  flags?: string; 
}

export const ExpressionItem = ({ pattern, flags }: Props) => {
  const colors=useThemeColors();
  return (
    <Text style={[styles.item, { color: colors.text }]}>
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
