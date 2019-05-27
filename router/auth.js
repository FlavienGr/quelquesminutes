const express = require('express');

const router = express.Router();

router.get('/login', (req, res) => {
  res.send({ test: 'ok' });
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});
module.exports = router;
