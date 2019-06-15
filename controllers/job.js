const { validationResult } = require('express-validator/check');
const Job = require('../models/Job');

exports.postJob = (req, res, next) => {
  const errorCheck = validationResult(req);
  if (!errorCheck.isEmpty()) {
    return res.render('createJob', {
      pageTitle: 'Create Job',
      error: '',
      errorMessage: errorCheck.array()[0].msg
    });
  }
  const {
    title, description, street, city, zip
  } = req.body;
  const job = new Job({
    title,
    description,
    location: {
      street,
      city,
      zip
    },
    owner: req.user._id
  });
  try {
    job.save();
    return res.render('userJobList', {
      pageTitle: 'List Job',
      error: '',
      errorMessage: ''
    });
  } catch (error) {
    return next(error);
  }
};
