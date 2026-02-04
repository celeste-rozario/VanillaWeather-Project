function updateWeather(response){
    let tempElement = document.querySelector("#temp-value");
    let temperature = response.data.temperature.current;
    let descriptionElement = document.querySelector("#description");
    let descriptionData = response.data.condition.description;
    let humidityElement = document.querySelector("#humidity");
    let humidityData = response.data.temperature.humidity;
    let windSpeedElement = document.querySelector("#wind-speed");
    let windSpeedData = response.data.wind.speed;
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let emoji = document.querySelector("#temp-emoji");

    emoji.innerHTML = `<img src="${response.data.condition.icon_url}" class="temp-emoji" />`;
    time.innerHTML = formatDate(date);
    windSpeedElement.innerHTML = `${windSpeedData}km/hr`;
    humidityElement.innerHTML = `${humidityData}%`;
    cityElement.innerHTML = response.data.city;
    tempElement.innerHTML = Math.round(temperature);
    descriptionElement.innerHTML = descriptionData;

    getForecast(response.data.city);
}

function formatDate(date){
  
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    if (minutes < 10){
        minutes = `0${minutes}`;
    }

    if (hours > 12){
        hours = hours % 12 || 12;
    }

return `${day} ${hours}:${minutes}`;
}


function searchCity(city){
let apiKey = "9b5e5489a22c2ct5203a0ad09d7f3oab";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather);
}

function getForecast(city){
    let apiKey = "9b5e5489a22c2ct5203a0ad09d7f3oab";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios(apiUrl).then(displayForecast);
}

function formatDay(timestamp){
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thurs", "Fri", "Sat"];

    return days[date.getDay()];
}

function displayForecast(response){
let forecastHtml = " ";

response.data.daily.forEach(function(day, index) {
    if (index < 5){
forecastHtml = forecastHtml + ` <div class="weather-forecast-days"> 
<div class="weather-forecast-date"> ${formatDay(day.time)} </div>
<div class="weather-forecast-icon"> 
<img src="${day.condition.icon_url}" />
</div>
<div class="weather-forecast-temp"> 
    <div class="weather-forecast-toptemp"> 
        <strong> ${Math.round(day.temperature.maximum)}℃</strong>
    </div>
   <div class="weather-forecast-bottomtemp"> ${Math.round(day.temperature.minimum)}℃ 
   </div> 
</div>
</div>
`;
}
let forecastElement = document.querySelector("#forecast");
forecastElement.innerHTML = forecastHtml;
});
}


function searchInput(event){
  event.preventDefault();
    let userInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#cityElement");
    searchCity(userInput.value);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);

searchCity("Melbourne");
