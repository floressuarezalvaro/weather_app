var searchFormEl = document.querySelector('#search-form');
var apiKey = "55636a3718ca098969ff6ef3cac463be";

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var cityInputVal = document.querySelector('#search-input').value;
  var queryString = './results.html?q=' + cityInputVal; 
  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);