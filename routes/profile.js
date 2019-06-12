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
    body('username')
      .isLength({ min: 5 })
      .withMessage('Username must be at least 5 chars long'),
    body('email')
      .isEmail()
      .withMessage('Incorrect email format')
      .normalizeEmail()
      .trim()
  ],
  profileController.postEditPage
);
router.get('/users/profile/settings', auth, profileController.getSettingsPage);

router.post(
  '/users/profile/password',
  auth,
  [
    body('oldPassword')
      .not()
      .isEmpty()
      .withMessage('Old Password should not be empty'),
    body('newPassword')
      .isLength({ min: 8 })
      .withMessage(
        'New Password must be at least 8 chars long, Please try again'
      ),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match password');
      }

      // Success of this synchronous custom validator
      return true;
    })
  ],
  profileController.postSettingsPassword
);
router.post(
  '/users/profile/email',
  auth,
  [
    body('newEmail')
      .not()
      .isEmpty()
      .withMessage('New Email should not be empty')
      .isEmail()
      .withMessage('Incorrect email format!')
      .normalizeEmail()
      .trim(),
    body('confirmEmail')
      .normalizeEmail()
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.newEmail) {
          throw new Error('Password confirmation does not match password');
        }
        // Success of this synchronous custom validator
        return true;
      })
  ],
  profileController.postSettingsEmail
);

router.get('/users/delete', auth, profileController.getDeleteAccountPage);
router.post(
  '/users/delete/confirm',
  auth,
  [
    check('password')
      .not()
      .isEmpty()
      .withMessage('Your password must be added')
  ],
  profileController.postDeleteAccountPage
);
module.exports = router;
