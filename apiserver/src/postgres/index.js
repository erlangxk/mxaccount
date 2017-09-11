import {
    Pool
} from 'pg';

import {
    AccountClient
} from './AccountClient';

const config = {
    connectionString: 'postgres://postgres:111111@localhost:5432/mxaccounts',
    max: 50,
    idleTimeoutMillis: 3000,
};

export default function () {
    const pool = new Pool(config);
    return new AccountClient(pool);
}