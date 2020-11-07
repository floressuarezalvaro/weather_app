var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var searchFormEl = document.querySelector('#search-form');
var apiKey = "55636a3718ca098969ff6ef3cac463be";


function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search.split('&');

  // Get the query and format values
  var city = searchParamsArr[0].split('=').pop();
  console.log(city);

  searchApi(city);
}

function printResults(resultObj) {
  console.log(resultObj);

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
    '<strong>Temperature (Fahrenheit):</strong> ' + resultObj.main.temp_max + '<br/>';
  bodyContentEl.innerHTML +=
    '<strong>Wind Speed (MPH):</strong> ' + resultObj.wind.speed + '<br/>';


  var linkButtonEl = document.createElement('a');
  linkButtonEl.textContent = 'Read More';
  linkButtonEl.setAttribute('href', resultObj.url);
  linkButtonEl.classList.add('btn', 'btn-dark');

  resultBody.append(bodyContentEl, linkButtonEl);

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
      resultTextEl.textContent = locRes.city.name;

      console.log(locRes);

      if (!locRes.list.length) {
        console.log('No results found!');
        resultContentEl.innerHTML = '<h3>No results found, search again!</h3>';
      } else {
        resultContentEl.textContent = '';
        for (var i = 0; i < locRes.list.length; i++) {
          printResults(locRes.list[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
  }

function handleSearchFormSubmit(event) {
  event.preventDefault();
  var cityInputVal = document.querySelector('#search-input').value;

  searchApi(cityInputVal);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);

getParams();