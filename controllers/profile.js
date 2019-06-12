const { validationResult } = require('express-validator/check');
const User = require('../models/User');
const { sendEmailChanged, sendToNewEmail } = require('../email/account');

exports.getProfil = async (req, res) => {
  const { username, email } = req.user;
  if (!req.user) {
    req.flash('error', 'unable to login you');
    return res.redirect('/login');
  }
  return res.render('profile/profile', {
    pageTitle: 'profil',
    errors: '',
    profileData: {
      username,
      email
    }
  });
};
// ///////////////////// Edit page;

exports.getEditPage = async (req, res) => {
  let errorFlashMessage = req.flash('error');
  if (errorFlashMessage.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    errorFlashMessage = errorFlashMessage[0];
  } else {
    errorFlashMessage = null;
  }

  const { username, email, address } = req.user;
  return res.render('profile/edit', {
    pageTitle: 'Edit',
    error: '',
    errorMessage: errorFlashMessage,
    profileData: {
      username,
      email,
      street: address.street,
      city: address.city,
      zip: address.zip
    }
  });
};

exports.postEditPage = async (req, res, next) => {
  const { username, email, address } = req.body;
  console.log(username, 'username');
  console.log(email, 'email');
  console.log(address, 'address');
  const errorCheck = validationResult(req);

  if (!errorCheck.isEmpty()) {
    return res.status(422).render('profile/edit', {
      pageTitle: 'Edit',
      error: errorCheck.array()[0].msg,
      errorMessage: '',
      profileData: {
        username,
        email,
        street: address.street,
        city: address.city,
        zip: address.zip
      }
    });
  }
  try {
    const isValidUsername = await User.findOne({ username });
    if (isValidUsername) {
      req.flash('error', 'Udpate username invalid');
      return res.redirect('/users/edit');
    }
  } catch (err) {
    throw new Error(err);
  }
  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email', 'street', 'city', 'zip'];
  const validateInput = updates.every(update => allowedUpdates.includes(update));
  if (!validateInput) {
    return res.status(400).render('profile/edit', {
      pageTitle: 'Edit',
      error: '',
      errorMessage: 'Invalid updates',
      profileData: {
        username,
        email,
        street: address.street,
        city: address.city,
        zip: address.zip
      }
    });
  }
  const userEmailBeforeUpdate = { email: req.user.email };
  try {
    const keyWord = ['street', 'city', 'zip'];
    const { user } = req;
    updates.forEach((update) => {
      if (keyWord.includes(update)) {
        // eslint-disable-next-line no-return-assign
        return (user.address[update] = req.body[update]);
      }
      // eslint-disable-next-line no-return-assign
      return (user[update] = req.body[update]);
    });
    await user.save();

    if (user.email !== userEmailBeforeUpdate.email) {
      sendEmailChanged(userEmailBeforeUpdate.email, user.email);
      sendToNewEmail(user.email);
    }
    return res.render('profile/edit', {
      pageTitle: 'Edit',
      error: '',
      errorMessage: '',
      profileData: {
        username: user.username,
        email: user.email,
        street: user.address.street,
        city: user.address.city,
        zip: user.address.zip
      }
    });
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
    return next(err);
  }
};

// ///////////////////// Settings page;

exports.getSettingsPage = (req, res) => {
  let errorFlashMessage = req.flash('error');

  if (errorFlashMessage.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    errorFlashMessage = errorFlashMessage[0];
  } else {
    errorFlashMessage = null;
  }
  return res.render('settings/settings', {
    pageTitle: 'Settings',
    errors: errorFlashMessage,
    errorMessage: ''
  });
};

exports.postSettingsPassword = async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;
  const { user } = req;
  const errorCheck = validationResult(req);
  if (!errorCheck.isEmpty()) {
    return res.render('settings/settings', {
      pageTitle: 'Settings',
      errors: '',
      errorMessage: errorCheck.array()[0].msg
    });
  }

  try {
    const isAuthorize = await user.comparePassword(oldPassword, user.password);
    if (!isAuthorize) {
      req.flash(
        'error',
        'It seems to have a problem with password, please try again'
      );
      return res.redirect('/users/profile/settings');
    }
    user.password = newPassword;
    await user.save();
    return res.redirect('/');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return next(error);
  }
};

exports.postSettingsEmail = async (req, res, next) => {
  const { newEmail } = req.body;
  const errorCheck = validationResult(req);
  if (!errorCheck.isEmpty()) {
    return res.render('settings/settings', {
      pageTitle: 'Settings',
      errors: '',
      errorMessage: errorCheck.array()[0].msg
    });
  }
  const isEmailInUSe = await User.findOne({ email: newEmail });
  if (isEmailInUSe) {
    req.flash('error', 'Email already in use, please try another email');
    return res.redirect('/users/profile/settings');
  }
  const { user } = req;
  user.email = newEmail;
  try {
    await user.save();
    return res.redirect('/users/profile');
  } catch (error) {
    return next(error);
  }
};
exports.getDeleteAccountPage = async (req, res, next) => {
  let errorFlash = req.flash('error');
  if (errorFlash.length > 0) {
    [errorFlash] = errorFlash;
  } else {
    errorFlash = null;
  }
  return res.render('profile/deletePage', {
    pageTitle: 'Delete account',
    errors: errorFlash
  });
};
exports.postDeleteAccountPage = async (req, res, next) => {
  const { password } = req.body;
  const errorCheck = validationResult(req);
  if (!errorCheck.isEmpty()) {
    return res.render('profile/deletePage', {
      pageTitle: 'Delete account',
      errors: '',
      errorMessage: errorCheck.array()[0].msg
    });
  }
  const { user } = req;
  try {
    const isAuthorize = await user.comparePassword(password, user.password);
    if (!isAuthorize) {
      req.flash('error', 'Password incorrect, please try again');
      return res.redirect('/users/delete');
    }
    await user.remove();
    await req.session.destroy();
    return res.redirect('/login');
  } catch (error) {
    return next(error);
  }
};
