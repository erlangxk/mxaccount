import grpc from 'grpc';
import createClient from '../postgres';
import createService from '../service';
import startServer from '../grpc';

const service = createService(createClient());
startServer(service, "localhost:0", grpc.ServerCredentials.createInsecure());