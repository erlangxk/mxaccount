import {
    Pool
} from 'pg';

import {
    AccountService
} from '../service/AccountService';

import {
    AccountClient
} from '../postgres/Account';


function createAccountService() {
    const pool = new Pool({
        connectionString: 'postgres://postgres:111111@localhost:5432/mxaccounts',
    });
    return new AccountService(new AccountClient(pool));
}

function startServer() {
    const server = createGrpcServer(createAccountService);
    server.bind('localhost:0', grpc.ServerCredentials.createInsecure());
    server.start();
}