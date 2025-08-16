const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('./protos/helloworld.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const helloPackage = grpcObject.helloworld;

function sayHello(call, callback) {
  callback(null, { message: 'Hello ' + call.request.name });
}

const server = new grpc.Server();
server.addService(helloPackage.Greeter.service, { SayHello: sayHello });
server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
console.log('gRPC server running at http://0.0.0.0:50051');
server.start();
