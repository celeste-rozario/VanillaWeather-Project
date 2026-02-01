function updateWeather(response){
    let tempElement = document.querySelector("#temp-value");
    let temperature = response.data.temperature.current;
    tempElement.innherHTML = Math.round(temperature);

}


function searchCity(city){
let apiKey = "9b5e5489a22c2ct5203a0ad09d7f3oab";
let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(updateWeather);
}


function searchInput(event){
  event.preventDefault();
    let userInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#cityElement");
    cityElement.innerHTML = userInput.value;
    searchCity(userInput.value);
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);