import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { ASTTreeViewer } from '../../../features/regexTester/presentation/components/ASTTreeViewer';
import { useThemeColors } from '../../hooks/useThemeColors';

interface Props {
  ast: any;
  error: string | null;
}

export const ASTVisualizer = ({ ast, error }: Props) => {
  if (error) {//este mensaje sale si hubo algun error
    return <Text style={styles.error}>Error generando AST: {error}</Text>;
  }

  if (!ast) return null;
  const colors=useThemeColors();


  return (
    <View>
      <Text style={[styles.subtitle, { color: colors.text }]}>Árbol de Sintaxis (AST):</Text>

      <ASTTreeViewer ast={ast} />
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 6,
  },
});

export default ASTVisualizer;
