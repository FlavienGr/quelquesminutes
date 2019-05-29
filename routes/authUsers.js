const express = require('express');
const User = require('../models/User');

const router = express.Router();

router.get('/signup/users', (req, res) => {
  res.render('signupUsers', {
    pageTitle: 'Signup'
  });
});
router.post('/signup/users', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error('Email or Password required');

  const user = new User({ email, password });
  try {
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send('error');
  }
});

module.exports = router;
