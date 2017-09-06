const uuid = require('uuid/v1');

function addNewUser(call, callback) {
    callback(null, {
        code: 0,
        userId: uuid()
    });
}

module.exports = addNewUser