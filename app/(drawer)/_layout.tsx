import React, { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { RegexStorageSQLite } from '../../features/regexTester/data/local/RegexStorageSQLite';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  useEffect(() => {
    RegexStorageSQLite.init(); // se asegura que la tabla se cree al abrir cualquier vista del drawer
  }, []);
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="index" options={{ title: 'Inicio' }} />
        <Drawer.Screen name="Favoritos" options={{ title: 'Favoritos' }} />
        <Drawer.Screen name="Recientes" options={{ title: 'Recientes' }} />
      </Drawer>
    </GestureHandlerRootView>
  );
}
