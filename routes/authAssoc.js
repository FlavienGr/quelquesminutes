const express = require('express');
const Association = require('../models/Association');
const router = express.Router();

router.get('/associations', (req, res) => {
  res.render('signupAssociations', {
    pageTitle: 'Signup',
  });
});
router.post('/signup/associations', async (req, res) => {
  console.log(req);
  const { email, password, username } = req.body;
  if (!email && !password && !username) {
    throw new Error('Email, Password and Username required');
  }

  const association = new Association({ username, email, password });
  try {
    await association.save();
    req.session.user = association._id;

    res.redirect('/');
  } catch (error) {
    res.sendStatus(400);
  }
});
module.exports = router;
