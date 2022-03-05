import * as sql from './SqlInit.mjs';

function makeUnderscores(word) {
  const regexLetters = /[a-z]/g;
  const result = word.replace(regexLetters, '_');
  return result.split('');
}
function formatWord(word) {
  const result = word.toLowerCase();
  return result.replace(/\s/g, '-');
}

export async function pickWord(req, res) {
  const word = await sql.getWord(req.body);
  word.word = formatWord(word.word);
  word.underscores = makeUnderscores(word.word);
  res.json(word);
}
