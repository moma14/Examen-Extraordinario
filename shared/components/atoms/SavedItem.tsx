import React from 'react';
import { Text, StyleSheet, View} from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface Props {
  pattern: string;
  flags?: string;
}

export const ExpressionItem = ({ pattern, flags }: Props) => {
  const colors = useThemeColors();


  return (
    <View style={styles.row}>
      <Text style={[styles.item, { color: colors.text }]}>
        /{pattern}/{flags ?? ''}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  item: {
    fontSize: 19,
    paddingVertical: 4,
    fontWeight: 'bold',
    flexShrink: 1,
  }
});
