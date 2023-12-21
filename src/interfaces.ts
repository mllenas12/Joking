
export  interface Report{
    joke: string;
    score: 1 | 2 | 3;
    date: string;
 }

export interface OpenWeatherData {
    base: string;
    clouds: {
        all: number;
      }
    cod: number;
    coord: {
        lat: number;
        lon: number;
      }
      dt: number;
      id: number;
      main: {
        feels_like: number;
        humidity: number;
        pressure: number;
        temp: number;
        temp_min: number;
        temp_max: number;
       
        
        sea_level: number;
        grnd_level: number;
      }
      name: string;
      sys: {
        country: string;
        id: number;
        sunrise: number;
        sunset: number;
        type: number;
      }
      timezone: number;
      visibility: number;
      weather: {
        description: string;
        icon: string;
        id: number;
        main: string;
      }[]
      wind: {
        deg: number;
        gust: number;
        speed: number;
      }
    }

