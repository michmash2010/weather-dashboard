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
var rightColumnBottomEl = document.querySelector("#bottom-of-right-column");

var formSubmitHandler = function(event) {
    //prevent page from refereshing
    event.preventDefault();

    // get value from input element
    var searchCity = cityInputEl.value.trim();
    console.log(searchCity);

    if(searchCity) {
        console.log("inside if");
        getWeatherData(searchCity);

        // add the new city as a button
        createCityButtons(searchCity);
        
        // clear old content
        cityInputEl.textContent = "";
        cityInputEl.value = "";      
        
        // remove pre-existing cards
        var rightColumnBottomEl = document.querySelector("#bottom-of-right-column");

        while (rightColumnBottomEl.hasChildNodes()) {
            rightColumnBottomEl.removeChild(rightColumnBottomEl.firstChild);
            console.log("REMOVING PRE-EXISTING CARDS?");
        }

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
                        // add the selected city to h2
                        cityDateHeadingEl.textContent = searchCity;
                        // add the date to h2
                        cityDateHeadingEl.textContent += " " + today;
                        // create the icon on h2
                        console.log(data.weather[0].icon);
                        var iconEl = document.createElement("span");
                        iconEl.innerHTML = 
                            `<img src="http://openweathermap.org/img/wn/` + data.weather[0].icon + `.png" />`;
                            //`<img src="http://openweathermap.org/img/wn/01n.png" />`;
                        cityDateHeadingEl.appendChild(iconEl);
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
                        // call the getFiveDayForecast function
                        getFiveDayForecast(searchCity);
                    });
            } else {
                alert("Error: City Not Found" + response.statusTest);
            }
        });
};

var getFiveDayForecast = function(searchCity) {
    console.log("made it to getFiveDayForecast function");
    // api call to OpenWeather API
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&units=imperial&appid=285b993a17ae7fb8fb9d5126a5cb88f5";

    fetch(apiUrl)
        .then(function(response) {
            if (response.ok) {
                response.json()
                    .then(function(data) {
                        console.log("inside fetch response");
                        console.log(data);
                        // display tomorrow Temp
                        console.log(data.main.temp);
                        todayTempEl.textContent = data.main.temp + "°F";
                        ///////////////////////////////////////////////////////////////////////////
                        console.log("lat = " + data.coord.lat);
                        var lat = data.coord.lat;
                        console.log("lon = " + data.coord.lon);
                        var lon = data.coord.lon;
                        ///////////////////////////////////////////////////////////////////////////
                        var apiUrl2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=285b993a17ae7fb8fb9d5126a5cb88f5&exclude=hourly&appid=285b993a17ae7fb8fb9d5126a5cb88f5";

                        fetch(apiUrl2)
                            .then(function(response) {
                                if (response.ok) {
                                    response.json()
                                        .then(function(data) {
                                            console.log("inside fetch response 2");
                                            console.log(data);


                                            
                                            // loop through the fetched array to get date, temp, wind, humidity for each of 5 days, building the page
                                            for(i = 1; i < 6; i++) {
                                                
                                                var date = new Date(data.daily[i].dt * 1000);
                                                
                                                // translate date into short date format
                                                var dd = String(date.getDate()).padStart(2, '0');
                                                var mm = String(date.getMonth() + 1).padStart(2, '0'); 
                                                var yyyy = date.getFullYear();
                                                var date = mm + "/" + dd + "/" + yyyy;
                                                console.log("after date operations, date = " + date);

                                                var icon = data.daily[i].weather[0].icon;
                                                console.log("icon: " + icon);
                                                var temp = data.daily[i].temp.day;
                                                console.log("Temp: " + temp);
                                                var wind = data.daily[i].wind_speed;
                                                console.log("Wind: " + wind);
                                                var humidity = data.daily[i].humidity;
                                                console.log("Humidity: " + humidity);

                                                // create 5-Day Forcast card
                                                var cardEl = document.createElement("div");
                                                cardEl.setAttribute("class", "cards p-2 flex-fill bd-highlight");
                                                cardEl.setAttribute("id", ("card" + i));
                                                
                                                
                                                rightColumnBottomEl.appendChild(cardEl);

                                                // add elements to 5-Day Forecast cards
                                                //create an h4 element for the date
                                                var dateEl = document.createElement("h4");
                                                dateEl.innerHTML = date;
                                                var card = document.querySelector("#card" + i);
                                                card.appendChild(dateEl);

                                                //create a p element for the icon
                                                var pEl = document.createElement("p");
                                                var iconEl = document.createElement("span");
                                                iconEl.innerHTML = 
                                                    `<img src="http://openweathermap.org/img/wn/` + icon + `.png" />`;
                                                document.querySelector("#card" + i).appendChild(pEl);
                                                document.querySelector("#card" + i).appendChild(iconEl);

                                                //create a p element for the temperature
                                                var pEl = document.createElement("p");
                                                pEl.innerHTML = ("Temp: " + temp + " °F");
                                                document.querySelector("#card" + i).appendChild(pEl);

                                                //create a p element for the wind
                                                var pEl = document.createElement("p");
                                                pEl.innerHTML = ("Wind: " + wind + " MPH");
                                                document.querySelector("#card" + i).appendChild(pEl);

                                                //create a p element for the humidity
                                                var pEl = document.createElement("p");
                                                pEl.innerHTML = ("Humidity: " + humidity + " %");
                                                document.querySelector("#card" + i).appendChild(pEl);

                                            }

                                        })
                                }
                            })
                    })
            }
        })
};

// add event listener to form
cityFormEl.addEventListener("submit", formSubmitHandler);

// call the functions
//getShortDate(today);


