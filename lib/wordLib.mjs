import * as sql from './SqlInit.mjs';
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

export function submitWord(req, res) {
  const word = req.body;
  const check = checks.userSubmitCheck(word);
  console.log(check);
  if (!check.status) {
    res.status(422);
    res.json(check.error);
    return;
  }
  res.status(200);
  word.category = 'user';
  console.log(word);
  // sql.insertWord(req.body);
}
