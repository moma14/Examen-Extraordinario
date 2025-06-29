import React, { use } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useFavoriteRegexStore } from '../../../../shared/store/useFavoriteRegexStore';
import { FavoriteExpressionList } from '../../../../shared/components/molecules/FavoriteExpressionList';
import { BackButton } from '../../../../shared/components/molecules/BackButton';
import { useRouter } from 'expo-router';
import { useThemeColors } from '../../../../shared/hooks/useThemeColors';
import { ClearFavoritesButton } from '../../../../shared/components/atoms/ClearFavoritesButton';

export const FavoriteScreen = () => {
  const { favorites, clearFavorites} = useFavoriteRegexStore();
  const router = useRouter();
  const colors=useThemeColors();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} 
     contentContainerStyle={styles.container}>
      <ClearFavoritesButton onClear={clearFavorites} />
      <Text style={[styles.title, { color: colors.text }]}>Expresiones Favoritas</Text>
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
