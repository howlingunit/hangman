import * as sql from './sql.mjs';
import * as fs from 'fs';

export async function addWordCheck(word) {
  const isWordInDB = await sql.isWordInDB(word.word);
  const profanities = JSON.parse(fs.readFileSync('./lib/profanities.json', 'utf8')).split(',');
  if (isWordInDB) {
    return { valid: false, error: 'word already part of game' };
  }
  if (word.word.length < 3) {
    return { valid: false, error: 'word too short' };
  }
  if (word.word.length > 18) {
    return { valid: false, error: 'word too long, must be less than 18 characters' };
  }
  if (/[^a-zA-Z\s]/g.test(word.word)) {
    return { valid: false, error: 'Word contains invalid characters' };
  }
  if (word.def.length > 500) {
    return { valid: false, error: 'hint is too long, must be less than 500 characters' };
  }
  if (word.def.length < 1) {
    return { valid: false, error: 'word needs hint' };
  }

  if (profanities.includes(word.word)) {
    return { valid: false, error: 'You cannot use that phrase' };
  }

  const explodedWord = word.word.toLowerCase().split(' ').concat(word.def.toLowerCase().split(' '));
  for (let i = 0; i < explodedWord.length; i++) {
    if (profanities.includes(explodedWord[i])) {
      return { valid: false, error: 'You cannot use that phrase' };
    }
  }
  return { valid: true };
}

export function categoryCheck(cat) {
  const validCategorys = ['random', 'movie', 'tvshow', 'user'];
  if (cat.length === 0) {
    return { valid: false, error: 'There needs to be at least 1 category' };
  }
  if (cat.length > 4) {
    return { valid: false, error: `there are only 4 categorys you have inputted ${cat.length}` };
  }
  for (let i = 0; i < cat.length; i++) {
    if (!validCategorys.includes(cat[i])) {
      return { valid: false, error: `${cat[i]} is not a valid category` };
    }
  }
  return { valid: true };
}

export function turnCheck(valid, userUnderscore, letter, word) {
  if (!valid) {
    return { valid: false, error: 'invalid input' };
  }
  if (!(userUnderscore.length === word.word.length)) {
    return { valid: false, error: 'underscore and word do not match length' };
  }
  if (!(letter.length === 1)) {
    return { valid: false, error: 'invalid letter string' };
  }
  return { valid: true };
}
