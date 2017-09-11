import {
    createAccountClient
} from './AccountClient';

import {
    Pool
} from 'pg';

let pool;
let client;

const DELETE_SQL = "delete from mx_accounts";
const QUERY_BY_ID = "select * from mx_accounts where id=$1";
const id = "667034d0-93b6-11e7-b148-17a9dddd6b9c";

function queryById(pool, id) {
    return pool.query(QUERY_BY_ID, [id]);
}

describe("test the account client connecting to postgres", () => {
    beforeAll(() => {
        pool = new Pool({
            connectionString: 'postgres://postgres:111111@localhost:5432/mxaccounts',
        });
        client = createAccountClient({
            query: pool.query.bind(pool)
        });
    });

    afterEach((done) => {
        pool.query("delete from mx_accounts").then(_ => done());
    });

    afterAll(() => {
        pool.end();
    })

    test("insert new account into database", async() => {
        let result = await client.addAccount(id, "name", "passwordhash", 1);
        expect(result.rowCount).toBe(1);
        result = await queryById(pool, id);
        expect(result.rows[0]).toEqual({
            id,
            name: 'name',
            password_hash: 'passwordhash',
            create_time: '1'
        });
    });

    test("query the user by name", async() => {
        await client.addAccount(id, "name", "passwordhash", 1);
        const result = await client.queryAccount("name");
        expect(result.rows[0]).toEqual({
            id,
            password_hash: 'passwordhash',
        });
    });
});