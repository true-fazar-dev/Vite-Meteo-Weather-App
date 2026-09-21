import { useState,useEffect} from "react"
import 'font-awesome/css/font-awesome.min.css'
import type { Weather } from "./interfaces/weather"
import WeatherLoading from "./components/WeatherLoading"
import WeatherHeader from "./components/WeatherHeader"
import WeatherForecast from "./components/WeatherForecast" 

function App() {
  const [weather,setWeather] = useState<Weather | null>(null)
  const [dataIsLoaded,setDataIsLoaded] = useState<boolean>(false)
  const [location,setLocation] = useState<string>('london')
  const [errorMessage,setErrorMessage] = useState<string|null>(null)

  //fetch default weather from backend
  useEffect(()=>{
    fetch(`http://localhost:3000/api/weather?location=${location}`)
      .then((res)=>res.json())
      .then((json)=>{
        setWeather(json)
        setDataIsLoaded(true)
      }).catch(err=>{
        setErrorMessage(err.message)
        throw new Error(err)
         
      
      })
  },[])
   

  async function handleSubmit(e:React.SubmitEvent<HTMLFormElement>){
    e.preventDefault()
     
     
    const form = e.target
    const formData = new FormData(form)
    const weatherQuery = formData.get("location")
    
    
    try{
      const weatherData = await fetch(`http://localhost:3000/api/weather?location=${weatherQuery}`)
      
      if(!weatherData.ok){
        throw new Error('city not found')
         
      }

      const res = await weatherData.json()
      setWeather(res)
      setLocation(res.city.name)
      setDataIsLoaded(true)
      form.reset()

      }catch(err:any){
        setErrorMessage(err.message)
      }
    }
  
  
  if(!dataIsLoaded || !weather){
    return(
      <WeatherLoading errorMessage={errorMessage}/> 
    )
  }
 
  return (
  <div className="flex flex-col items-center min-h-screen bg-gray-200 justify-center py-10 font-sans">
      <div className="bg-gradient-to-br from-indigo-600 to-purple-300 rounded-xl p-4 w-80 shadow">
        <div className="p-2 mb-2">
          <WeatherHeader weather={weather}/>
            <div className="p-1 mb-1">
            <WeatherForecast weather={weather}/>
            <div className="text-xs text-white">
              <form onSubmit={handleSubmit}>
                   <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                      <div className="relative">
                      <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/></svg>
                      </div>
                      <input name='location' type="search" id="search" className="block w-full p-3 ps-9 bg-neutral-secondary-medium rounded-xl border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Search" required />
                      
                  </div>
              </form>
            </div>
          </div>
        </div>
      </div>
       
    </div>
  )
}

export default App
