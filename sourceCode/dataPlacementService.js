const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('dataPlacement.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition);

// Mock function to simulate placing a replica on a node
function placeReplica(call, callback) {
  const { dataId, targetNode } = call.request;
  console.log(`Placing replica for data ID ${dataId} on node ${targetNode}`);
  callback(null, { success: true, message: 'Replica placed successfully' });
}

// Setup gRPC server
const server = new grpc.Server();
server.addService(proto.DataPlacementService.service, { placeReplica });
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Data Placement Service running on port 50051');
  server.start();
});
