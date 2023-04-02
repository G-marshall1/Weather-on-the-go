var apiKey = "4ce3c2e7893f384091af8f6cd9bd9fec";
var searchHistory = []
var lastCitySearched = ""
var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var cityEl = document.querySelector("#city-name");
var currentTempEl = document.querySelector("#temperature");
var currentWindEl = document.querySelector("#wind-speed");
var currentHumidityEl = document.querySelector("#humidity");
var currentUVEl = document.querySelector("#uv-index");
var clearHistoryEl = document.querySelector("#clear-history");


var getWeather = function(city) {
    // format the weather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
    // make a request to the url
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                displayWeather(data, city);
            });
        } else {
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error) {
        alert("Unable to connect to OpenWeather");
    })
};

var searchSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var city = cityInputEl.value.trim();
    if (city) {
        getWeather(city);
        cityInputEl.value = "";
    } else {
        alert("Please enter a city");
    }
};

var displayWeather = function(weather, searchCity) {
    // clear old content
    cityEl.textContent = "";
    currentTempEl.textContent = "";
    currentWindEl.textContent = "";
    currentHumidityEl.textContent = "";
    currentUVEl.textContent = "";

    // add new content
    var cityName = weather.name;
    var currentDate = dayjs(weather.dt.value).format("M/D/YYYY");
    var currentTemp = weather.main.temp;
    var currentWind = weather.wind.speed;
    var currentHumidity = weather.main.humidity;
    var currentUV = weather.coord.lat;

    cityEl.textContent = cityName + " (" + currentDate + ") ";
    currentTempEl.textContent = "Temperature: " + currentTemp + " °F";
    currentWindEl.textContent = "Wind Speed: " + currentWind + " MPH";
    currentHumidityEl.textContent = "Humidity: " + currentHumidity + "%";
    currentUVEl.textContent = "UV Index: " + currentUV;

    // save search history
    searchHistory.push(searchCity)
    localStorage.setItem("search", JSON.stringify(searchHistory));
    lastCitySearched = searchCity
    localStorage.setItem("last city", lastCitySearched);
}

var loadLastCity = function() {
    // get last city searched from local storage
    lastCitySearched = localStorage.getItem("last city");
    if (lastCitySearched) {
        getWeather(lastCitySearched);
    }
}

var loadSearchHistory = function() {
    // get search history from local storage
    searchHistory = JSON.parse(localStorage.getItem("search"));
    if (searchHistory) {
        searchHistory.forEach(function(city) {
            getWeather(city);
        })
    }
}

var clearHistory = function() {
    localStorage.clear();
    location.reload();
}

// add event listeners to form and clear button
searchFormEl.addEventListener("submit", searchSubmitHandler);
clearHistoryEl.addEventListener("click", clearHistory);

loadLastCity();
loadSearchHistory();








