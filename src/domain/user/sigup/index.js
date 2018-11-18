const SignupPolicies = require('./policies');
const StoreInfo = require('./storeInfo');

function signupDomain(signupCandidate) {
    const isPassPolicies = SignupPolicies.isExisted(signupCandidate) && SignupPolicies.isAcceptTermCondition(signupCandidate);
    if (isPassPolicies) {
        return StoreInfo(signupCandidate);
    }

    const ret = {
        error: true,
        message: 'can not apply policy for this candidate',
    }
    return ret;
}

exports.default = signupDomain;

