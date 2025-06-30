import React from 'react';
import { RegexTesterScreen } from './features/regexTester/presentation/view/RegexTesterScreen';
import { useEffect } from 'react';
import { RegexStorageSQLite } from './features/regexTester/data/local/RegexStorageSQLite';


export default function App() {
  if (__DEV__) {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        args[0].includes('Expected static flag was missing')
      ) {
        return; 
      }
      originalConsoleError(...args); // otros errores sí se muestran
    };
  }

  useEffect(() => {
    RegexStorageSQLite.init(); // crea la tabla si no existe
  }, []);

  return (
    <RegexTesterScreen />
  );
}
