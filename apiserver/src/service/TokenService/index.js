import jwt from 'jsonwebtoken'

export function tokenService({ secretOrPrivateKey}) {
    return {
        sign: function (payload, options, callback) {
            return jwt.sign(payload, secretOrPrivateKey, options, callback);
        },
        verify: function (token, options, callback) {
            return jwt.verify(token, secretOrPrivateKey, options, callback);
        }
    }
}