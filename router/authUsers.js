const express = require('express');

const router = express.Router();

router.get('/signup/users', (req, res) => {
  res.render('signupUsers', {
    pageTitle: 'Signup'
  });
});
router.post('/signup/users', (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  console.log(password);
  console.log(req.body);
  res.send('<h1>User signup</h1>');
});

module.exports = router;
