import grpc from 'grpc';
import createServiceImpl from './service';
import PROTO_PATH from './proto';

export default function createGrpcServer(accountService) {
    const proto = grpc.load(PROTO_PATH).mxaccount;
    const service = proto.Register.service;
    const server = new grpc.Server()
    server.addService(service, createServiceImpl(accountService));
    return server;
}