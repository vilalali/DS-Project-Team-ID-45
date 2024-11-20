const redis = require('redis');
const { Registry, Gauge } = require('prom-client');

// Redis client setup
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// Connect to Redis (required in Redis v4+)
redisClient.connect().catch(console.error);

const registry = new Registry();

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('dataPlacement.proto', {});
const proto = grpc.loadPackageDefinition(packageDefinition);

// gRPC client
const grpcClient = new proto.DataPlacementService('localhost:50051', grpc.credentials.createInsecure());

// Create a gauge metric to track access frequency
const accessFrequencyGauge = new Gauge({
  name: 'data_access_frequency',
  help: 'Tracks the frequency of data access',
  labelNames: ['data_id']
});

// Register the metric
registry.registerMetric(accessFrequencyGauge);

// Sample function to check if replication is needed based on access frequency
async function shouldReplicate(dataId) {
  const frequency = await redisClient.get(`access_frequency:${dataId}`);
  return frequency > 10; // arbitrary threshold for example
}

// Function to adjust replication policy
async function adjustReplication(dataId) {
  const needsReplication = await shouldReplicate(dataId);

  if (needsReplication) {
    console.log(`Increasing replicas for data ID: ${dataId}`);
    placeReplica(dataId, 'targetNode1');
  } else {
    console.log(`No replication needed for data ID: ${dataId}`);
  }
}

function placeReplica(dataId, targetNode) {
  grpcClient.placeReplica({ dataId, targetNode }, (err, response) => {
    if (err) console.error(`Error placing replica: ${err.message}`);
    else console.log(`Replica placement response: ${response.message}`);
  });
}

// Periodically update access frequency gauge for Prometheus
setInterval(async () => {
  const keys = await redisClient.keys('access_frequency:*');
  for (const key of keys) {
    const frequency = await redisClient.get(key);
    const dataId = key.split(':')[1];
    accessFrequencyGauge.set({ data_id: dataId }, parseInt(frequency, 10));
  }
}, 5000); // Update every 5 seconds

module.exports = { adjustReplication };
