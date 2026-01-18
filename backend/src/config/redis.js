const Redis = require("ioredis");

// const redis = new Redis({
//     host: process.env.REDIS_HOST || "127.0.0.1", 
//     port: process.env.REDIS_PORT || 6379,
// });

const redis = new Redis(process.env.REDIS_URL || "127.0.0.1:6379");

redis.on("connect", () => {
  console.log("Connected to Redis");
});

redis.on("error", (err) => {
  console.error("Redis connection error:", err);
});

module.exports = redis;
