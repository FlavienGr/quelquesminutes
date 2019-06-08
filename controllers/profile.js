const { validationResult } = require('express-validator/check');
const User = require('../models/User');

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
