const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');
const User = require('../models/User');

exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    pageTitle: 'Signup',
    errors: '',
    inputBackUp: {}
  });
};

exports.postSignup = async (req, res, next) => {
  const {
    username, email, password, isAssociation
  } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      pageTitle: 'Signup',
      errors: errors.array()[0].msg,
      inputBackUp: {
        username,
        email,
        password,
        checked: !!isAssociation
      }
    });
  }
  const user = new User({
    username,
    email,
    password,
    isAssociation: !!isAssociation
  });
  try {
    await user.save();
    req.session.user = user._id;
    req.session.isLoggedIn = true;
    return res.redirect('/');
  } catch (error) {
    return next(error);
  }
};
exports.getLogin = (req, res) => {
  let errorFlashMessage = req.flash('error');

  if (errorFlashMessage.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    errorFlashMessage = errorFlashMessage[0];
  } else {
    errorFlashMessage = null;
  }
  res.render('auth/login', {
    pageTitle: 'Login',
    errors: errorFlashMessage,
    inputBackUp: {}
  });
};
// eslint-disable-next-line consistent-return
exports.postLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('auth/login', {
      pageTitle: 'Login',
      errors: errors.array()[0].msg,
      inputBackUp: {
        email,
        password
      }
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      req.flash('error', 'Invalid email or password');
      res.redirect('/login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      req.flash('error', 'Invalid email or password');
      res.redirect('/login');
    }

    req.session.user = user._id;
    req.session.isLoggedIn = true;
    res.redirect('/');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return next(error);
  }
};

exports.getLogout = async (req, res) => {
  await req.session.destroy();
  res.redirect('/');
};
