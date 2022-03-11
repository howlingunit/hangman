import express from 'express';
import * as word from './lib/wordLib.mjs';
// import * as sql from './lib/SqlInit.mjs';

const app = express();

app.use(express.static('static'));

// app.get('/word/:random.:movie.:tvshow.:user', word.pickWord);
app.get('/word', word.pickWord);

// app.get('/test', (req, res) => {
// //   for (const prams of req.query) {
// //     console.log(prams);
// //   }
//   res.send(req.query);
// });

app.post('/getWord', express.json(), word.pickWord);


app.listen(8081);

// console.log(await sql.listWords());
// sql.pushWords();
