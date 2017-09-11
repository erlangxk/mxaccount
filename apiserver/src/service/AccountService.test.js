import {
    createAccountService
} from './AccountService';

describe("test account service", () => {
    test("authenticate successfully", async() => {
        const queryAccount = (name) => {
            return Promise.resolve({
                rows: [{
                    id: "123456",
                    password_hash: "passwordhash12"
                }]
            });
        }
        const verifyPasswd = (password, hash) => {
            return Promise.resolve(hash === 'passwordhash12' && password === 'passworddouglas');
        }
        const service = createAccountService({
            queryAccount,
            verifyPasswd
        });
        const result = await service.authenticate("douglas", "passworddouglas");
        expect(result).toBe("123456");
    })

    test("authenticate failed when verifyPasswd is false", async() => {
        const queryAccount = (name) => {
            return Promise.resolve({
                rows: [{
                    id: "123456",
                    password_hash: "passwordhash12"
                }]
            });
        }
        const verifyPasswd = (password, hash) => {
            return Promise.resolve(false);
        }
        const service = createAccountService({
            queryAccount,
            verifyPasswd
        });
        const result = await service.authenticate("douglas", "passworddouglas");
        expect(result).toBe(null);
    })

    test("authenticate failed when id empty", async() => {
        const queryAccount = (name) => {
            return Promise.resolve({
                rows: [{
                    id: "",
                    password_hash: "passwordhash12"
                }]
            });
        }
        const verifyPasswd = (password, hash) => {
            return Promise.resolve(hash === 'passwordhash12' && password === 'passworddouglas');
        }
        const service = createAccountService({
            queryAccount,
            verifyPasswd
        });
        const result = await service.authenticate("douglas", "passworddouglas");
        expect(result).toBe(null);
    })

    test("authenticate failed when password_hash empty", async() => {
        const queryAccount = (name) => {
            return Promise.resolve({
                rows: [{
                    id: "123456",
                    password_hash: ""
                }]
            });
        }
        const verifyPasswd = (password, hash) => {
            return Promise.resolve(hash === 'passwordhash12' && password === 'passworddouglas');
        }
        const service = createAccountService({
            queryAccount,
            verifyPasswd
        });
        const result = await service.authenticate("douglas", "passworddouglas");
        expect(result).toBe(null);
    })

    test("authenticate failed when user not found", async() => {
        const queryAccount = (name) => {
            return Promise.resolve({
                rows: []
            });
        }
        const verifyPasswd = (password, hash) => {
            return Promise.resolve(hash === 'passwordhash12' && password === 'passworddouglas');
        }
        const service = createAccountService({
            queryAccount,
            verifyPasswd
        });
        const result = await service.authenticate("douglas", "passworddouglas");
        expect(result).toBe(null);
    })

    test("register user successfully", async() => {
        const addAccount = (id, name, passwordHash, time) => {
            if (name !== "douglas" || passwordHash !== "hashedpasswordxxx" || id !== "567890x" || time !== 345678) {
                return Promise.reject(new Error(`invalid arguments:${id},${name},${passwordHash},${time}`));
            } else {
                return Promise.resolve(null);
            }
        }
        const hashPasswd = (password) => {
            if (password !== "passworddouglas") {
                return Promise.reject(new Error('invalid arguments'));
            } else {
                return Promise.resolve("hashedpasswordxxx");
            }
        }
        const uuid = () => "567890x";
        const currentMillis = () => 345678;

        const service = createAccountService({
            addAccount,
            hashPasswd,
            uuid,
            currentMillis
        });

        const result = await service.register("douglas", "passworddouglas")
        expect(result).toBe("567890x")
    });
});