const express = require('express');
const { check, body } = require('express-validator/check');
const auth = require('../middleware/auth');
const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/users/profile', auth, profileController.getProfil);

router.get('/users/edit', auth, profileController.getEditPage);

router.post(
  '/users/edit',
  auth,
  [
    body('email')
      .isEmail()
      .withMessage('Incorrect email format')
  ],
  profileController.postEditPage
);
router.get('/users/profile/settings', auth, profileController.getSettingsPage);

router.post(
  '/users/profile/password',
  auth,
  [
    body('oldPassword')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 chars long, Please try again'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage(
        'New Password must be at least 5 chars long, Please try again'
      ),
    check('confirmPassword')
      .not()
      .isEmpty()
      .withMessage('Password confirmation is required')
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error('Password confirmation does not match password');
        }

        // Success of this synchronous custom validator
        return true;
      })
  ],
  profileController.postSettingsPassword
);
module.exports = router;
