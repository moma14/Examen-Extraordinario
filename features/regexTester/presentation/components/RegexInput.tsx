import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../../../../shared/hooks/useThemeColors';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

// Función para limpiar caracteres invisibles y normalizar texto
const cleanInput = (input: string): string => {
  return input
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E]/g, ''); // Elimina caracteres invisibles
};

export const RegexInput = ({ value, onChange }: Props) => {
  const colors = useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Expresión Regular</Text>
      <TextInput
        value={value}
        onChangeText={(text) => {
          const cleaned = cleanInput(text);
          onChange(cleaned);
        }}
        placeholder="Ej: \\d{3}-\\d{2}-\\d{4}"
        placeholderTextColor={colors.placeholder}
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.inputBackground,
            color: colors.text,
          },
        ]}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 4 },
  label: { fontWeight: '600', fontSize: 18 },
  input: {
    borderWidth: 1,
    fontSize: 16,
    padding: 8,
    borderRadius: 6,
  },
});
