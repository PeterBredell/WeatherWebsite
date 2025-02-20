function getWeather() {
    const city = document.getElementById('cityInput').value.trim().toLowerCase();
    const key = ""; //Enter api key here
    let url = "http://api.weatherapi.com/v1/current.json?key=" + key + "&q=" + city + "&aqi=no";
    const infoDiv = document.getElementById('weatherInfo');

    if (city.length === 0) {
        infoDiv.innerHTML = "<p>Please enter a city or province name.</p>";
        return;
    }

    infoDiv.innerHTML = "<p>Loading...</p>";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(weatherData => {
            if (weatherData.error) {
                infoDiv.innerHTML = `<p>Error: ${weatherData.error.message}</p>`;
            } else {
                const temp = weatherData.current.temp_c;
                const desc = weatherData.current.condition.text;
                const feelsLike = weatherData.current.feelslike_c;
                const icon = weatherData.current.condition.icon;
                infoDiv.innerHTML = `
                    <p style="font-size:2rem;">${desc}</p>
                    <img src=${icon} >
                    <p>Temperature: ${temp}°C</p>
                    <p>Feels Like: ${feelsLike}°C</p>
                `;
            }
        })
        .catch(error => {
            console.error("Error:", error);
            infoDiv.innerHTML = `<p>Enter a valid city or province.</p>`;
        });
}