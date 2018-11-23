const fs = require('fs');
import logger from 'infrastructure/logger/logger';
import { dirname } from 'path';

function uploadFile(req, res) {
    logger.log({
        level: 'info',
        message: req.file,
    });

    var path = dirname(dirname(dirname(__dirname)));
    var file = path+'/upload/'+req.file.originalname;

    fs.rename(req.file.path , file, function (err) {
        let response = {};
        if( err ){
            logger.log({level: 'error', message: err});
            response = {
                message: 'Sorry, file couldn\'t be uploaded.',
                filename: req.file.originalname
            };
        } else {
            response = {
                message: 'File uploaded successfully',
                filename: req.file.originalname,
                path: file,
            };
        }
        res.json(response);
    });
}

export default uploadFile;
