const dotenv = require('dotenv');
const express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const path = require('path');
const redisClient = require('./database/redis');

if (process.env.NODE_ENV === 'development') {
  dotenv.config({ path: './config/dev.env' });
} else if (process.env.NODE_ENV === 'test') {
  dotenv.config({ path: './config/test.env' });
}
const { SESSION_REDIS_SECRET } = process.env;

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const usersRouter = require('./router/authUsers');
const assocRouter = require('./router/authAssoc');
const globalRouter = require('./router/global');

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
const optionsRedis = {
  host: 'localhost',
  port: 6379,
  client: redisClient,
  ttl: 86400
};
app.use(
  session({
    name: 'sid',
    store: new RedisStore(optionsRedis),
    secret: SESSION_REDIS_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      path: '/',
      httpOnly: true,
      secure: false,
      maxAge: null
    }
  })
);
app.use(usersRouter);
app.use(assocRouter);
app.use(globalRouter);

// //////

const PORT = process.env.PORT || 3090;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Listen on port: ${PORT}`);
});
