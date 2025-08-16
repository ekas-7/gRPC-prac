const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDef = protoLoader.loadSync('./protos/helloworld.proto');
const grpcObject = grpc.loadPackageDefinition(packageDef);
const helloPackage = grpcObject.helloworld;

const client = new helloPackage.Greeter('localhost:50051', grpc.credentials.createInsecure());

client.SayHello({ name: 'World' }, (err, response) => {
  if (err) console.error(err);
  else console.log('Greeting:', response.message);
});
