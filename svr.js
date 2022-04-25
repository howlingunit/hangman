import express from 'express';
import * as word from './lib/wordlib.mjs';

const app = express();

app.use(express.static('static'));

app.get('/word', word.pickWord);

app.get('/answer', word.getAns);

app.get('/turn', word.turn);

app.post('/addWord', express.json(), word.addWord);

app.listen(8080);
