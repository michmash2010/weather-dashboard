var cityFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#city-input");
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); 
var yyyy = today.getFullYear();
var today = "(" + mm + "/" + dd + "/" + yyyy + ")";
var cityDateHeadingEl = document.querySelector("#city-date-heading");
var savedCityButtonsEl = document.querySelector("#saved-city-buttons");
var todayTempEl = document.querySelector("#today-temp");
var todayWindEl = document.querySelector("#today-wind");
var todayHumidityEl = document.querySelector("#today-humidity");
var todayFeelsLikeEl = document.querySelector("#today-feels-like");

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
        
        // add the new city as a button
        createCityButtons(searchCity);
        

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
    cityButtonEl.style.color = "black";

    savedCityButtonsEl.appendChild(cityButtonEl);
}

var date = function(today) {
    console.log(today);
    
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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=285b993a17ae7fb8fb9d5126a5cb88f5";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        console.log("inside fetch response");
                        console.log(data);

                        // display Current Temp
                        console.log(data.main.temp);
                        todayTempEl.textContent = data.main.temp + "°F";

                        // display Current Wind Speed
                        console.log(data.wind.speed);
                        todayWindEl.textContent = data.wind.speed + " MPH";
                        
                        // display Current Humidity
                        console.log(data.main.humidity);
                        todayHumidityEl.textContent = data.main.humidity + " %";

                        // display Current Feels-Like Temp
                        console.log(data.main.feels_like);
                        todayFeelsLikeEl.textContent = data.main.feels_like + "°F";

                        // add the selected city to h2
                        cityDateHeadingEl.textContent = searchCity;

                        // add the date to h2
                        cityDateHeadingEl.textContent += " " + today;

                        // create the icon on h2
                        console.log(data.weather[0].icon);
                        var iconEl = document.createElement("span");
                        iconEl.innerHTML = 
                            // `<img src="http://openweathermap.org/img/wn/10d@` + data.weather[0].icon + `.png" />`;
                            `<img src="http://openweathermap.org/img/wn/01n.png" />`;
                        cityDateHeadingEl.appendChild(iconEl);

                        // display Icon
                        //cityDateHeadingEl.innerHTML = "<img src="http://openweathermap.org/img/wn/10d@" + data.weather[0].icon + ".png /></span>";
                        //http://openweathermap.org/img/wn/10d@2x.png
                        //console.log(data[0].coord.id);
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


