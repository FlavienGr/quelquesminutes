const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log('Redis error: ', err);
});

module.exports = redisClient;
