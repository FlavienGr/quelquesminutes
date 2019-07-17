const mongoose = require('mongoose');

const { MONGO_DB_URI } = process.env;

mongoose.connect(MONGO_DB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true
});

const db = mongoose.connection;

db.once('open', () => {
  console.log('mongodb connected');
});

const User = require('../models/User');

const deleteUsers = async () => {
  await User.deleteMany();
  return db.close(err => console.log(err));
};
deleteUsers();
