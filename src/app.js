function formatDate(date) {
  
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let day = days[date.getDay()];

  let dateNumber = date.getDate();

  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  let month = months[date.getMonth()];

  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`
  }
  
  document.querySelector("#current-date").innerHTML = `${day} ${dateNumber} ${month}`
  document.querySelector("#current-time").innerHTML = `${hour}:${minutes}`

}

function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[day];
}

function displayForecast(response) {
    
    let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    let forecastMaxTemp = forecastDay.temp.max;
    let forecastMinTemp = forecastDay.temp.min;
      if (index < 6) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max">${Math.round(forecastMaxTemp)}°  | </span>
          <span class="weather-forecast-temperature-min">${Math.round(forecastMinTemp)}°</span>
        </div>
      </div>
  `;
  }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
    let apiKey = "a57cca630b0e893126f37f33164019a3"
    let units = "metric"
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`
    axios.get(apiUrl).then(displayForecast);
}


function displayWeather(response) {
    celsiusTemperature = response.data.main.temp;
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round((response.data.wind.speed) * 3.6);
    document.querySelector("#weather-image").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    document.querySelector("#weather-image").setAttribute("alt", response.data.weather[0].description)

  getForecast(response.data.coord)
}

function search(city) {
    let apiKey = "a57cca630b0e893126f37f33164019a3"
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeather);
}

function displayCity(event) {
    event.preventDefault();
    let city = (document.querySelector("#search-bar-input")).value;
    search(city);
}

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a57cca630b0e893126f37f33164019a3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function showPosition(event) {
  navigator.geolocation.getCurrentPosition(showCurrentLocation) 
}

function showFahrenheitTemperature(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9 / 5) + 32;
    document.querySelector("#temperature").innerHTML = Math.round(fahrenheitTemperature);
}

function showCelsiusTemperature(event) {
    event.preventDefault();
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");
    document.querySelector("#temperature").innerHTML = Math.round(celsiusTemperature);
}

let now = new Date();
formatDate(now);

let celsiusTemperature = null;

document.querySelector("#search-bar").addEventListener("submit", displayCity);
document.querySelector("#current-location-button").addEventListener("click", showPosition);

let celsiusLink = document.querySelector("#celsius-link");
let fahrenheitLink = document.querySelector("#fahrenheit-link");

fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
celsiusLink.addEventListener("click", showCelsiusTemperature);

search("London");