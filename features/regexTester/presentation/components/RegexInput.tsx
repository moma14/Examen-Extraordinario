import React from 'react';
import { TextInput, View, Text, StyleSheet } from 'react-native';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const RegexInput = ({ value, onChange }: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Expresión Regular</Text>
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Ej: \\d{3}-\\d{2}-\\d{4}"
        style={styles.input}
        autoCapitalize="none"
        autoCorrect={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 4 },
  label: { fontWeight: '600' },
  input: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
  },
});
