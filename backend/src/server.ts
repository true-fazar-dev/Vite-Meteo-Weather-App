import dotenv from 'dotenv'
import app from './app'
import config from './config/config'
dotenv.config()

const startServer = ()=>{
    app.listen(config.port,()=>{
    console.log(`server is running on port ${config.port}`)
})
}

startServer()
