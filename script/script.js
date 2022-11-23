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
function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  feelsTemperature = response.data.main.feels_like;

  let displayCity = document.querySelector("#display-city");
  displayCity.innerHTML = response.data.name;

  let displayTemperature = document.querySelector("#current-temperature");
  displayTemperature.innerHTML = Math.round(celsiusTemperature);

  let displayFeelsTemperature = document.querySelector("#feels-temperature");
  displayFeelsTemperature.innerHTML = `${Math.round(feelsTemperature)} °C`;

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
function showFahrenh (event){
  event.preventDefault();
  let displayTemperature = document.querySelector("#current-temperature");
  let displayFeelsTemperature = document.querySelector("#feels-temperature");
  fahrenheitLink.classList.add("active");
  celsiusLink.classList.remove("active");


  let fahrenhTemperature = (celsiusTemperature*9)/5 + 32;
  let fahrenhFeels = (feelsTemperature*9)/5 + 32;

  displayTemperature.innerHTML = Math.round(fahrenhTemperature);
  displayFeelsTemperature.innerHTML = `${Math.round(fahrenhFeels)} F`;
}

function showCelsius (event){
  event.preventDefault();
  let displayTemperature = document.querySelector("#current-temperature");
  displayTemperature.innerHTML = Math.round(celsiusTemperature);

  
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
 
  let displayFeelsTemperature = document.querySelector("#feels-temperature");
  displayFeelsTemperature.innerHTML = `${Math.round(feelsTemperature)} °C`;
}

let celsiusTemperature = null;
let feelsTemperature = null;

let serchingForm = document.querySelector("#searching-form");
serchingForm.addEventListener("submit", searchingSubmit);


let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenh);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsius);

search("Kyiv");

function showForecast(){
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = ` <div class="row row-forecast">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function(day) {
    forecastHTML =  forecastHTML + `
    <div class="col-2">
    <span class="weather-forecst-day">${day}</span> 
    <img src="http://openweathermap.org/img/wn/04d@2x.png" alt="forecast img" width="50">
    <span class="maximum-temp forecast-temper">14°</span>
    <span class="min-temp forecast-temper">6°</span>
    </div>`

  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
showForecast();