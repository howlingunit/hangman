import * as sql from './sql.mjs';

export async function userSubmitCheck(word) {
  const isWordInDB = await sql.isWordInDB(word.word);
  if (isWordInDB) {
    return { status: false, error: 'word already part of game' };
  }
  if (word.word.length < 3) {
    return { status: false, error: 'word too short' };
  }
  if (word.word.length > 45) {
    return { status: false, error: 'word too long, must be less than 45 characters' };
  }
  if (/^[0-9!@#\$%\^\&*\)\(+=._-]+$/g.test(word.word)) {
    return { status: false, error: 'Word contains invalid characters' };
  }
  if (word.def.length > 500) {
    return { status: false, error: 'hint is too long, must be less than 500 characters' };
  }
  if (word.def.length < 1) {
    return { status: false, error: 'word needs hint' };
  }
  return { status: true };
}
