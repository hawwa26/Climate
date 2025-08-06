document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const searchButton = document.getElementById('search-button');
    const cityNameDisplay = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const humidityDisplay = document.getElementById('humidity');
    const windSpeedDisplay = document.getElementById('wind-speed');

    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key

    searchButton.addEventListener('click', () => {
        const city = cityInput.value.trim();
        if (city) {
            fetchWeather(city);
        }
    });

    async function fetchWeather(city) {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
            const data = await response.json();

            if (data.cod === 200) {
                cityNameDisplay.textContent = data.name;
                temperatureDisplay.textContent = `Temperature: ${data.main.temp}°C`;
                descriptionDisplay.textContent = `Description: ${data.weather[0].description}`;
                humidityDisplay.textContent = `Humidity: ${data.main.humidity}%`;
                windSpeedDisplay.textContent = `Wind Speed: ${data.wind.speed} m/s`;
            } else {
                alert('City not found or API error.');
                clearWeatherDisplay();
            }
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Could not retrieve weather data.');
            clearWeatherDisplay();
        }
    }

    function clearWeatherDisplay() {
        cityNameDisplay.textContent = '';
        temperatureDisplay.textContent = '';
        descriptionDisplay.textContent = '';
        humidityDisplay.textContent = '';
        windSpeedDisplay.textContent = '';
    }
});
