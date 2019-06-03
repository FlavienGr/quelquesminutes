const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator/check');

exports.getSignup = (req, res) => {
  res.render('auth/signup', {
    pageTitle: 'Signup',
    errors: '',
    inputBackUp: {},
  });
};

exports.postSignup = async (req, res) => {
  const { username, email, password, isAssociation } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('auth/signup', {
      pageTitle: 'Signup',
      errors: errors.array()[0].msg,
      inputBackUp: {
        username,
        email,
        password,
        checked: isAssociation ? true : false,
      },
    });
  }
  const user = new User({ username, email, password });
  try {
    await user.save();
    req.session.user = user._id;
    req.session.isLoggedIn = true;

    // res.render('home', {
    //   pageTitle: 'Home',
    // });
    res.redirect('/');
  } catch (error) {
    res.sendStatus(400);
  }
};
exports.getLogin = (req, res) => {
  let errorFlashMessage = req.flash('error');
  if (errorFlashMessage.length > 0) {
    errorFlashMessage = errorFlashMessage[0];
  } else {
    errorFlashMessage = null;
  }
  res.render('auth/login', {
    pageTitle: 'Login',
    errors: errorFlashMessage,
    inputBackUp: {},
  });
};
exports.postLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render('auth/login', {
      pageTitle: 'Login',
      errors: errors.array()[0].msg,
      inputBackUp: {
        email,
        password,
      },
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
    console.log(error);
    res.sendStatus(400);
  }
};
exports.getProfil = async (req, res) => {
  console.log(req.session);
  const id = req.session.user;
  console.log(id);

  const user = await User.findById(id);

  if (!user) throw new Error('Unable to identify you');

  res.render('profilassoc', {
    pageTitle: 'profil',
    errors: '',
    inputBackUp: {},
    profileData: {
      username: user.username,
      email: user.email,
    },
  });
};

exports.getLogout = async (req, res) => {
  await req.session.destroy();
  res.redirect('/');
};
