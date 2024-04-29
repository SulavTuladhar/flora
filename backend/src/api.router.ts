var router = require('express').Router();

var authRouter = require('./modules/auth/auth.router');
var postRouter = require('./modules/post/post.router');
var userRouter = require('./modules/user/user.router');

router.use('/auth', authRouter);
router.use('/post', postRouter);
router.use('/user', userRouter);

module.exports = router;