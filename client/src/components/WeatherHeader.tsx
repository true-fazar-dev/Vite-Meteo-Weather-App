import type { Weather } from "../interfaces/weather";
import renderIcon from "./icon-render";

interface WeatherProps{
    weather:Weather
}

export default function WeatherHeader({weather}:WeatherProps){
    return(
    <> 
        <div className="text-center">
            <div className="leading-tight text-white">
              <span className="fa fa-map-marker"></span>  {weather.city.name}/<span className="font-bold">{weather.city.country}</span> 
            </div>
            <div className="text-center">
              <div className="leading-tight text-gray-300">
                {weather.list[0].dt_txt}
              </div>
            </div>
          </div>
          
            <div className="flex">
              <div className="flex-1 text-white text-3xl text-center">
                {renderIcon(weather.list[0].weather[0].main)} <span> {Math.round(weather.list[0].main.temp - 273.15)}°C</span>
              </div>
            </div>
            <div className="p-2 mb-2">
              <div className="text-center">
                <div className="leading-tight text-white text-md">{Math.round(weather.list[0].main.temp_min - 273.15)}°/{Math.round(weather.list[0].main.temp_max - 273.15)}°C Feels like { Math.round(weather.list[0].main.feels_like - 273.15)}°C</div>
                <div className="leading-tight text-white text-md font-bold">{weather.list[0].weather[0].main}</div>
              </div>
            </div>
    </>
    )
}