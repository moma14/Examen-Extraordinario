import { parse } from 'regexp-tree';

export function generateAST(expression: string): { ast: any | null; error: string | null } {
  try {
    if (!expression.trim()) return { ast: null, error: null }; //con esto no parsea el campo vacío
    //para evitar que salte el error cuando no hay nada 

    const isWrapped = expression.match(/^\/(.+)\/([gimsuy]*)$/);
    const input = isWrapped ? expression : `/${expression}/`;

    const ast = parse(input);
    return { ast, error: null };
  } catch (err: unknown) {
    
    //aqui se manejan los errores
    const errorMsg = err instanceof Error ? err.message : 'Error desconocido';
    console.error(' Error generando AST:', errorMsg);
    return { ast: null, error: errorMsg };
  }
}