const User = require('../models/User');

exports.getProfil = async (req, res) => {
  const id = req.session.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      req.flash('error', 'unable to login you');
      return res.redirect('/login');
    }
    return res.render('profile/profile', {
      pageTitle: 'profil',
      errors: '',
      profileData: {
        username: user.username,
        email: user.email
      }
    });
  } catch (error) {
    return res.sendStatus(400);
  }
};

exports.getEditPage = async (req, res) => {
  const id = req.session.user;
  try {
    const user = await User.findById(id);
    if (!user) {
      req.flash('error', 'Unable to login you');
      return res.redirect('/login');
    }
    return res.render('profile/edit', {
      pageTitle: 'Edit',
      profileData: {
        username: user.username,
        email: user.email,
        address: user.address.street,
        city: user.address.city,
        zip: user.address.zip
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    return res.sendStatus(400);
  }
};
