const PROTO_PATH = __dirname + '/../proto/external.proto';

const grpc = require('grpc');

const api = grpc.load(PROTO_PATH).mxaccount;

function main() {
    let client = new api.Register('localhost:50051', grpc.credentials.createInsecure());
    client.addNewUser({
        name: "xxxx",
        password: "yyyy",
    }, function (err, response) {
        if (err) {
            console.error(err);
        } else {
            console.log(response.code);
            console.log(response.userId);
        }
    })
}

main();