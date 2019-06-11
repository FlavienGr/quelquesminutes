const { validationResult } = require('express-validator/check');
const crypto = require('crypto');
const User = require('../models/User');
const { sendResetPassword, sendPasswordChanged } = require('../email/account');

exports.getSignup = (req, res) => {
  let errorFlash = req.flash('error');
  if (errorFlash.length > 0) {
    // eslint-disable-next-line prefer-destructuring
    errorFlash = errorFlash[0];
  } else {
    errorFlash = null;
  }
  res.render('auth/signup', {
    pageTitle: 'Signup',
    errors: errorFlash,
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
  const isEmailExist = await User.findOne({ email });
  if (isEmailExist) {
    req.flash('error', 'Email already in use, please try another email');
    return res.redirect('/signup');
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
    [errorFlashMessage] = errorFlashMessage;
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
    const user = await User.findByCredentials(email, password);
    if (!user) {
      req.flash('error', 'Invalid email or password');
      return res.redirect('/login');
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

exports.getResetPassword = (req, res) => {
  const errorFlash = req.flash('error');
  return res.render('auth/reset-password', {
    pageTitle: 'Forgot Password',
    errors: errorFlash.length > 0 ? errorFlash[0] : null,
    errorMessage: ''
  });
};
exports.postResetPassword = async (req, res, next) => {
  const { email } = req.body;
  const errorCheck = validationResult(req);
  if (!errorCheck.isEmpty()) {
    return res.render('auth/reset-password', {
      pageTitle: 'Forgot Password',
      errors: '',
      errorMessage: errorCheck.array()[0].msg
    });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.redirect('/');
    }
    const buffer = await crypto.randomBytes(32);
    const token = buffer.toString('hex');
    user.resetToken = token;
    user.resetTokenExpire = Date.now() + 60 * 60 * 24 * 1000;
    await user.save();
    // // sendEmail
    sendResetPassword(email, user.username, token);
    return res.send('ok');
  } catch (error) {
    return next(error);
  }
};

exports.getNewPassword = async (req, res, next) => {
  const resetToken = req.params.token;
  try {
    const user = await User.findOne(
      { resetToken },
      {
        $gt: Date.now()
      }
    );
    console.log(user, 'user get new password');
    if (!user) {
      req.flash('error', 'Password reset link is invalid or has expired');
      return res.redirect('/reset-password');
    }
    return res.render('auth/new-password', {
      pageTitle: 'New Password',
      errorMessage: '',
      resetToken
    });
  } catch (error) {
    return next(error);
  }
};
exports.postNewPassword = async (req, res, next) => {
  const { password } = req.body;
  const resetToken = req.params.token;
  const errorCheck = validationResult(req);
  if (!errorCheck.isEmpty()) {
    res.render('auth/new-password', {
      pageTitle: 'New Password',
      errorMessage: errorCheck.array()[0].msg,
      resetToken
    });
  }
  try {
    const user = await User.findOne({ resetToken }, 'email', {
      $gt: Date.now()
    });
    if (!user) {
      req.flash('error', 'Password reset link is invalid or has expired');
      return res.redirect('/reset-password');
    }
    user.password = password;
    await user.save();
    // /// send Email password changed
    sendPasswordChanged(user.email);
    return res.redirect('/login');
  } catch (error) {
    return next(error);
  }
};
exports.getLogout = async (req, res) => {
  await req.session.destroy();
  res.redirect('/');
};
