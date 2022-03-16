import express from 'express';
import * as word from './lib/wordLib.mjs';
// import * as sql from './lib/SqlInit.mjs';

const app = express();

app.use(express.static('static'));

app.get('/word', word.pickWord);

app.post('/submitWord', express.json(), word.submitWord);

app.listen(8081);

// app.get('/test', (req, res) => {
// //   for (const prams of req.query) {
// //     console.log(prams);
// //   }
//   res.send(req.query);
// });

// console.log(await sql.listWords());
// sql.pushWords();
