import { verifyOptions } from './jwtConfig';
import jwt from 'jsonwebtoken';
import { getPublicKey } from '../../../appConfig';

function handleAuthorization(req, res, next){
    const token = req.headers.authorization;
    try{
        const legit = jwt.verify(token, getPublicKey(), verifyOptions);
        req.identity = legit.identity;
        next();
    } catch(ex) {
        return res.status(401).send({
            isSuccess: false,
            message: 'Sign in to continue.'
        });
    }
}

export default handleAuthorization;
