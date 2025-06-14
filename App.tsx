import React from 'react';
import { RegexTesterScreen } from './features/regexTester/presentation/view/RegexTesterScreen';
import { useEffect } from 'react';
import { RegexStorageSQLite } from './features/regexTester/data/local/RegexStorageSQLite';


export default function App() {
    useEffect(() => {
    RegexStorageSQLite.init(); // crea la tabla si no existe
  }, []);
  
  return(
    <RegexTesterScreen/>
  ) ;
}
