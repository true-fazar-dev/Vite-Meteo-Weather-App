import z from 'zod'

export const WEATHER_SCHEMA = 
    z.string()
    .min(2)
    .max(40,'city name is too long')
    .toLowerCase()
    .regex(/^[^0-9]+$/,'city name must not contain any number')
