import express from 'express';
import * as word from './lib/wordLib.mjs';

const app = express();

app.use(express.static('static'));

app.post('/getWord', express.json(), word.pickWord);

app.post('/submitWord', express.json, word.submitWord);

app.listen(8081);

// sql.pushWords();
