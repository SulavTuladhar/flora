var router = require("express").Router();

var authRouter = require("./modules/auth/auth.router");
var postRouter = require("./modules/post/post.router");
var userRouter = require("./modules/user/user.router");
var adminRouter = require("./modules/admin/admin.router");

router.use("/auth", authRouter);
router.use("/post", postRouter);
router.use("/user", userRouter);
router.use("/admin", adminRouter);

module.exports = router;
