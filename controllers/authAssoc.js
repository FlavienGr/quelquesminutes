const Association = require('../models/Association');
const { validationResult } = require('express-validator/check');

// exports.getSignup = (req, res) => {
//   res.render('si', {
//     pageTitle: 'Signup',
//     errors: '',
//     inputBackUp: {},
//   });
// };

exports.postSignup = async (req, res) => {
  const { username, email, password, isAssociation } = req.body;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('signup', {
      pageTitle: 'Signup',
      errors: errors.array()[0].msg,
      inputBackUp: { username, email, password, checked: !isAssociation },
    });
  }
  const association = new Association({ username, email, password });
  try {
    await association.save();
    req.session.user = association._id;

    res.render('home', {
      pageTitle: 'Home',
    });
  } catch (error) {
    res.sendStatus(400);
  }
};
