import uuid from 'uuid-random';
import * as sqlite from 'sqlite';

async function init() {
  const db = await sqlite.open('./database.sqlite', { verbose: true });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}
const dbConn = init();

export async function listWords() {
  const db = await dbConn;
  return db.all('SELECT * FROM words');
}
