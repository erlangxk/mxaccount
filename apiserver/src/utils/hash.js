import argon2 from 'argon2';

const options = {
    timeCost: 5, memoryCost: 17, parallelism: 3, type: argon2.argon2id
};

export function hashPasswd(password){
    return argon2.hash(password,options)
}

export function verifyPasswd(password,hash){
    return argon2.verify(hash,password)
}