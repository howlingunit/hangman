import uuid from 'uuid-random';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function init() {
  const db = await open({
    filename: './database/database.sqlite',
    driver: sqlite3.Database,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}
const dbConn = init();

export async function listWords() {
  const db = await dbConn;
  return db.all('SELECT word FROM words');
}

export async function getWordInfo(category) {
  if (!Array.isArray(category)) {
    console.error('category must be an array');
    return;
  }
  if (category.length === 0) {
    console.error('category is empty');
    return;
  }
  const words = [];
  const db = await dbConn;
  for (let i = 0; i < category.length; i++) {
    const selectedWords = db.all('SELECT w.word, w.id, w.def from words w where w.category = ?', category[i]);
    words.push(...await selectedWords);
  }

  const word = words[Math.floor(Math.random() * words.length)];

  if (!word) {
    console.error('failed to get a word');
    return;
  }

  return word;
}

export async function getWord(ID) {
  const db = await dbConn;
  const word = db.all('SELECT w.word from words w where w.id = ?', ID);
  return word;
}

export async function insertWord(word) {
  const db = await dbConn;
  const q = 'INSERT INTO words VALUES (?,?,?,?)';
  db.run(q, [uuid(), word.word, word.def, word.category]);
}

export async function removeWord(word) {
  const db = await dbConn;
  const q = 'DELETE FROM words WHERE word = ?';
  db.run(q, word);
}

export async function isWordInDB(word) {
  const db = await dbConn;
  const q = 'SELECT word FROM words WHERE word = ?';
  const result = await db.all(q, word);
  if (result.length < 1) { return false; }
  return true;
}
