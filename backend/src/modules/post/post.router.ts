import uploader from "../../middlewares/uploader";
import restrictTo  from '../../middlewares/restrictTo';
import authenticate from "../../middlewares/authenticate";
var router = require('express').Router();
var postController = require('./post.controller');

router.route('/')
    .post(authenticate, restrictTo('florist'), uploader.array('post'), postController.createPost)

router.route('/:category')
    .get(authenticate, postController.fetchPostsByCategory);

router.route('/detail/:id')
    .get(postController.fetchSpecificPost)
// router.route('/')
//     .get(propertyController.getAllProperty)
//     .post(uploader.array('property'), propertyController.addProperty)

// router.route('/image/:id')
//     .post(uploader.single('property'), propertyController.addImage)
//     .delete(propertyController.deleteImage)

// router.route('/:id')
//     .put(uploader.array('property'), propertyController.updateProperty)
//     .delete(propertyController.deleteProperty)
// router.route('/time')
//     .get(propertyController.getTime)

module.exports = router;