const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');


router.route('/')
    .get(indexController.getIndex);

router.route('/:id')
    .get(indexController.getIndexById);


module.exports = router;