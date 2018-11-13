import SignupPolicies from './policies';
import StoreInfo from './storeInfo';

function signup(signupCandidate) {
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

export default signup;

