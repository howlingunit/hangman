import express from 'express';
import * as word from './lib/wordlib.mjs';
// import * as sql from './lib/sql.mjs';

const app = express();

app.use(express.static('static'));

app.get('/word', word.pickWord);

app.post('/addWord', express.json(), word.addWord);

app.listen(8081);

// app.get('/test', (req, res) => {
// //   for (const prams of req.query) {
// //     console.log(prams);
// //   }
//   res.send(req.query);
// });
