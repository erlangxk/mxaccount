export class AccountService {
    constructor({
        addAccount,
        queryAccount,
        hashPasswd,
        verifyPasswd,
        uuid,
        currentMillis
    }) {
        this.addAccount = addAccount;
        this.queryAccount = queryAccount;
        this.hashPasswd = hashPasswd;
        this.verifyPasswd = verifyPasswd;
        this.uuid = uuid;
        this.currentMillis = currentMillis;
    }

    register = async(name, password) => {
        const id = this.uuid();
        const passwordHash = await this.hashPasswd(password);
        const millis = this.currentMillis();
        await this.addAccount(id, name, passwordHash, millis);
        return id;
    }

    authenticate = async(name, password) => {
        const result = await this.queryAccount(name);
        if (result.rows && result.rows.length == 1) {
            const {
                id,
                password_hash
            } = result.rows[0]
            if (password_hash && id) {
                if (await this.verifyPasswd(password, password_hash)) {
                    return id;
                }
            }
        }
        return null;
    }
}