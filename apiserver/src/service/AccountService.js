const uuid = require('uuid/v1');

import {
    hashPasswd,
    verifyPasswd
} from '../utils/hash';

class AccountService {
    constructor(accountClient) {
        this.accountClient = accountClient;
    }

    async register(name, password) {
        const id = uuid();
        const passwordHash = await hashPasswd(password);
        const millis = (new Date).getTime();
        await this.accountClient.addAccount(id, name, passwordHash, millis);
        return id;
    }

    async authenticate(name, password) {
        const result = await this.accountClient.queryAccount(name);
        if (result.rows.length == 1) {
            const passwordHash = result.rows[0].password_hash;
            return await verifyPasswd(password, passwordHash)
        }
        return false;
    }
}

module.exports = AccountService;