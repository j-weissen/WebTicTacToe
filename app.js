const express = require('express')
const helmet = require('helmet')
const app = express();
const port = 3000;
const fs = require('promise-fs')

app.use(helmet({
  crossOriginResourcePolicy: false,
}))

const Game = require('./Game');
let game = new Game();

app.get('/set/:row([012]):col([012])', async (req, res) => {
  const row = req.params.row;
  const col = req.params.col;
  game.setCell(row, col);
  
  res.redirect(req.query.redirect);
})

app.get('/reset', (req, res) => {
  game.reset();

  res.redirect(req.query.redirect);
})

app.get('/image/:row([012]):col([012])', async (req, res) => {
  const row = req.params.row;
  const col = req.params.col;

  res.set('Content-Type', 'image/png')
  res.sendFile(game.field[row][col], {root: __dirname})
})

app.get('/image/message', async (req, res) => {
  let image;
  switch (game.winningState) {
    case null:
      image = "images/click2play.png"
      break;
    case game.Symbol.FREE:
      image = "images/draw.png"
      break;
    case game.Symbol.X:
      image = "images/xwon.png"
      break;
    case game.Symbol.O:
      image = "images/owon.png"
      break;
  }

  res.set('Content-Type', 'image/png')
  res.sendFile(image, {root: __dirname})
})

app.get('/image/reset', async (req, res) => {
  let image = game.freeze() ? "images/reset.png" : "images/reset_disabled.png";
  res.set('Content-Type', 'image/png')
  res.sendFile(image, {root: __dirname})
})

app.get('/page', async (req, res) => {
  const client = req.query.client;
  const server = req.hostname;
  let file = await fs.readFile('index.html.example');
  file = file.toString().replace('{server-domain}', server);
  file = file.toString().replace('{client-domain}', client);
  res.header('Content-Type', 'text/plain');
  res.send(file);
})

app.listen(port, () => {
  console.log(`WebTTT Server started!`)
})