// utils/redis.js
const { createClient } = require('redis');

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on('error', (err) => console.error('Redis error:', err));

const connectRedis = async () => {
  try {
    await client.connect();
    console.log('✅ Redis connected');
  } catch (err) {
    console.error('❌ Redis connection failed:', err);
  }
};

module.exports = {
  client,
  connectRedis,
};
