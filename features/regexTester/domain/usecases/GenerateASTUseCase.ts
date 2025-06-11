import { parse } from 'regexp-tree';

//con esto se genera el AST
export function generateAST(expression: string) {
  try {
    // Si el usuario escribió con delimitadores, no se hace nada
    const isWrapped = expression.match(/^\/(.+)\/([gimsuy]*)$/);

    const input = isWrapped
      ? expression 
      : `/${expression}/`; // si no se envuelve la envolvemos nosotros

    const ast = parse(input);
    return ast;
  } catch (err) {
    console.error(' Error generando AST:', err);
    return null;
  }
}
