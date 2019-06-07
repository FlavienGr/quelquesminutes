const { validationResult } = require('express-validator/check');

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
  const error = validationResult(req);
  let message;
  if (!error.isEmpty()) {
    message = error.array()[0].msg;
  } else {
    message = null;
  }
  const { username, email, address } = req.user;
  return res.render('profile/edit', {
    pageTitle: 'Edit',
    error: message,
    errorMessage: '',
    profileData: {
      username,
      email,
      street: address.street,
      city: address.city,
      zip: address.zip
    }
  });
};

exports.postEditPage = async (req, res) => {
  const { username, email, address } = req.user;
  const errorCheck = validationResult(req);
  if (!errorCheck.isEmpty()) {
    return res.render('profile/edit', {
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

  const updates = Object.keys(req.body);
  const allowedUpdates = ['username', 'email', 'street', 'city', 'zip'];
  const validateInput = updates.every(update => allowedUpdates.includes(update));
  if (!validateInput) {
    return res.render('profile/edit', {
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
    return res.sendStatus(400);
  }
};
