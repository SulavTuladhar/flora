import uploader from "../../middlewares/uploader";
import restrictTo from '../../middlewares/restrictTo';
import authenticate from "../../middlewares/authenticate";

var router = require('express').Router();
var userController = require('./user.controller');

router.route('/')
    .get(authenticate, userController.fetchProfile)
    .put(authenticate, uploader.single('profile'), userController.editProfile)

router.route('/nearest-florist/:maxDistance')
    .get(authenticate, userController.nearestFlorists);

module.exports = router;