const argon2 = require('argon2');
const options = {
    timeCost: 5, memoryCost: 17, parallelism: 3, type: argon2.argon2id
};

function hashPasswd(password){
    return argon2.hash(password,options)
}

function verifyPasswd(password,hash){
    return argon2.verify(hash,password)
}

module.exports = {
    hashPasswd,
    verifyPasswd
}