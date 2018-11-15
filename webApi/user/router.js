const express = require('express');
const router = express.Router();

const signupHanlder = require('./handler/signup');
import { updateProfileHandler, getProfileHandler } from './handler/profile';

router.post('/profile', updateProfileHandler);
router.get('/profile', getProfileHandler);
router.post('/signup', signupHanlder);

export default router;
