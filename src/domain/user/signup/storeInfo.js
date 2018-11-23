import storeUser from 'infrastructure/storage/mlab/user/storeUser';
async function storeInfo(user) {
    return storeUser(user);
}

export default storeInfo;
