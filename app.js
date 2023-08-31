const apiKey = '913bdc461fea26492a4a702c7526f2e4' ;
const city = 'Dhaka'; // Replace with the name of the city you want to display the weather for
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

const weatherDiv = document.getElementById('weather');

fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    const forecasts = data.list.filter(forecast => forecast.dt_txt.includes('12:00:00')); // Get the forecast for 12:00:00 each day
    forecasts.forEach(forecast => {
      const date = new Date(forecast.dt_txt);
      const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`;
      const temperature = Math.round(forecast.main.temp - 273.15); // Convert Kelvin to Celsius
      const html = `
        <div>
          <h2>${date.toDateString()}</h2>
          <img src="${iconUrl}" alt="${forecast.weather[0].description}">
          <p>${temperature} °C</p>
          <p>${forecast.weather[0].description}</p>
        </div>
      `;
      weatherDiv.innerHTML += html;
    });
  })
  .catch(error => console.error(error));