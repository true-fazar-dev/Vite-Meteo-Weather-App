import { createClient } from "redis";
import dotenv from 'dotenv'

dotenv.config()

export const clientRedis = createClient({
    url: process.env.REDIS_URL || 'redis://redis:6379',
    disableOfflineQueue:true
});

clientRedis.on('error', err => {});
 
(async () => {
    await clientRedis.connect();
})();