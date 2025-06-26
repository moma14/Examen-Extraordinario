import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../../../../shared/hooks/useThemeColors';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const TestTextInput = ({ value, onChange }: Props) => {
  const colors=useThemeColors();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Texto a Evaluar: </Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Ej: 123-45-6789"
        placeholderTextColor={colors.placeholder}
        style={[
          styles.input,
          {
            borderColor: colors.border,
            backgroundColor: colors.inputBackground,
            color: colors.text,
          },
        ]}
        multiline
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 4 },
  label: { fontWeight: '600', fontSize:18 },
 
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    minHeight: 60,
    fontSize:16
  },
});
