import React, { useEffect } from 'react';
import { Drawer } from 'expo-router/drawer';
import { RegexStorageSQLite } from '../../features/regexTester/data/local/RegexStorageSQLite';

export default function Layout() {
  useEffect(() => {
    RegexStorageSQLite.init(); // se asegura que la tabla se cree al abrir cualquier vista del drawer
  }, []);

  return (
    <Drawer>
      <Drawer.Screen name="index" options={{ title: 'Inicio' }} />
    </Drawer>
  );
}
