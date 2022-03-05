import express from 'express';
import * as sql from './lib/SqlInit.mjs';
import { pickWord } from './lib/wordLib.mjs';

const app = express();

app.use(express.static('static'));

app.post('/getWord', express.json(), pickWord);

app.listen(8081);
// sql.pushWords();
