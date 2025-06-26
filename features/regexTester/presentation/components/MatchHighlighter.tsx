import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useThemeColors } from '../../../../shared/hooks/useThemeColors';

interface Props {
  text: string;
  matches: string[];
}

export const MatchHighlighter = ({ text, matches }: Props) => {
  const colors=useThemeColors();

  if (!matches.length) {
    return <Text style={[styles.text, { color: colors.text }]}>{text}</Text>;
  }

  // se crea la expresion que combine todas las coincidencias
  const pattern = new RegExp(`(${matches.map(escapeRegExp).join('|')})`, 'g');

  const parts = text.split(pattern);

  return (
    <Text style={[styles.text, { color: colors.text }]}>
      {parts.map((part, index) =>
        matches.includes(part) ? (
          <Text key={index} style={[styles.highlight, { backgroundColor: colors.highlight }]}>
            {part}
          </Text>
        ) : (
          <Text key={index}>{part}</Text>
        )
      )}
    </Text>
  );
};

//los caracteres especiales se escriben para que no rompan el regex de unión
function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

const styles = StyleSheet.create({
  text: {
    marginTop: 16,
    fontSize: 20,
    lineHeight: 22,
    fontFamily:'Comic Sans MS',
    fontStyle: 'italic',
    fontWeight: 'bold'
  },
  highlight: {
    backgroundColor: 'yellow',
    fontWeight: 'bold',
  },
}); 