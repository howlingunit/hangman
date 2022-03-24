import * as sql from './sql.mjs';
import * as checks from './checks.mjs';

function formatWord(inputWord) {
  let word = inputWord.word.toLowerCase();
  const def = inputWord.def;
  word = word.replace(/\s/g, '-');
  const underscore = word.replace(/[a-z]/g, '_').split('');
  return { word, underscore, def };
}

export async function pickWord(req, res) {
  const categorys = [];
  for (const [cat, val] of Object.entries(req.query)) {
    if (val === 'true') {
      categorys.push(cat);
    }
  }
  let word = await sql.getWord(categorys);
  word = formatWord(word);
  res.json(word);
}

export async function addWord(req, res) {
  const word = req.body;
  const check = await checks.userSubmitCheck(word);
  if (!check.valid) {
    res.status(422);
    res.json(check.error);
    return;
  }
  res.send('OK');
  word.category = 'user';
  sql.insertWord(word);
}
