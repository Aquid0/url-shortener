const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');
const { authenticate } = require('../middleware/auth');

router.post('/shorten', authenticate({ required: false }), urlController.shortenUrl);
// router.get('/history', authenticate({ required: true }), urlController.getUserUrls);
router.get('/:code', urlController.redirectUrl);

module.exports = router;
