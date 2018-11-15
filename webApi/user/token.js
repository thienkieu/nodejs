import { signOptions } from './jwtConfig';

function token(req, res) {
    const identity = req.body.identity;
    const password = req.body.password;

    if (!identity || ! password) {
        res.json({
            isSuccess: false,
            message: 'password or user is not correct',
        });
    }

    const privateKEY  = fs.readFileSync('./private.key', 'utf8');
    const payload = {
        email: identity,
    };

    const token = jwt.sign(payload, privateKEY, signOptions);
    res.json({
        isSuccess: true,
        token,
    });
}

export default token;
