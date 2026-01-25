const express = require('express');
const router = express.Router();
const {
  getLandingPage,
  getRegisterPage,
} = require('../controllers/landingController');

// Landing page routes
router.get('/', getLandingPage);
router.get('/register', getRegisterPage);

module.exports = router;
