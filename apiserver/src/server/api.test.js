const {
    mxAccountProto,
    createGrpcServer
} = require('./api');

const grpc = require('grpc');
const proto= mxAccountProto()

let server;
let port;

beforeAll(() => {
    console.log("before all");
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
    }, function (err, response) {

        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx");
        if (err) {
            console.error(err);
        } else {
            console.log(response.code);
            console.log(response.userId);
        }
        expect(0).toBe(0);
        done();
    })
});