const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const boardRouter = require('./routes/board');
const { logger } = require('./utils/logger');

// initialize app
const app = express();
const port = 3000;

// serve static files
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/game', express.static(path.join(__dirname, 'public/game.html')));

// parse json responses
app.use(bodyParser.json());

// attach routes to app
app.use('/api/board', boardRouter);

// start the application
app.listen(port, () => {
  logger.info(`Example app listening on port ${port}`);
});
