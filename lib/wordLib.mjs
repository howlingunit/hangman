import * as sql from './SqlInit.mjs';
import * as checks from './checks.mjs';

function formatWord(inputWord) {
  let word = inputWord.word.toLowerCase();
  word = word.replace(/\s/g, '-');
  const underscore = word.replace(/[a-z]/g, '_');
  return { word, underscore };
}

export async function pickWord(req, res) {
  let word = await sql.getWord(req.body);
  word = formatWord(word);
  res.json(word);
}

export function submitWord(req, res) {
  const word = req.body;
  const check = checks.userSubmitCheck(word);
  if (!check.status) {
    res.status(422);
    res.json(check.error);
  }
  word.category = 'user';
  console.log(word);
  // sql.insertWord(req.body);
}
