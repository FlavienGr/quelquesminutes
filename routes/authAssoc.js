const express = require('express');
const router = express.Router();
const { check } = require('express-validator/check');
const assocController = require('../controllers/authAssoc');

// router.get('/associations', assocController.getSignup);

router.post(
  '/signup/associations',
  [
    check('email')
      .isEmail()
      .withMessage('Incorrect email format'),
    check('username')
      .isLength({ min: 5 })
      .withMessage('Username must be at least 5 chars long'),
    check('password')
      .isLength({ min: 3 })
      .withMessage('Password must be at least 5 chars long'),
  ],
  assocController.postSignup
);
module.exports = router;
