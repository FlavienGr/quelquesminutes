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

const types = {
  association: {
    username: 'Rain Fall',
    email: 'shitweather@fake.io',
    password: 'thesummerisComing?'
  },
  user: {
    username: 'Thomas Edison',
    email: 'edison@fake.io',
    password: 'ibecamepresident'
  }
};
const user = new User({
  username: types.user.username,
  email: types.user.email,
  password: types.user.password,
  isAssociation: false
});
const association = new User({
  username: types.association.username,
  email: types.association.email,
  password: types.association.password,
  isAssociation: true
});
const createUsers = async () => {
  await user.save();
  await association.save();
  return db.close(err => console.log(err));
};
createUsers();
