const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const logger = require('morgan');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './config/dev.env' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './config/test.env' });
}

// /// App

const app = express();

// //// Databases
const redisClient = require('./database/redis');
require('./database/mongodb');

const { SESSION_REDIS_SECRET } = process.env;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const usersRouter = require('./routes/authUsers');
const assocRouter = require('./routes/authAssoc');
const globalRouter = require('./routes/global');

// /// DB connection

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const optionsRedis = {
  host: 'localhost',
  port: 6379,
  client: redisClient,
  ttl: 86400,
};
app.use(
  session({
    name: 'sid',
    store: new RedisStore(optionsRedis),
    secret: SESSION_REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 2,
    },
  })
);
app.use(usersRouter);
app.use(globalRouter);
app.use(assocRouter);

// //////

const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listen on port: ${PORT}`);
});
