export interface Weather{
  city:{
    name:string,
    country:string
  }
  list:Array<{
    main:{
      temp:number,
      temp_min:number,
      temp_max:number,
      feels_like:number,
    },
    weather:Array<{
      main:string,
      description:string
    }>
    dt_txt:string
  }>
  
}