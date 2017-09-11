import grpc from 'grpc';

import createServiceImpl from './service';

import {
    addGrpcService
} from './proto';

export default function ({
    register
}, address, credentials) {
    const server = new grpc.Server();
    addGrpcService(server)(createServiceImpl({
        register
    }));
    server.bind(address, credentials);
    server.start();
}