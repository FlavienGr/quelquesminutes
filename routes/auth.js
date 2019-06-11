const express = require('express');

const router = express.Router();
const { check } = require('express-validator/check');
const authController = require('../controllers/auth');
const auth = require('../middleware/auth');

router.get('/signup', authController.getSignup);
router.post(
  '/signup',
  [
    check('email')
      .isEmail()
      .withMessage('Incorrect email format')
      .normalizeEmail()
      .trim(),
    check('username')
      .isLength({ min: 5 })
      .withMessage('Username must be at least 5 chars long'),
    check('password')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 5 chars long')
  ],
  authController.postSignup
);
router.get('/login', authController.getLogin);
router.post(
  '/login',
  [
    check('email')
      .isEmail()
      .withMessage('Incorrect email format')
      .normalizeEmail()
      .trim(),
    check('password')
      .isLength({ min: 3 })
      .withMessage('Password must be at least 5 chars long')
  ],
  authController.postLogin
);
router.get('/reset-password', authController.getResetPassword);
router.post(
  '/reset-password',
  [
    check('email')
      .not()
      .isEmpty()
      .withMessage('Please, enter an email')
      .isEmail()
      .withMessage('Incorrect email format')
      .normalizeEmail()
      .trim()
  ],
  authController.postResetPassword
);
router.get('/logout', auth, authController.getLogout);
module.exports = router;
