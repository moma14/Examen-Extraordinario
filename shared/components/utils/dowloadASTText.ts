import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export const downloadASTasText = async (ast: any) => {
  if (!ast) return;

  try {
    const jsonString = JSON.stringify(ast, null, 2); //formato bonito
    const fileUri = FileSystem.documentDirectory + 'ast.txt'; //se descarga con esa nomenclatura

    await FileSystem.writeAsStringAsync(fileUri, jsonString, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    await Sharing.shareAsync(fileUri); // abre diálogo de compartir

  } catch (error) {
    console.error('Error al guardar AST:', error);
  }
};
