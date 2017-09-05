const uuid = require('uuid/v1');

const PROTO_PATH= __dirname + '/../proto/external.proto';


const grpc = require('grpc');
const api = grpc.load(PROTO_PATH).mxaccount;

function addNewUser(call,callback){
    callback(null, {code:0, userId:"id1"});
}

function addService(server){
    server.addService(api.Register.service, {addNewUser:addNewUser});
}

function main(){
    var server = new grpc.Server();
    addService(server);
    server.bind('0.0.0.0:50051',grpc.ServerCredentials.createInsecure());
    server.start();
}

main();