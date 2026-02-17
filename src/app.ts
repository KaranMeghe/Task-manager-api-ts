/** @format */
// # What data is coming?
// Where is it coming from?
// What should happen to that data?
// Where should I store it?
// What should I send back?

import express from 'express';
const app = express();
const portNumber = 3001;

app.get('/', (req, res) => {
  return res.send('Hello');
});

app.listen(portNumber, () => {
  console.log('Server is listning on port:', portNumber);
});
