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
      .withMessage('Incorrect email format'),
    check('username')
      .isLength({ min: 5 })
      .withMessage('Username must be at least 5 chars long'),
    check('password')
      .isLength({ min: 3 })
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
      .withMessage('Incorrect email format'),
    check('password')
      .isLength({ min: 3 })
      .withMessage('Password must be at least 5 chars long')
  ],
  authController.postLogin
);
router.get('/users/profile', auth, authController.getProfil);
router.get('/logout', authController.getLogout);
module.exports = router;
