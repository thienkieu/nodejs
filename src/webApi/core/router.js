const express = require('express');
const coreRouterWithAuthen = express.Router();
const coreRouterWithoutAuthen = express.Router();
import uploadFile from './handler/upload';
import { dirname } from 'path';
var multer  = require('multer');
var path  =  dirname(dirname(__dirname));
var upload = multer({ dest: path+'/tmp/'});

coreRouterWithoutAuthen.post('/upload', upload.single('file'), uploadFile);

export { coreRouterWithAuthen, coreRouterWithoutAuthen };
