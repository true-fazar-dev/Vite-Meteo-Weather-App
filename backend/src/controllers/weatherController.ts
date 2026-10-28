import { Request,Response,NextFunction} from "express";
 
import { clientRedis } from "../redis/client";
import BadRequestError from "../errors/BadRequest";
import NotFoundError from "../errors/NotFoundError";
 

export const getWeather = async (req:Request,res:Response,next:NextFunction)=>{
      const location = req.query.location

      if(!location){
        throw new BadRequestError({message:'city is required!',logging:true})
      }
      
      try{
        // Serve from cache to bypass external rate limits and speed up response times     
         const findCachedWeather = await clientRedis.get(`api/weather?location=${location}`)
          if(findCachedWeather != null){
            return res.status(200).json(JSON.parse(findCachedWeather))    
          }
      }catch(redisError){
          console.warn('redis cache is unavailable')
      }
                     
        try{
          const getWeather = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}`)

          if(!getWeather.ok){

              if(clientRedis.isReady){
                await clientRedis.setEx(`api/weather?location=${location}`,60,JSON.stringify({error:'wrong weather location'}))
              }
              throw new NotFoundError({message:'city not found',logging:true})
          }

          const weatherData = await getWeather.json()
          // Cache the fresh response for 1 hour to reduce third-party load

          if(clientRedis.isReady){
            await clientRedis.setEx(`api/weather?location=${location}`,3600,JSON.stringify(weatherData))        
          }
          return res.status(200).json(weatherData)
        
        }catch(err){
          next(err)
        }
  }
    
