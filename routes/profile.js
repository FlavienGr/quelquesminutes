const express = require('express');
const { check } = require('express-validator/check');
const auth = require('../middleware/auth');
const profileController = require('../controllers/profile');
const User = require('../models/User');

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
router.get('/users/profile/settings', auth, profileController.getSettingsPage);
module.exports = router;
