import SignupPolicies from './policies';
import storeInfo from './storeInfo';

async function signupDomain(signupCandidate) {
    const existed = await SignupPolicies.isExisted(signupCandidate);
    const acceptTerm = await SignupPolicies.isAcceptTermCondition(signupCandidate);

    if (existed) {
        const ret = {
            isSuccess: false,
            message: 'user is existed!',
        };

        return ret;
    }

    if (!acceptTerm) {
        const ret = {
            isSuccess: false,
            message: 'Please accept term and condition',
        };

        return ret;
    }

    const r = await storeInfo(signupCandidate);
    return r;
}

export default signupDomain;
