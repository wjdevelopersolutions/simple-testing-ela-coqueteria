const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');


router.route('/')
    .get(indexController.getIndex);


module.exports = router;