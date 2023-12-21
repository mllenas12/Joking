// Import key to acces to API 
import { API_KEY } from "./apiKey.js";
//Import weatherData interface 
import { OpenWeatherData } from './interfaces.js'


// Cordinates of Cibernarium 
const LAT: number = 41.40360583190066;
const LON: number = 2.197321322736073;
//Container where the weather information will be displayed
const weatherContainer: HTMLElement | null = document.querySelector("#weather-cont");
//Spinner when API is loading 
const spinner: HTMLElement | null = document.querySelector('#spinner')!;
spinner.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>`

//Get weather info from a public API 
const getWeatherFromApi = async (): Promise<OpenWeatherData> => {
    try {
        const res: Response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric`
        );
        if (!res.ok) {
            throw new Error("Error fetching weather from API.");
        }
        spinner.classList.add('d-none');
        return res.json();
    } catch (error) {
        console.error("Error fetching weather");
        throw error;
    }
};
// Get the reference to match with the correct current weather image
const getIconUrl = (iconId: string): string => `https://openweathermap.org/img/wn/${iconId}@2x.png`;

// Show the weather image in the HTML container
const showWeatherInfo = (url: string): void => {
    const icon: HTMLImageElement | null = document.createElement('img');
    icon.src = url;
    if (weatherContainer) {
        weatherContainer.appendChild(icon);
    }
}
// Show the current temperature in ºC in the HTML container
const displayTemperature = (temp: number) => {
    const temperature: HTMLElement | null = document.createElement('p')
    temperature.textContent = `${temp}ºC`;
    if (weatherContainer) {
        weatherContainer.appendChild(temperature);
    }
}
// Display the weather info (image and temperature) 
const displayWeatherInfo = async (): Promise<void> => {
    try {
        const weatherData: OpenWeatherData = await getWeatherFromApi();
        console.log(weatherData)
        const iconUrl: string = getIconUrl(weatherData.weather[0].icon)
        showWeatherInfo(iconUrl);

        let temperature: number = weatherData.main.temp;
        temperature = Math.round(temperature * 10) / 10;
        displayTemperature(temperature);

    } catch (error) {
        console.error('Error displaying weather', error)
    }
}

displayWeatherInfo()




