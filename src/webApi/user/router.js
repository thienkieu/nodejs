const express = require('express');
const userRouterWithAuthen = express.Router();
const userRouterWithoutAuthen = express.Router();

import signupHanlder from './handler/signup';
//import { updateProfileHandler, getProfileHandler } from './handler/profile';

userRouterWithAuthen.post('/profile', function(req, res){
    res.end('ok');
});
//router.get('/profile', getProfileHandler);
userRouterWithoutAuthen.post('/signup', signupHanlder);

export { userRouterWithAuthen, userRouterWithoutAuthen };
