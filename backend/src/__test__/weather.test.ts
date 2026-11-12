import {describe,afterEach,jest,expect,it, afterAll} from '@jest/globals';
import app from '../app';
import supertest from 'supertest'
import { clientRedis } from '../redis/client';

afterAll(async ()=>{
    await clientRedis.quit()
})

afterEach(async ()=>{
    jest.restoreAllMocks()
})

describe('Get /weather?=city - fetch weather app', () => {

    const weather = '/api/weather?location=berlin'

     
    it("should return weather data", async ()=>{
         const response = await supertest(app).get(weather)
         expect(response.status).toBe(200)
         expect(response.body).toBeDefined()  
    })

    it("redis should be ready",async()=>{
         const ping = await clientRedis.ping() 
         expect(clientRedis).toBeDefined()
         expect(ping).toBe('PONG')
         expect(clientRedis.isReady).toBeTruthy()
    })

    it('redis should handle error grace',async ()=>{
        const spy = jest.spyOn(clientRedis,'get').mockRejectedValueOnce(new Error('redis is shutdown'))

        const response = await supertest(app).get(weather)
        
        expect(spy).toHaveBeenCalled()
        expect(response.status).toBe(200)
        expect(response.body).toBeDefined()
    })

    it("should return 429 error rate limiting",async ()=>{
        const requestWeather = 50
        
        for(let i:number = 0;i < requestWeather;i++){
            await supertest(app).get(weather)
        }
        
        const blockedRequest = await supertest(app).get(weather)
        expect(blockedRequest.status).toBe(429)

    })
    

    
});