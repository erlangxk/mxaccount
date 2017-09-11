const AccountService = require('./AccountService');
import {
    AccountClient
}  from '../postgres/Account';
const {
    Pool
} = require('pg');

let pool;
let service;

describe("test account service", () => {
    beforeAll(() => {
        pool = new Pool({
            connectionString: 'postgres://postgres:111111@localhost:5432/mxaccounts',
        });
        service = new AccountService(new AccountClient(pool));
    });

    beforeEach((done) => {
        pool.query("delete from mx_accounts").then(_ => done());
    });

    afterAll(() => {
        pool.end();
    })

    test("register and authenticate successfully", async() => {
        const id = await service.register("douglas", "password");
        expect(id.length).toBe(36);
        const result = await service.authenticate("douglas", "password");
        expect(result).toBe(true);
    })
});