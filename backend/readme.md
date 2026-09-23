# Backend (Redis + Typescript + Express)

This project is built with Express (a lightweight framework for Node.js routing), TypeScript (for strict type safety), and Redis (an in-memory NoSQL key-value database used for lightning-fast caching and rate limiting).

## Structure of the project

```
backend/			        #this is your backend folder 
├── src/			        #this is where your backend project stored in
│   ├── config/		        #configuration for our express localhost	
│   ├── controllers/		#logic to run our express request
│   ├── redis/		        #redis folder for configuration
│   ├── routes/		        #routes for api end points to use
│   └── app.ts		        #main file to run entire backend app
├── tsconfig.json		    #configuration for typescript development
├── .dockerignore		    #ignore file or folder that will be executed by docker 
├── .env.example		    #example env to setup for the backend 
├── Dockerfile		        #Step by step to build docker image
├── package-lock.json	    #To ensure consistent installation in different environment
└── package.json		    #file contains the list of dependencies and script
```

## Redis Caching
```

export const getWeather = async (req:Request,res:Response)=>{
      const location = req.query.location

      if(!location){
        return res.status(400).json({error:'please provide correct location'})
      }
      
      const findCachedWeather = await clientRedis.get(`api/weather?location=${location}`)

      // Serve from cache to bypass external rate limits and speed up response times
      if(findCachedWeather != null){
        return res.status(200).json(JSON.parse(findCachedWeather))        
      }else{               
        try{
          const getWeather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}`)

          if(!getWeather.ok){
              return res.status(400).json({error:'wrong weather api credentials or wrong location!'})
          }

          const weatherData = await getWeather.json()
          // Cache the fresh response for 1 hour to reduce third-party load
          await clientRedis.setEx(`api/weather?location=${location}`,3600,JSON.stringify(weatherData))        
          return res.status(200).json(weatherData)
        
        }catch(err){
            return res.status(400).json(err)
        }
  }
    
}

```

**How Does Caching works?**
1. You must use query to get the location that can be city and country for our weather API
2. Check if redis have already stored the weather data inside, if it’s exist then redis should send those weather data and return weather values inside redis
3. if not found then use the api of openweather api
4. then those openweather api result must be stored into redis database, and it must have a time limit in this case I use 3600 seconds or one hour
5. it should return a json values that will be used for our client!

## Redis Rate Limiting

This features allow our website to have limit of how much request can be used, here’s the code

```
const limiter = rateLimit({
    windowMs:10 * 60 * 1000,
    limit:50,
    standardHeaders:true,  
    ipv6Subnet:56,
    store: new RedisStore({
        sendCommand: (...args: string[]) => clientRedis.sendCommand(args),
    })  
})
```
For this project we want limit by 50 request for 10 minutes, in this I use RedisStore, you can download this at npm library 

## CORS
Cross Origin Resource Sharing is important to allow our backend to be accessed to other, here’s the code:

```
const corsOption = {
    origin:'http://localhost:5173',
    methods:'GET',
    optionsSuccessStatus:200
}
```

**in this CORS setup**
* Origin will only be allowed on our localhost:5173 this is our vite react project in client folder!
* The methods in here I only use GET since controllers of our backend consist of only get for open weather API