const { validationResult } = require('express-validator/check');
const moment = require('moment');

const Job = require('../models/Job');

exports.getCreateJob = (req, res) => {
  const errorFlash = req.flash('error');
  return res.render('job/createJob', {
    pageTitle: 'Create Job',
    error: errorFlash.length > 0 ? errorFlash[0] : null,
    errorMessage: '',
    profileData: {
      title: '',
      description: '',
      street: '',
      city: '',
      zip: ''
    }
  });
};
exports.postCreateJob = async (req, res, next) => {
  const {
    title,
    description,
    street,
    city,
    zip,
    datepickerStart,
    datepickerEnd
  } = req.body;

  const errorCheck = validationResult(req);
  if (!errorCheck.isEmpty()) {
    return res.render('job/createJob', {
      pageTitle: 'Create Job',
      error: '',
      errorMessage: errorCheck.array()[0].msg,
      profileData: {
        title,
        description,
        street,
        city,
        zip
      }
    });
  }
  const allowedUpdates = [
    'title',
    'description',
    'street',
    'city',
    'zip',
    'datepickerStart',
    'datepickerEnd'
  ];
  const updates = Object.keys(req.body);
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));
  const isEmpty = updates.every(update => !!req.body[update].trim());

  if (!isValidOperation && !isEmpty) {
    return res.render('job/createJob', {
      pageTitle: 'Create Job',
      error: 'Every field should be completed',
      errorMessage: '',
      profileData: {
        title,
        description,
        street,
        city,
        zip,
        start: '',
        end: ''
      }
    });
  }
  const job = new Job({
    title,
    description,
    location: {
      street,
      city,
      zip
    },
    start: moment(datepickerStart, 'DD-MM-YYYY').format(),
    end: moment(datepickerEnd, 'DD-MM-YYYY').format(),
    owner: req.user._id
  });
  try {
    await job.save();
    return res.render('job/userJobList', {
      pageTitle: 'List Job',
      error: '',
      errorMessage: ''
    });
  } catch (error) {
    return next(error);
  }
};
