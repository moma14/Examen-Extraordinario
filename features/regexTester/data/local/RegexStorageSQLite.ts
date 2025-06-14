import { openDatabaseSync } from 'expo-sqlite';
import { RegexExpression } from '../../domain/entities/RegexExpression';

const db = openDatabaseSync('regex.db');//se crea la bd si no existe

export class RegexStorageSQLite {
  static async init(): Promise<void> {
    await db.execAsync(//se crea la tabla para ingresar la expresion regular, incluida la fecha de creación
      `CREATE TABLE IF NOT EXISTS expressions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        pattern TEXT NOT NULL,
        flags TEXT,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP
      );`
    );
  }
//se ingresan las expresiones
  static async save(expression: RegexExpression): Promise<void> {
    await db.runAsync(
      'INSERT INTO expressions (pattern, flags) VALUES (?, ?);',
      [expression.pattern, expression.flags ?? '']
    );
  }
//y se consultan las expresiones
  static async getAll(): Promise<RegexExpression[]> {
    const result = await db.getAllAsync<RegexExpression>(
      'SELECT * FROM expressions ORDER BY created_at DESC;'
    );
    return result;
  }
}
