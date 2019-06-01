const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.post('/signup/users', async (req, res) => {
  const { email, password, username } = req.body;
  console.log(req);
  if (!email && !password && !username) {
    throw new Error('Email, Password and Username required');
  }
  const user = new User({ username, email, password });
  try {
    await user.save();
    req.session.user = user._id;
    res.render('home', {
      pageTitle: 'home',
    });
  } catch (error) {
    res.sendStatus(400);
  }
});

router.get('/login', (req, res) => {
  res.send({ test: 'ok' });
});

module.exports = router;
