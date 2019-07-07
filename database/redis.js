const redis = require('redis');

const { REDIS_HOST, REDIS_PORT } = process.env;
const redisClient = redis.createClient({
  host: REDIS_HOST || 'localhost',
  port: REDIS_PORT || 6379
});

redisClient.on('connect', () => {
  // eslint-disable-next-line no-console
  console.log('Redis client connected');
});

redisClient.on('error', (err) => {
  // eslint-disable-next-line no-console
  console.log('Redis error: ', err);
});

module.exports = redisClient;
