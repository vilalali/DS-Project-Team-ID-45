const { adjustReplication } = require('./replicationPolicyEngine'); // Import the replication adjustment function
const redis = require('redis');

// Redis client setup
const redisClient = redis.createClient();
redisClient.on('error', (err) => console.error('Redis Client Error:', err));

// Connect to Redis (required in Redis v4+)
redisClient.connect().catch(console.error);

// Simulate data access patterns
async function simulateAccess(dataId) {
  // Ensure the Redis client is connected before proceeding
  if (!redisClient.isOpen) {
    console.error('Redis client is not connected.');
    return;
  }

  // Increment access frequency in Redis for the given data ID
  const frequency = await redisClient.incr(`access_frequency:${dataId}`);
  console.log(`Data ID: ${dataId}, Access Frequency: ${frequency}`);

  // Adjust replication based on updated access pattern
  await adjustReplication(dataId);
}

// Run simulation periodically for a set of data IDs
setInterval(() => {
  simulateAccess('data123'); // Example data ID 1
  simulateAccess('data456'); // Example data ID 2
}, 1000); // Adjust every second for testing

// Graceful shutdown
process.on('SIGINT', async () => {
  await redisClient.quit();
  console.log("Redis client closed gracefully.");
  process.exit(0);
});
