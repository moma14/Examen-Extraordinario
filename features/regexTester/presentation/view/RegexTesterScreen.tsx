import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { RegexInput } from '../components/RegexInput';
import { TestTextInput } from '../components/TestTextInput';
import { useRegexTesterViewModel } from '../viewmodel/useRegexTesterViewModel';

export const RegexTesterScreen = () => {
  const {
    expression,
    testText,
    setExpression,
    setTestText,
    matches,
    error,
  } = useRegexTesterViewModel();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Tester de Expresiones Regulares</Text>
      <RegexInput value={expression} onChange={setExpression} />
      <TestTextInput value={testText} onChange={setTestText} />

      {error ? (
        <Text style={styles.error}> Error: {error}</Text>
      ) : (
        <Text style={styles.matches}>
           Coincidencias encontradas: {matches.length}
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
  },
  matches: {
    color: 'green',
  },
});
