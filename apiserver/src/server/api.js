const grpc = require('grpc');
const addNewUser = require('../service/addNewUser');
const PROTO_PATH = __dirname + '/../../proto/external.proto';

function serviceImpl() {
    return {
        addNewUser
    };
}

function mxAccountProto() {
    return grpc.load(PROTO_PATH).mxaccount;
}

function createGrpcServer(proto) {
    const service = proto.Register.service;
    const server = new grpc.Server()
    server.addService(service, serviceImpl());
    return server;
}

module.exports = {
    mxAccountProto,
    createGrpcServer
}