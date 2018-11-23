import isExistedRecord from 'infrastructure/storage/mlab/user/isExistedRecord';
const SignupPolicies = {
    isExisted: async function(candidate) {
        const result = await isExistedRecord(candidate)
        if (result.length > 0) return true;
        return false;
    },

    isAcceptTermCondition: async function(candidate) {
        return true;
    },
}

export default SignupPolicies;
