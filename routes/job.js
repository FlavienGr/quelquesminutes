const express = require('express');
const { body } = require('express-validator/check');
const jobController = require('../controllers/job');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/job/create', auth, jobController.getCreateJob);
router.post(
  '/job/create',
  auth,
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

router.get('/job/list', auth, jobController.getJobList);
module.exports = router;
