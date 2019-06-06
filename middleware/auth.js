const User = require('../models/User');

const auth = async (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    req.flash('error', 'Please, Login is necessary to access at this page');
    return res.redirect('/login');
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      req.flash('error', 'Unable to login you');
      return res.redirect('/login');
    }
    req.user = user;
    return next();
  } catch (error) {
    return res.sendStatus(400);
  }
};

module.exports = auth;
