import {
    PROTO_PATH,
} from '../grpc/proto';

import grpc from 'grpc';

function createClient() {
    const proto = grpc.load(PROTO_PATH).mxaccount;
    return new proto.Register('localhost:5069', grpc.credentials.createInsecure())
}

const client = createClient();
client.addNewUser({
    name: 'xxxx',
    password: 'yyyy',
}, function (err, result) {
    if (err) {
        console.error(err);
    } else {
        console.dir(result);
    }
});

