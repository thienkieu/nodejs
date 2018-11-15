import signupDomain  from 'domain/user/signup';
function signupHanlder(req, res) {
    const data = {
        name: req.body.name,
        address: req.body.address,
    };

    const result = signupDomain(data);
    res.json(result);
}

export default signupHanlder;
