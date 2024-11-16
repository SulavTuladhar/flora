import restrictTo from "../../middlewares/restrictTo";
import authenticate from "../../middlewares/authenticate";
var router = require("express").Router();
var adminController = require("./admin.controller");

router
  .route("/users/:role")
  .get(authenticate, restrictTo("admin"), adminController.getAllUser);

router
  .route("/posts")
  .get(authenticate, restrictTo("admin"), adminController.getAllPosts);

router
  .route("/user/:id")
  .delete(authenticate, restrictTo("admin"), adminController.deleteUser);

router
  .route("/post/:id")
  .delete(authenticate, restrictTo("admin"), adminController.deletePost);

module.exports = router;
