const isAssociation = async (req, res, next) => {
  const isAllowed = req.user.isAssociation;
  if (!isAllowed) {
    return res.redirect('/');
  }
  return next();
};

module.exports = isAssociation;
