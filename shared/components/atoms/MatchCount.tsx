import { Text } from 'react-native';

//este texto dirá cuantas coincidencias ha encontrado, en el texto a evaluar
export const MatchCount = ({ count }: { count: number }) => (
  <Text style={{ color: 'green', fontSize: 18 }}>
    Coincidencias encontradas: {count}
  </Text>
);
