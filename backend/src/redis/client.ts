import { createClient } from "redis";
import dotenv from 'dotenv'

dotenv.config()

export const clientRedis = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379'
});

clientRedis.on('error', err => console.log('Redis client error', err));
 
(async () => {
    await clientRedis.connect();
})();