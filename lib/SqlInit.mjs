import uuid from 'uuid-random';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { words } from './words.mjs';

async function init() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}
const dbConn = init();

export async function listWords() {
  const db = await dbConn;
  return db.all('SELECT * FROM words');
}

export async function getWord(category) {
  const db = await dbConn;
  const selectedWords = db.all('SELECT w.word, w.def from words w where w.category = ?', category);


  let word = await selectedWords;
  word = word[Math.floor(Math.random() * word.length)];
  return word;
}

export async function insertWord(word) {
  const db = await dbConn;
  const q = 'INSERT INTO words VALUES (?,?,?,?)';
  db.run(q, [uuid(), word.word, word.def, word.category]);
}

// run once
export function pushWords() {
  for (let i = 0; i < words.length; i++) {
    insertWord(words[i]);
  }
}
