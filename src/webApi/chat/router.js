const express = require('express');
const chatRouterWithAuthen = express.Router();
const chatRouterWithoutAuthen = express.Router();
import homeChat from './handler/home';


chatRouterWithoutAuthen.get('/home', homeChat);

export { chatRouterWithAuthen, chatRouterWithoutAuthen };
