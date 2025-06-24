import React from 'react';
import { ExpressionItem } from '../atoms/SavedItem';
import { RegexExpression } from '../../../features/regexTester/domain/entities/RegexExpression';
import { Text } from 'react-native';

interface Props {
  favorites: RegexExpression[];
}

export const FavoriteExpressionList = ({ favorites }: Props) => {
  if (favorites.length === 0) {
    //este texto se mostrará si no hay ninguna expresión guardada
    return <Text>No hay expresiones favoritas.</Text>;
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
