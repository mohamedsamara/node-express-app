const express = require('express');

const app = express();
const port = 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}!`);
});
