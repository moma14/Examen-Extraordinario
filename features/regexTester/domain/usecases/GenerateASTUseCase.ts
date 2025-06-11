import { parse } from 'regexp-tree';

//con esto se verifica las expresiones son validas
export function generateAST(expression: string): { ast: any | null; error: string | null } {
  try {
    if (!expression.trim()) return { ast: null, error: null };

    const match = expression.match(/^\/(.+)\/([gimsuy]*)$/);

    if (!match) {
      return { ast: null, error: 'Expresión no válida. Usa formato /expresión/flags' };
    }

    const pattern = match[1];
    const flags = match[2];

    //crreamos un RegExp estándar
    const regex = new RegExp(pattern, flags);

    //lo parseamos como string: /pattern/flags para que no cause conflictos con la librería regexp-tree
    const ast = parse(regex.toString());

    return { ast, error: null };
  } catch (err: unknown) {
    //con esto se generan los errores que apareceran en pantalla
    const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
    console.error(' Error generando AST:', errorMsg);
    return { ast: null, error: errorMsg };
  }
}
