const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('home', {
    pageTitle: 'Home'
  });
});
router.get('/login', (req, res) => {
  res.send({ test: 'ok' });
});

router.get('/signup', (req, res) => {
  res.render('signupPage', {
    pageTitle: 'Signup'
  });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;
