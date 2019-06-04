module.exports = (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    req.flash('error', 'Please, Login is necessary to access at this page');
    return res.redirect('/login');
  }
  return next();
};
