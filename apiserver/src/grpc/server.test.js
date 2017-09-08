const createGrpcServer = require('./server');
const PROTO_PATH = require('./proto');

const grpc = require('grpc');

let server;
let port;

function createClient(port) {
    const proto = grpc.load(PROTO_PATH).mxaccount;
    return new proto.Register(`localhost:${port}`, grpc.credentials.createInsecure())
}

function mockRegisterSucceed(name, password) {
    return Promise.resolve("id");
}
describe("test grpc server with mock impl", () => {
    beforeAll(() => {
        server = createGrpcServer({
            register: mockRegisterSucceed,
        });
        port = server.bind('localhost:0', grpc.ServerCredentials.createInsecure());
        server.start();
    });

    afterAll((done) => {
        server.tryShutdown(() => done());
    });

    test("add new user", (done) => {
        const client = createClient(port);
        client.addNewUser({
            name: "xxxx",
            password: "yyyy",
        }, function (err, result) {
            if (err) {
                done(err);
            } else {
                expect(result.code).toBe(0);
                expect(result.userId).toBe("id");
                done();
            }
        })
    });
});