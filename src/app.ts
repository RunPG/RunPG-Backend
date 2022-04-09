import express from 'express';

const app = express();
const PORT = 5000;

app.get('/', (_, res) => {
  res.send('RunPG!');
});

app.listen(PORT, () => {
  return console.log(`Server is listening on ${PORT}`);
});
