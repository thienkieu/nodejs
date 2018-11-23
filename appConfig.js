let dataPrivateKey = '';
let dataPublicKey = '';
let privateKey = '';
let publicKey = '';

function initDataPrivateKey(key) {
    if(!dataPrivateKey) {
        dataPrivateKey = key;
    }
}

function getDataPrivateKey() {
    return dataPrivateKey;
}

function initDataPublicKey(key) {
    if(!dataPublicKey) {
        dataPublicKey = key;
    }
}

function getDataPublicKey() {
    return dataPublicKey;
}

function initPrivateKey(key) {
    if(!privateKey) {
        privateKey = key;
    }
}

function getPrivateKey() {
    return privateKey;
}

function initPublicKey(key) {
    if(!publicKey) {
        publicKey = key;
    }
}

function getPublicKey() {
    return publicKey;
}

export {
    initDataPrivateKey,
    initDataPublicKey,
    getDataPrivateKey,
    getDataPublicKey,
    initPrivateKey,
    initPublicKey,
    getPrivateKey,
    getPublicKey,
}
