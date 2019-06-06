const express = require('express');
const auth = require('../middleware/auth');
const profileController = require('../controllers/profile');

const router = express.Router();

router.get('/users/profile', auth, profileController.getProfil);

router.get('/users/edit', auth, profileController.getEditPage);

router.post('/users/edit', auth, profileController.postEditPage);

module.exports = router;
