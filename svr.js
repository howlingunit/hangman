import express from 'express';
import { pickWord } from './lib/wordLib.mjs';

const app = express();

app.use(express.static('static'));

app.post("/getWord", express.json(), pickWord);

app.listen(8081);