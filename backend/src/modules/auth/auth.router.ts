import uploader from "../../middlewares/uploader";

var router = require('express').Router();
const authController = require('./auth.controller');

router.route('/register')
    .post(uploader.single('profile'), authController.register)

router.route('/login')
    .post(authController.login)

module.exports = router;