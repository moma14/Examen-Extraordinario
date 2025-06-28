import React from 'react';
import { ExpressionItem } from '../atoms/SavedItem';
import { RegexExpression } from '../../../features/regexTester/domain/entities/RegexExpression';
import { Text } from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

interface Props {
  favorites: RegexExpression[];
}

export const FavoriteExpressionList = ({ favorites }: Props) => {
  const colors = useThemeColors();
  if (favorites.length === 0) {
    //este texto se mostrará si no hay ninguna expresión guardada
    return <Text style={{ color: colors.text }}>No hay expresiones favoritas.</Text>;
  }

  return (
    <>
      {favorites.map((item, idx) => (
        <ExpressionItem
          key={idx}
          pattern={item.pattern}
          flags={item.flags}
        />
      ))}
    </>
  );
};

