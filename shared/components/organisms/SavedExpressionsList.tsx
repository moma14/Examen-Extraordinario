import { ScrollView, Text, StyleSheet, View } from 'react-native';
import { useRegexStore } from '../../../app/store/useRegexStore';
import { ExpressionItem } from '../atoms/SavedItem';
import { BackButton } from '../molecules/BackButton';
import { useRouter } from 'expo-router';

export const SavedExpressionsList = () => {
  const { recentExpressions } = useRegexStore();//usamos la store de zustand
  const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expresiones Recientes</Text>
        {/*Este texto se mostrará si no hay ninguna expresion guardada */}
      {recentExpressions.length === 0 ? (
        <Text>Aún no hay expresiones guardadas.</Text>
      ) : (
        recentExpressions.map((item, idx) => (
          <ExpressionItem key={idx} 
          pattern={item.pattern} flags={item.flags} />
        ))
      )}
        {/*Este boton es para regresar a la vista principal */}
      <BackButton onPress={() => router.back()} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    gap: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
