function searchInput(event){
  event.preventDefault();
    let userInput = document.querySelector("#search-form-input");
    let cityElement = document.querySelector("#cityElement");
    cityElement.innerHTML = userInput.value;
}


let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchInput);