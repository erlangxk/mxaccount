export class AccountService {
    constructor({
        addAccount,
        queryAccount,
        hashPasswd,
        verifyPasswd,
        uuid
    }) {
        this.addAccount = addAccount;
        this.queryAccount = queryAccount;
        this.hashPasswd = hashPasswd;
        this.verifyPasswd = verifyPasswd;
        this.uuid = uuid;
    }

    register = async(name, password) => {
        const id = this.uuid();
        const passwordHash = await this.hashPasswd(password);
        const millis = (new Date).getTime();
        await this.addAccount(id, name, passwordHash, millis);
        return id;
    }

    authenticate = async(name, password) => {
        const result = await this.queryAccount(name);
        if (result.rows.length == 1) {
            const passwordHash = result.rows[0].password_hash;
            return await this.verifyPasswd(password, passwordHash)
        }
        return false;
    }
}