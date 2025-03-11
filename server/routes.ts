const express = require('express');
const vinylController = require('./controller/controller');

const router = express.Router();

router.get('/vinyls', vinylController.getAllVinyls);
router.get('/test', vinylController.test);

module.exports = router;