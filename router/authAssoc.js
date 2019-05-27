const express = require('express');

const router = express.Router();

router.get('/signup/associations', (req, res) => {
  res.render('signupAssociations', {
    pageTitle: 'Signup'
  });
});

module.exports = router;
