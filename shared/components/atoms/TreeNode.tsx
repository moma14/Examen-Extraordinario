import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { useThemeColors } from '../../hooks/useThemeColors';

type Props = {
  label: string;
  children?: React.ReactNode;
};
//con esto se crea un diagrama interactivo

export const TreeNode = ({ label, children }: Props) => {
  const [expanded, setExpanded] = useState(false);//este estado es el que maneja para expandir o colapsar el diagrama

  const hasChildren = React.Children.count(children) > 0;//con esto se verifica si hay hijos
  const colors=useThemeColors();

  return (
    <View style={[styles.node, { borderColor: colors.border }]}>
        {/* boton clickeable que se expande/colapsa si hay hijos */}
      <Pressable onPress={() => setExpanded(!expanded)}>
        <Text style={[
            styles.label,
            {
              color: colors.primary,
              backgroundColor: colors.inputBackground,
            },
          ]}>
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
    marginVertical: 4,
    borderLeftWidth: 1,
    borderColor: '#e0e0e0',
  },
  label: {
    fontSize: 20,
    fontWeight: '600',
    color: '#064aa5',
    backgroundColor: '#F4F6F8', 
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    overflow: 'hidden',
  },
  children: {
    marginTop: 4,
    paddingLeft: 12,
  },
});

