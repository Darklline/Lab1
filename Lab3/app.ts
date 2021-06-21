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
        pressure: number;
    };
}

export class App {
    formElement!: HTMLFormElement;
    containerElement!: HTMLDivElement;
    weatherData: Set<CityWeatherData>;
    constructor() {
        this.weatherData = new Set<CityWeatherData>();
        this.getForm();
        this.attachEventListener();
        this.loadSavedCities();
    }

    getForm() {
        this.formElement = document.querySelector('.cityForm') as HTMLFormElement;
        this.containerElement = document.querySelector('.container') as HTMLDivElement;
    }

    attachEventListener() {
        this.formElement.addEventListener('submit', e => this.handleFormSubmit(e));
    }

    handleFormSubmit(e: Event) {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const input = target.elements[0] as HTMLInputElement;
        this.getCityInfo(input.value);
        target.reset();
    }

    async getCityInfo(cityName: string) {
        const weather = await this.getWeather(cityName);

        this.saveData(cityName);
    }

    async getWeather(city: string) {
        try {
            const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.OPEN_WEATHER_API}`;
            const weatherResponse = await fetch(openWeatherUrl);
            const weatherData = (await weatherResponse.json()) as CityWeatherData;
            this.weatherData.add(weatherData);
            this.appendElements();
            return weatherData;
        } catch (err) {
            throw new Error('Failed to fetch');
        }
    }

    saveData(cityName: string) {
        const data = localStorage.getItem('cities');
        if (data) {
            localStorage.setItem(
                'cities',
                JSON.stringify([...new Set([...JSON.parse(data), cityName])]),
            );
        } else {
            localStorage.setItem('cities', JSON.stringify([cityName]));
        }
    }

    getData() {
        const data = localStorage.getItem('cities');
        if (data) {
            return JSON.parse(data) as string[];
        } else {
            return null;
        }
    }

    loadSavedCities() {
        const data = this.getData();
        if (data) {
            data.forEach(cityName => {
                this.getWeather(cityName);
            });
        }
    }

    appendElements() {
        const elemntList = [...this.weatherData].map(weather =>
            this.generateWeatherElement({
                cityName: weather.name,
                cloudsInfo: weather.weather[0].description,
                pressureValue: weather.main.pressure,
                temperature: weather.main.temp,
            }),
        );
        this.containerElement.innerHTML = '';
        elemntList.forEach(el => this.containerElement.appendChild(el));
    }

    generateWeatherElement({
        cityName,
        cloudsInfo,
        temperature,
        pressureValue,
    }: {
        cityName: string;
        cloudsInfo: string;
        temperature: number;
        pressureValue: number;
    }) {
        const div = document.createElement('div');
        div.className = 'city';
        const cityname = document.createElement('p');
        cityname.className = 'city__cityname';
        cityname.textContent = cityName;

        const clouds = document.createElement('p');
        clouds.className = 'city__clouds';
        clouds.textContent = cloudsInfo;

        const temp = document.createElement('p');
        temp.className = 'city__temp';
        temp.textContent = `${temperature} ℃`;

        const pressureContainer = document.createElement('div');
        pressureContainer.className = 'city__pressure';
        const pressureText = document.createElement('p');
        const pressure = document.createElement('p');
        pressureText.textContent = 'Pressure:';
        pressure.textContent = `${pressureValue} hPA`;

        pressureContainer.appendChild(pressureText);
        pressureContainer.appendChild(pressure);

        const optionalInfo = document.createElement('div');
        optionalInfo.className = 'city__optional';
        optionalInfo.appendChild(temp);
        optionalInfo.appendChild(pressureContainer);

        div.appendChild(cityname);
        div.appendChild(clouds);
        div.appendChild(optionalInfo);
        return div;
    }
}
