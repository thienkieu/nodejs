const express = require('express');
const userRouter = express.Router();

//const signupHanlder = require('./handler/signup');
//import { updateProfileHandler, getProfileHandler } from './handler/profile';

userRouter.post('/profile', function(req, res){
    res.end('ok');
});
//router.get('/profile', getProfileHandler);
//router.post('/signup', signupHanlder);

export default userRouter;
