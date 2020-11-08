var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var citiesHistory = document.querySelector('#citiesHistory');
var apiKey = "55636a3718ca098969ff6ef3cac463be";

var cities = [];

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  var city = searchParamsArr[0].split('=').pop();
  searchApi(city);
}

function printResults(resultObj) {

  // set up `<div>` to hold result content
  var resultCard = document.createElement('div');
  resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');

  var resultBody = document.createElement('div');
  resultBody.classList.add('card-body');
  resultCard.append(resultBody);

  var bodyContentEl = document.createElement('p');
  bodyContentEl.innerHTML =
    '<strong>Date:</strong> ' + resultObj.dt_txt + '<br/>';
  bodyContentEl.innerHTML +=
    '<strong>Temperature:</strong> ' + resultObj.main.temp_max + ' °F' +'<br/>';
  bodyContentEl.innerHTML +=
    '<strong>Wind Speed:</strong> ' + resultObj.wind.speed + ' MPH' + '<br/>';
  bodyContentEl.innerHTML +=
    '<strong>Humidity:</strong> ' + resultObj.main.humidity + '%' + '<br/>';
  bodyContentEl.innerHTML +=
    '<img src="http://openweathermap.org/img/wn/' + resultObj.weather[0].icon + '.png" alt="Weather Image">' + '<br/>';  
  resultBody.append(bodyContentEl);

  resultContentEl.append(resultCard);
}

  function searchApi(city) {
  var locQueryUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=imperial`

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
    })
    .then(function (locRes) {
      // write query to page so user knows what they are viewing
  
      let resultLat = locRes.city.coord.lat;
      let resultLon = locRes.city.coord.lon;
      
      if (!locRes.list.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.list.length; i++) {
          printResults(locRes.list[i]);
        }
      }
      data = locRes;

      return fetch(`http://api.openweathermap.org/data/2.5/uvi?lat=${resultLat}&lon=${resultLon}&appid=${apiKey}`);
    }).then(function (response) {
      if (response.ok) {
        return response.json();
      }
    }).then(function (uvData) {
      if (!uvData.value) {
        console.log('No UV found!');
      } else {
        resultTextEl.innerHTML = data.city.name + '<br/>';
        resultTextEl.innerHTML += 'Current UV Index: ' + '<div id="data-UV">' + uvData.value + '</div>';
        cities.push(city)
        city.value = "";
        storeCities();
        renderCities();
        
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  }

function storeCities() {
 localStorage.setItem("Cities", JSON.stringify(cities))
}
function renderCities () {
  citiesHistory.innerHTML = "";
  for (let i = 0; i < cities.length; i++) {
    var citiesList = cities[i];
    var li = document.createElement("li");
    li.innerHTML = '<a href="https://api.openweathermap.org/data/2.5/forecast?q=' + citiesList + '&appid=${apiKey}&units=imperial">' + citiesList + '</a>';
    li.setAttribute("data-index", i);
    citiesHistory.prepend(li);
  }
}

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var cityInputVal = document.querySelector('#search-input').value;
  searchApi(cityInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();