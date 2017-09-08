const grpc = require('grpc');
const createServiceImpl = require('./service');
const PROTO_PATH = require('./proto');

function createGrpcServer(accountService) {
    const proto = grpc.load(PROTO_PATH).mxaccount;
    const service = proto.Register.service;
    const server = new grpc.Server()
    server.addService(service, createServiceImpl(accountService));
    return server;
}

module.exports = createGrpcServer