import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

type Props = {
  label: string;
  children?: React.ReactNode;
};
//con esto se crea un diagrama interactivo

export const TreeNode = ({ label, children }: Props) => {
  const [expanded, setExpanded] = useState(false);//este estado es el que maneja para expandir o colapsar el diagrama

  const hasChildren = React.Children.count(children) > 0;//con esto se verifica si hay hijos

  return (
    <View style={styles.node}>
        {/* boton clickeable que se expande/colapsa si hay hijos */}
      <Pressable onPress={() => setExpanded(!expanded)}>
        <Text style={styles.label}>
            {/* Si tiene hijos, muestra ▶ o ▼ dependiendo del estado */}
          {hasChildren ? (expanded ? '▼ ' : '▶ ') : '• '}
          {label}
        </Text>
      </Pressable>
      {/* Si está expandido, muestra los hijos */}
      {expanded && <View style={styles.children}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  node: {
    paddingLeft: 12,
    marginVertical: 2,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  children: {
    paddingLeft: 10,
    borderLeftWidth: 1,
    borderColor: '#ccc',
    marginLeft: 6,
  },
});
