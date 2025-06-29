import { RegexExpression } from '../entities/RegexExpression';
import { useRegexStore } from '../../../../shared/store/useRegexStore';

export const saveRecentExpression = (expression: RegexExpression) => {
  //esta función encapsula la lógica para guardar una expresión reciente
  const { addRecentExpression } = useRegexStore.getState();
  //se obtiene directamente el método 'addRecentExpression' del estado global
  addRecentExpression(expression);
};