const mongoose = require('mongoose');

const { MONGO_DB_URI } = process.env;
mongoose.connect(MONGO_DB_URI, { useNewUrlParser: true, useCreateIndex: true });

const db = mongoose.connection;

db.once('open', () => {
  // eslint-disable-next-line no-console
  console.log('mongodb connected');
});
