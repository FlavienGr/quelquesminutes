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
        zip,
        start: datepickerStart,
        end: datepickerEnd
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
  const updates = Object.keys(req.body).filter(item => item !== '_csrf');
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    req.flash('error', 'Operation not allowed');
    return res.redirect('/job/create');
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

exports.getJobList = async (req, res, next) => {
  try {
    const list = await Job.find(
      { owner: req.user._id },
      'title description city street zip start end'
    );
    return res.render('job/userJobList', {
      pageTitle: 'List Job',
      error: '',
      errorMessage: '',
      list,
      moment
    });
  } catch (error) {
    return next(error);
  }
};
exports.getJobByIdOwner = async (req, res, next) => {
  try {
    const job = await Job.findById(
      req.params.id,
      'title description city street zip start end',
      { owner: req.user._id }
    );
    return res.render('job/ownerJob', {
      pageTitle: 'My job',
      job,
      error: '',
      moment
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
exports.getJobUpdate = async (req, res, next) => {
  try {
    const job = await Job.findById(
      req.params.id,
      'title description location start end',
      { owner: req.user._id }
    );
    const errorFlash = req.flash('error');
    if (errorFlash.length > 0) {
      return res.render('job/update-job', {
        pageTitle: 'Update job',
        job,
        error: errorFlash[0],
        errorMessage: '',
        moment
      });
    }
    const {
      title, description, location, start, end
    } = job;

    return res.render('job/update-job', {
      pageTitle: 'Update job',
      jobData: {
        id: job._id,
        title,
        description,
        street: location.street,
        city: location.city,
        zip: location.zip,
        start,
        end
      },
      error: '',
      errorMessage: '',
      moment
    });
  } catch (err) {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  }
};
exports.postUpdateJob = async (req, res, next) => {
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
    return res.render('job/update-job', {
      pageTitle: 'Update job',
      jobData: {
        id: req.params.id,
        title,
        description,
        street,
        city,
        zip,
        start: datepickerStart,
        end: datepickerEnd
      },
      error: '',
      errorMessage: errorCheck.array()[0].msg,
      moment
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
  const updates = Object.keys(req.body).filter(item => item !== '_csrf');
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    req.flash('error', 'Operation not allowed');
    return res.redirect('/job/create');
  }
  try {
    const job = await Job.findById(
      req.params.id,
      'title description location start end',
      { owner: req.user._id }
    );
    // eslint-disable-next-line no-return-assign
    updates.forEach(update => (job[update] = req.body[update]));
    await job.save();
    return res.redirect('/users/job/list');
  } catch (error) {
    return next(error);
  }
};
