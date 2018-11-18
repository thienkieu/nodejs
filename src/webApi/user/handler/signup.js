const signupDomain = require('domain/user/signup/index');
function signupHanlder(req, res) {
    const data = {
        name: req.body.name,
        address: req.body.address,
    };

    const result = signupDomain(data);
    res.json(result);
}

module.exports = signupHanlder;
