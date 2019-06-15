const express = require('express');
const jobController = require('../controllers/job');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/job/create', auth, jobController.getCreateJob);
router.post('/job/create', auth, jobController.postCreateJob);

module.exports = router;
