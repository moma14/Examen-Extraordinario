import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFavoriteRegexStore } from '../../../../app/store/useFavoriteRegexStore';
import { FavoriteExpressionList } from '../../../../shared/components/molecules/FavoriteExpressionList';
import { BackButton } from '../../../../shared/components/molecules/BackButton';
import { useRouter } from 'expo-router';

export const FavoriteScreen = () => {
  const { favorites } = useFavoriteRegexStore();
   const router = useRouter();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Expresiones Favoritas</Text>
      <FavoriteExpressionList favorites={favorites} />

      {/*reutilizamos el boton de regresar */}
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

export default FavoriteScreen;
