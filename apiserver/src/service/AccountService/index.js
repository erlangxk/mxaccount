export function createAccountService({
    validateUsername,
    validatePassword,
    addAccount,
    queryAccount,
    hashPasswd,
    verifyPasswd,
    uuid,
    currentMillis
}) {
    return {
        register: async (name, password) => {
            if (validateUsername(name) && validatePassword(password)) {
                const id = uuid();
                const passwordHash = await hashPasswd(password);
                const millis = currentMillis();
                await addAccount(id, name, passwordHash, millis);
                return id;
            }
            throw new Error('username or password is invalid');
        },

        authenticate: async (name, password) => {
            if (validateUsername(name) && validatePassword(password)) {
                const result = await queryAccount(name);
                if (result.rows && result.rows.length == 1) {
                    const { id, password_hash } = result.rows[0]
                    if (password_hash && id) {
                        if (await verifyPasswd(password, password_hash)) {
                            return id;
                        }
                    }
                }
            }
            throw new Error('no match account found');
        },
    }
}

