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

function displayWeather(response) {
    document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp)
    document.querySelector("#description").innerHTML = response.data.weather[0].description;
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind-speed").innerHTML = Math.round((response.data.wind.speed) * 3.6);
    document.querySelector("#weather-image").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
    document.querySelector("#weather-image").setAttribute("alt", response.data.weather[0].description)
}

function search(city) {
    let apiKey = "a57cca630b0e893126f37f33164019a3"
    let units = "metric";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
    axios.get(apiUrl).then(displayWeather)
}

function displayCity(event) {
    event.preventDefault();
    let city = (document.querySelector("#search-bar-input")).value;
    search(city);
}

function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "a57cca630b0e893126f37f33164019a3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${apiKey}`;
  console.log(apiUrl)
  axios.get(apiUrl).then(displayWeather)
}

function showPosition(event) {
  navigator.geolocation.getCurrentPosition(showLocation) 
}


let now = new Date();
formatDate(now);

document.querySelector("#search-bar").addEventListener("submit", displayCity)
document.querySelector("#current-location-button").addEventListener("click", showPosition)

search("London");