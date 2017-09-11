import path from 'path';
import grpc from 'grpc';

export const PROTO_PATH = path.join(__dirname, 'external.proto');

export function addGrpcService(server) {
    const proto = grpc.load(PROTO_PATH).mxaccount;
    const service = proto.Register.service;
    return function (serviceImpl) {
        server.addService(service, serviceImpl);
    }
}