const User = require('../models/User');
const { validationResult } = require('express-validator/check');

exports.getSignup = (req, res) => {
  res.render('signup', {
    pageTitle: 'Signup',
    errors: '',
    inputBackUp: {},
  });
};

exports.postSignup = async (req, res) => {
  const { username, email, password, isAssociation } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('signup', {
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

    res.render('home', {
      pageTitle: 'Home',
    });
  } catch (error) {
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
