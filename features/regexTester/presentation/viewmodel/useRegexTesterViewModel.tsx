import { useState, useEffect } from 'react';

export function useRegexTesterViewModel() {
  const [expression, setExpression] = useState<string>(''); // Regex escrita
  const [testText, setTestText] = useState<string>(''); // este es el texto a evaluar
  const [matches, setMatches] = useState<string[]>([]); // las coincidencias encontradas
  const [error, setError] = useState<string | null>(null); // Error si el regex es inválido

  useEffect(() => {
    try {
      const normalizedText = testText.endsWith('\n') ? testText : testText + '\n';

      // Detectar si se usa formato delimitado: /expresión/flags
      const match = expression.match(/^\/(.+)\/([gimsuy]*)$/);

      const regex = match
        ? new RegExp(match[1], match[2])         // usa expresión y flags extraídos
        : new RegExp(expression, 'g');           // por defecto, 'g' si no se usa delimitador

      const found = [...normalizedText.matchAll(regex)].map(m => m[0]); //  usa normalizedText

      setMatches(found);
      setError(null);
      console.log(' Coincidencias:', found);
    } catch (err) {
      setMatches([]);
      setError('Expresión inválida');
      console.log(' Regex inválido:', err);
    }
  }, [expression, testText]);

  return {
    expression,
    testText,
    matches,
    error,
    setExpression,
    setTestText,
  };
}
