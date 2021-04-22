interface Weather {
    description: string;
    main: string;
    id: number;
}

interface CityWeatherData {
    name: string;
    weather: Weather[];
    main: {
        temp: number;
    };
}

export class App {
    formElement!: HTMLFormElement;
    constructor() {
        this.getForm();
        fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${'zakopane'}&units=metric&appid=${
                process.env.OPEN_WEATHER_API
            }`,
        )
            .then(data => data.json())
            .then(console.log);
    }

    getForm() {
        this.formElement = document.querySelector('.cityForm') as HTMLFormElement;
    }

    async getCityInfo(cityName: string) {
        const weather = await this.getWeather(cityName);
        this.saveData(cityName);
    }

    async getWeather(city: string): Promise<any> {
        const openWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${123}`;
        const weatherResponse = await fetch(openWeatherUrl);
        const weatherData = await weatherResponse.json();
        console.log(weatherData);
        return weatherData;
    }

    saveData(cityName: string) {
        //TODO
        localStorage.setItem('cities', JSON.stringify(cityName));
    }

    getData() {
        const data = localStorage.getItem('weatherData');
        if (data) {
            return JSON.parse(data);
        } else {
            return {};
        }
    }

    loadSavedCities() {}
}
