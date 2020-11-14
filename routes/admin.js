const express = require('express');
const router = express.Router();

const adminiController = require('../controllers/admin');


router.route('/')
    .get(adminiController.getAdmin)
    .post(adminiController.postAdmin);

router.route('/products')
    .get(adminiController.getAdminProducts)

router.route('/:id')
    .get(adminiController.getByIdAdmin)
    .put(adminiController.getAdmin)
    .delete(adminiController.postAdmin);

module.exports = router;