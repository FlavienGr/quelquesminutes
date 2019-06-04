exports.modules = (req, res, next) => {
  const userId = req.session.user;
  if (!userId) {
    req.flash('error', 'Please, Login is necessary to access at this page');
    res.redirect('/login');
  }
  next();
};
