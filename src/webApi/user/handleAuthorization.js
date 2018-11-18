import { verifyOptions } from './jwtConfig';
import jwt from 'jsonwebtoken';

let publicKey = '';
function initPublicKey(key){
    publicKey = key;
}

function handleAuthorization(req, res, next){
    const token = req.headers.authorization;
    try{
        const legit = jwt.verify(token, publicKey, verifyOptions);
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
export { initPublicKey }
