var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
var today = "(" + mm + "/" + dd + "/" + yyyy + ")";
var cityDateHeadingEl = document.querySelector("#city-date-heading");
var savedCityButtonsEl = document.querySelector("#saved-city-buttons");


var formSubmitHandler = function(event) {
    //prevent page from refereshing
    event.preventDefault();

    // get value from input element
    var searchCity = cityInputEl.value.trim();
    console.log(searchCity);

    if(searchCity) {
        console.log("inside if");
        getWeatherData(searchCity);
        
        // clear old content
        cityInputEl.textContent = "";
        createCityButtons(searchCity);
        // add the new city as a button

    } else {
        alert("Please enter a valid city name.");
    }
    console.log(event);   
};

var createCityButtons = function(searchCity) {
    var cityButtonEl = document.createElement("button");
    cityButtonEl.className = "btn";
    cityButtonEl.textContent = searchCity;
    cityButtonEl.style.background = "grey";
    cityButtonEl.style.margin = "15px 0 15px 0";

    savedCityButtonsEl.appendChild(cityButtonEl);
}

var date = function(today) {
    console.log(today);

    cityDateHeadingEl.textContent += today;        

}

var displayTodayForecast = function() {
    console.log("made it to displayTodayForcast()");
}


var displayFiveDayForecast = function() {
    console.log("made it to displayFiveDayForcast()");
}


var getWeatherData = function(searchCity) {
    console.log("made it to getWeatherData function");
    // api call to OpenWeather API
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=285b993a17ae7fb8fb9d5126a5cb88f5";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        console.log("inside fetch response");
                        console.log(data)
                        displayTodayForecast();
                        displayFiveDayForecast();
                    });
            } else {
                alert("Error: City Not Found" + response.statusTest);
            }
        });
};


// add event listener to form
cityFormEl.addEventListener("submit", formSubmitHandler);

// call the functions
date(today);


