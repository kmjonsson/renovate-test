const express = require('express');
const chalk = require('chalk');
const _ = require('lodash');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const names = ['Anna', 'Björn', 'Cecilia'];
  const greeting = _.map(names, (name) => `Hej, ${name}!`).join(' ');
  res.send(greeting);
});

app.listen(port, () => {
  console.log(chalk.green(`Servern körs på http://localhost:${port}`));
});
