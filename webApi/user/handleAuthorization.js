import verifyOptions from './jwtConfig';

function handleAuthorization(req, res, next){
    const token = req.headers.authorization;
    const publicKEY  = fs.readFileSync('./public.key', 'utf8');
    try{
        const legit = jwt.verify(token, publicKEY, verifyOptions);
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
