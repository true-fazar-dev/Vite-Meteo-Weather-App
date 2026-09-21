
export default function renderIcon(weatherCondition:string){
    let iconClass:string = ""
    switch(weatherCondition){
        case "Clear":
            iconClass = 'fa fa-sun-o'
            break
        case "Clouds":
            iconClass = 'fa fa-cloud'
            break
        case "Rain":
            iconClass = 'fa fa-umbrella'
            break
        case "Thunderstorm":
            iconClass = 'fa fa-bolt'
            break
        default :
            iconClass = 'fa fa-question'
            break

    }
    
    return (
      <span className = {iconClass}>

      </span>
    )
}