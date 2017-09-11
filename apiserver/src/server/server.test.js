import {
    PROTO_PATH,
    addGrpcService
} from '../grpc/proto';

import grpc from 'grpc';
import createServiceImpl from '../grpc/service';

let server;
let port;

function createClient(port) {
    const proto = grpc.load(PROTO_PATH).mxaccount;
    return new proto.Register(`localhost:${port}`, grpc.credentials.createInsecure())
}

function mockRegisterSucceed(name, password) {
    if (name === "xxxx") {
        return Promise.resolve("id");
    } else {
        return Promise.reject(new Error("something is wrong"));
    }
}
describe.skip("test grpc server with mock impl", () => {
    beforeAll(() => {
        server = new grpc.Server();
        addGrpcService(server)(createServiceImpl({
            register: mockRegisterSucceed,
        }));
        port = server.bind('localhost:0', grpc.ServerCredentials.createInsecure());
        server.start();
    });

    afterAll((done) => {
        server.tryShutdown(() => done());
    });

    test("add new user successfully", (done) => {
        const client = createClient(port);
        client.addNewUser({
            name: "xxxx",
            password: "yyyy",
        }, function (err, result) {
            expect(err).toBeFalsy();
            expect(result.code).toBe(0);
            expect(result.userId).toBe("id");
            done();
        })
    });

    test("add new user failed", (done) => {
        const client = createClient(port);
        client.addNewUser({
            name: "xxxxk",
            password: "yyyy",
        }, function (err, result) {
            expect(err).toBeFalsy();
            expect(result.code).toBe(1);
            done();
        })
    });
});