import express from 'express'
import router from './routes/route'
import config from './config/config'
import rateLimit from 'express-rate-limit' 
import cors  from 'cors'
import RedisStore from 'rate-limit-redis'
import dotenv from 'dotenv'
import { clientRedis } from './redis/client'


dotenv.config()
 
const app = express()
 
//add rate limiter, with redis library RedisStore to avoid request abuse
const limiter = rateLimit({
    windowMs:10 * 60 * 1000,
    limit:50,
    standardHeaders:true,  
    ipv6Subnet:56,
    store: new RedisStore({
        sendCommand: (...args: string[]) => clientRedis.sendCommand(args),
    })  
})

//Restrict public access, too only exclusively to the local client 
const corsOption = {
    origin:'http://localhost:5173',
    methods:'GET',
    optionsSuccessStatus:200
}
 
app.use(cors(corsOption))
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(limiter)

app.use('/api/weather',router)

app.listen(config.port,()=>{
    console.log(`server is running on port ${config.port}`)
})

export default app