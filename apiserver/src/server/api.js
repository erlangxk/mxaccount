const {
    Pool
} = require('pg');

const AccountService = require('../service/AccountService');
const AccountClient = require('../postgres/Account');


function createAccountService() {
    const pool = new Pool({
        connectionString: 'postgres://postgres:111111@localhost:5432/mxaccounts',
    });
    return new AccountService(new AccountClient(pool));
}

function startServer(){
    const server = createGrpcServer(createAccountService);
    server.bind('localhost:0', grpc.ServerCredentials.createInsecure());
    server.start();
}