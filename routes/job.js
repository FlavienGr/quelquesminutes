const express = require('express');
const { body } = require('express-validator/check');
const jobController = require('../controllers/job');
const auth = require('../middleware/auth');
const isAssociation = require('../middleware/isAssociation');

const router = express.Router();

router.get('/job/create', auth, isAssociation, jobController.getCreateJob);
router.post(
  '/job/create',
  auth,
  isAssociation,
  [
    body('title')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Title must be at least 5 chars long'),
    body('description')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Description must be at least 5 chars long'),
    body('street')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Street should not be empty'),
    body('city')
      .trim()
      .not()
      .isEmpty()
      .withMessage('City should not be empty'),
    body('zip')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Zip should not be empty'),
    body('datepickerStart')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Start Date should not be empty'),
    body('datepickerEnd')
      .trim()
      .not()
      .isEmpty()
      .withMessage('End Date should not be empty')
  ],
  jobController.postCreateJob
);

router.get('/users/job/list', auth, isAssociation, jobController.getJobList);
router.get(
  '/users/job/:id',
  auth,
  isAssociation,
  jobController.getJobByIdOwner
);

router.get(
  '/users/job/update/:id',
  auth,
  isAssociation,
  jobController.getJobUpdate
);
router.post(
  '/users/job/update/:id',
  auth,
  isAssociation,
  [
    body('title')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Title must be at least 5 chars long'),
    body('description')
      .trim()
      .isLength({ min: 5 })
      .withMessage('Description must be at least 5 chars long'),
    body('street')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Street should not be empty'),
    body('city')
      .trim()
      .not()
      .isEmpty()
      .withMessage('City should not be empty'),
    body('zip')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Zip should not be empty'),
    body('datepickerStart')
      .trim()
      .not()
      .isEmpty()
      .withMessage('Start Date should not be empty'),
    body('datepickerEnd')
      .trim()
      .not()
      .isEmpty()
      .withMessage('End Date should not be empty')
  ],
  jobController.postUpdateJob
);
router.get(
  '/users/job/delete/:id',
  auth,
  isAssociation,
  jobController.deleteJobByIdOwner
);
module.exports = router;
