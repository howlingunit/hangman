import * as sql from './sql.mjs';
import * as checks from './checks.mjs';

function formatWord(inputWord) {
  let word = inputWord.word.toLowerCase();
  word = word.replace(/\s/g, '-');
  const underscore = word.replace(/[a-z]/g, '_').split('');
  inputWord.underscore = underscore;
  inputWord.word = word;
  return inputWord;
}


export async function pickWord(req, res) {
  let categorys = req.query.words;
  if (categorys) { categorys = categorys.split(','); } else {
    res.status(422);
    res.json('invalid input');
    return;
  }
  const check = checks.categoryCheck(categorys);
  if (!check.valid) {
    res.status(422);
    res.json(check.error);
    return;
  }
  let word = await sql.getWordInfo(categorys);
  word = formatWord(word);
  delete word.word;
  res.json(word);
}

export async function addWord(req, res) {
  const word = req.body;
  if (typeof word.word === 'string') { word.word = word.word.trim(); } else {
    res.status(400);
    res.json('Not a string');
    return;
  }
  const check = await checks.addWordCheck(word);
  if (!check.valid) {
    res.status(400);
    res.json(check.error);
    return;
  }
  res.send('OK');
  word.category = 'user';
  sql.insertWord(word);
}

export async function turn(req, res) {
  let valid = true;
  let userUnderscore;
  let wordID;
  let letter;

  if (req.query.underscore) { userUnderscore = req.query.underscore; } else { valid = false; }
  if (req.query.wordID) { wordID = req.query.wordID; } else { valid = false; }
  if (req.query.letter) { letter = req.query.letter; } else { valid = false; }
  let word = await sql.getWord(wordID);
  if (!(word[0])) { valid = false; }
  const check = checks.turnCheck(valid, userUnderscore, letter, word[0]);
  if (!check.valid) {
    res.status(400);
    res.json(check.error);
    return;
  }

  word = formatWord(word[0]);
  userUnderscore = userUnderscore.split('');

  for (let i = 0; i < word.word.length; i++) {
    if (word.word[i] === letter) {
      userUnderscore[i] = letter;
    }
  }

  const win = userUnderscore.join('') === word.word;
  res.send({ win, userUnderscore, wordID });
}
