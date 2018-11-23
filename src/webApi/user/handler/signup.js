import signupDomain from 'domain/user/signup';
import SignupCandidate from 'domain/user/signup/candidate';

async function signupHanlder(req, res) {
    const data = {
        email: req.body.email,
        fullname: req.body.fullname,
        phone: req.body.phone,
        password: req.body.password,
    };

    const candidate = new SignupCandidate(data.email, data.password, data.fullname, data.phone);
    const result =  await signupDomain(candidate);
    res.json(result);
}

export default signupHanlder;
