import type { Weather } from "../interfaces/weather"
import renderIcon from "./icon-render"
interface WeatherProps{
    weather:Weather
}
export default function WeatherForecast({weather}:WeatherProps){
      const weatherForecast = weather.list.slice(1,6)
    return(
        <>
        <div className="text-xs text-white mb-1">Today</div>
            <div className="p-2 mb-2 bg-indigo-200 rounded-xl flex bg-opacity-20">
              {weatherForecast.map((item,index)=>(
                <div key={index} className="flex-1 text-white text-center">
                  <div className="text-xs">{item.dt_txt.substring(10,16)}</div>
                  <div>{renderIcon(item.weather[0].main)}</div>
                  <div className="text-xs">{item.weather[0].main}</div>
                  <div className="text-xs">{Math.round(item.main.temp - 273.15)}°C</div>
                </div>
              ))}
            </div>
        </>
    )
}