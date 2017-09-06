const {
    mxAccountProto,
    createGrpcServer
} = require('./api');

const grpc = require('grpc');
const proto = mxAccountProto()

let server;
let port;

beforeAll(() => {
    server = createGrpcServer(proto);
    port = server.bind('localhost:0', grpc.ServerCredentials.createInsecure());
    server.start();
});

afterAll(() => {
    server.forceShutdown();
});

test("add new user", (done) => {
    const client = new proto.Register(`localhost:${port}`, grpc.credentials.createInsecure())
    client.addNewUser({
        name: "xxxx",
        password: "yyyy",
    }, function (err, result) {
        if (err) {
            done(err);
        } else {
            expect(result.code).toBe(0);
            expect(result.userId.length).toBe(36);
            done();
        }
    })
});