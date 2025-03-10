const express = require('express');
const vinylController = require('./controller/controller');

const router = express.Router();

router.get('/api/test', vinylController.test);
router.get('/api/vinyls', vinylController.getAllVinyls);

module.exports = router;