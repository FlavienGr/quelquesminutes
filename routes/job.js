const express = require('express');
const jobController = require('../controllers/job');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/job', auth, jobController.postJob);

module.exports = router;
