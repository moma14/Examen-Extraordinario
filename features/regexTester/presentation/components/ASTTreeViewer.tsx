import React from 'react';
import { TreeNode } from '../../../../shared/components/atoms/TreeNode';

type ASTNode = {
  type: string;
  [key: string]: any;
};

type Props = {
  ast: ASTNode;// recibe el árbol como prop
};

export const ASTTreeViewer = ({ ast }: Props) => {

    // con esto renderiza un nodo cualquiera del AST
  const renderNode = (node: any, key = '') => {

    // Si el valor es un string, number, boolean, null, se muestra como texto plano
    if (typeof node !== 'object' || node === null) {
      return <TreeNode key={key} label={`${key}: ${String(node)}`} />;
    }

      // en cambio si es un arreglo, se renderiza cada elemento dentro de un nodo con el nombre del array
    if (Array.isArray(node)) {
      return (
        <TreeNode key={key} label={`${key} [array]`}>
          {node.map((child, idx) => renderNode(child, `${idx}`))}
        </TreeNode>
      );
    }
     //si es un nodo del AST con propiedades, renderiza sus hijos
    return (
      <TreeNode key={key} label={`${node.type ?? key}`}>
        {Object.entries(node).map(([k, v]) =>
          k === 'type' ? null : renderNode(v, k)
        )}
      </TreeNode>
    );
  };
   //comienza desde la raíz del árbol con la etiqueta "AST
  return renderNode(ast, 'AST');
};
