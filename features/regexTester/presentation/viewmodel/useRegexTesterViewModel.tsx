import { useState, useEffect } from 'react';
import { RegexExpression } from '../../domain/entities/RegexExpression';
import { saveRecentExpression } from '../../domain/usecases/SaveRecentExpressionUseCase';

export function useRegexTesterViewModel() {
  const [expression, setExpression] = useState<string>(''); // Regex escrita
  const [testText, setTestText] = useState<string>(''); // este es el texto a evaluar
  const [matches, setMatches] = useState<string[]>([]); // las coincidencias encontradas
  const [error, setError] = useState<string | null>(null); // Error si el regex es inválido

  // función para limpiar caracteres invisibles al pegar desde portapapeles
  const cleanExpression = (exp: string): string => {
    return exp
      .normalize('NFKC')
      .replace(/[\u200B-\u200D\uFEFF\u202A-\u202E\u200E]/g, ''); // elimina caracteres invisibles que causan errores en algunas expresiones pegadas
  };

  useEffect(() => {
    if (!expression || expression.trim() === '') {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const normalizedText = testText.endsWith('\n') ? testText : testText + '\n';

      const cleanedExpression = cleanExpression(expression); // usamos expresión limpiada
      const match = cleanedExpression.match(/^\/(.*)\/([gimsuy]*)$/); // regex delimitado con .* en lugar de .+ para evitar errores si está vacío

      if (match && typeof match[1] === 'string') {
        // Si se usó formato delimitado /expresion/flags
        const regex = new RegExp(match[1], match[2]); // crea con flags extraídos
        const found = [...normalizedText.matchAll(regex)].map(m => m[0]); // usa matchAll
        setMatches(found);
        setError(null);
      } else {
        // Si no se usó delimitador, intenta con expresión directa y flag global por defecto
        const regex = new RegExp(cleanedExpression, 'g');
        const found = [...normalizedText.matchAll(regex)].map(m => m[0]);
        setMatches(found);
        setError(null);
      }

    } catch (err) {
      setMatches([]);
      setError('Expresión inválida');
      console.log(' Regex inválida:', err); 
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
