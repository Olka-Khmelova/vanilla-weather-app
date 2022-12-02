////////                  CURRENT DAY&TIME                 ///////////
//add 0 to hours and minutes < 10
function padTo2Digits(num){
  return String(num).padStart(2, "0");
}
//date
function formatDay(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wensday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[now.getDay()];
  return day;
}
let now = new Date();

let currentDay = document.querySelector("#current-day");
currentDay.innerHTML = formatDay();
//time
let hour = padTo2Digits(now.getHours());
let minutes = padTo2Digits(now.getMinutes());

let currentTime = document.querySelector("#current-time");
currentTime.innerHTML = `${hour}:${minutes}`;

//////////////////////     Search form      /////////////////////
function formatDayForecast(timestamp){
  let date = new Date(timestamp*1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function getForecast(coords){
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=${units}`
axios.get(apiUrl).then(showForecast);
}
function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  feelsTemperature = response.data.main.feels_like;

  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = response.data.name;

  let displayTemperature = document.querySelector("#current-temperature");
  displayTemperature.innerHTML = Math.round(celsiusTemperature);

  let displayFeelsTemperature = document.querySelector("#feels-temperature");
  displayFeelsTemperature.innerHTML = `${Math.round(feelsTemperature)}`;

  let weatherDescr = document.querySelector("#weather-description");
  weatherDescr.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity-info");
  humidity.innerHTML = response.data.main.humidity;

  let windSpeed = document.querySelector("#wind-speed-info");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);

  let iconElement= document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  let descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  getForecast(response.data.coord);
}

function getPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function currentCity(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}
let currentCityBtn = document.querySelector(".geo-location-button");
currentCityBtn.addEventListener("click", currentCity);

function search(city) {
  let apiKey = "fe1483f743b581b5520a1b725af03a49";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

function searchingSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let serchingForm = document.querySelector("#searching-form");
serchingForm.addEventListener("submit", searchingSubmit);

function showForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = ` <div class="row row-forecast">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  forecast.forEach(function(forecastDay, idx) {
    if (idx<5){
    forecastHTML += `
    <div class="col">
    <span class="weather-forecst-day">${formatDayForecast(forecastDay.dt)}</span> 
    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="forecast img" width="50">
    <span class="maximum-temp forecast-temper">${Math.round(forecastDay.temp.max)}°</span>
    <span class="min-temp forecast-temper">${Math.round(forecastDay.temp.min)}°</span>
    </div>`
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
search("Kyiv");