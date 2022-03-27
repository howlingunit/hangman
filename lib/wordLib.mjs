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
  let categorys = req.query;
  if (categorys.includes(',')){categorys = categorys.join(',')} else {
    res.status(422);
    res.json('invalid input');
    return;
  }
  const check = checks.categoryCheck(categorys)
  if (!check.valid) {
    res.status(442);
    res.json(check.error)
  }
  let word = await sql.getWord(categorys);
  word = formatWord(word);
  res.json(word);
  return;
}

export async function addWord(req, res) {
  const word = req.body;
  if (typeof word.word === 'string') { word.word = word.word.trim(); } else {
    res.status(422);
    res.json('Not a string');
    return;
  }
  const check = await checks.addWordCheck(word);
  if (!check.valid) {
    res.status(422);
    res.json(check.error);
    return;
  }
  res.send('OK');
  word.category = 'user';
  sql.insertWord(word);
}
