import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../../../../shared/hooks/useThemeColors';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const RegexInput = ({ value, onChange }: Props) => {
  const colors=useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Expresión Regular</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
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
  label: { fontWeight: '600',fontSize:18 },
  input: {
    borderWidth: 1,
    fontSize:16,
    padding: 8,
    borderRadius: 6,
  },
});
