const express = require('express');
const client = require('prom-client');
const Registry = client.Registry;
const register = new Registry();
client.collectDefaultMetrics({ register });

// Gauge to track system load
const systemLoadGauge = new client.Gauge({
  name: 'system_load',
  help: 'Tracks the system load',
});
register.registerMetric(systemLoadGauge);

// Update the system load gauge periodically
setInterval(() => {
  const load = Math.random() * 10; // Simulated load value for example
  systemLoadGauge.set(load);
}, 5000);

// Expose metrics at /metrics endpoint
const app = express();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.listen(9091, () => {
  console.log('Metrics server running on http://localhost:9091/metrics');
});
