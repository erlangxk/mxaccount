const {
    Pool
} = require('pg');

const config = {
    connectionString: 'postgres://postgres:111111@localhost:5432/mxaccounts',
    max: 50,
    idleTimeoutMillis: 3000,
};

const pool = new Pool(config);
pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res);
    pool.end();
});