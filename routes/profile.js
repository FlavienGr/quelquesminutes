const express = require('express');
const { check } = require('express-validator/check');
const auth = require('../middleware/auth');
const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/users/profile', auth, profileController.getProfil);

router.get('/users/edit', auth, profileController.getEditPage);

router.post(
  '/users/edit',
  [
    check('email')
      .isEmail()
      .withMessage('Incorrect email format')
  ],
  auth,
  profileController.postEditPage
);

module.exports = router;
