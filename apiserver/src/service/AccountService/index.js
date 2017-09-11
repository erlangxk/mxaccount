export function createAccountService({
    addAccount,
    queryAccount,
    hashPasswd,
    verifyPasswd,
    uuid,
    currentMillis
}) {
    return {
        register: async(name, password) => {
            const id = uuid();
            const passwordHash = await hashPasswd(password);
            const millis = currentMillis();
            await addAccount(id, name, passwordHash, millis);
            return id;
        },

        authenticate: async(name, password) => {
            const result = await queryAccount(name);
            if (result.rows && result.rows.length == 1) {
                const {
                    id,
                    password_hash
                } = result.rows[0]
                if (password_hash && id) {
                    if (await verifyPasswd(password, password_hash)) {
                        return id;
                    }
                }
            }
            return null;
        },
    }
}