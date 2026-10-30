import { Request,Response,NextFunction} from "express";
import { CITY_SCHEMA } from "../schema/city";
import { clientRedis } from "../redis/client";
import BadRequestError from "../errors/BadRequest";
import NotFoundError from "../errors/NotFoundError";
 

export const getWeather = async (req:Request,res:Response,next:NextFunction)=>{
      const city = CITY_SCHEMA.safeParse(req.query.location)
      
      if(!city.success){

        const errorMessage = city.error.issues[0]?.message || 'invalid input'

        throw new BadRequestError({message:errorMessage,logging:true})
      }
      
      const location = city.data.toLowerCase()
      const cacheKey = `api/weather?location=${location}`
      try{
        // Serve from cache to bypass external rate limits and speed up response times     
        if(clientRedis.isReady){
           const findCachedWeather = await clientRedis.get(cacheKey)
            
           if(findCachedWeather != null){
              const parseData = JSON.parse(findCachedWeather)
               
              if(parseData.error){
            
                return res.status(404).json(parseData)
              }
              

              return res.status(200).json(parseData)    
            }
        } 
          

      }catch(redisError){
          console.warn('redis cache is unavailable')
      }
                     
        try{
          const getWeather = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}`)

          if(!getWeather.ok){

              if(clientRedis.isReady){
                await clientRedis.setEx(cacheKey,60,JSON.stringify({error:'wrong weather location'}))
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
    
