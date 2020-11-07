var searchFormEl = document.querySelector('#search-form');

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var cityInputVal = document.querySelector('#search-input').value;
  var tokenzInputVal = document.querySelector('#tokenz-input').value;

  if (!cityInputVal || !tokenzInputVal) {
    console.error('You need a search input value!');
    return;
  }

  var queryString = 'data/2.5/forecast?q=' + cityInputVal + '&appid=' + tokenzInputVal;

  location.assign(queryString);
}

searchFormEl.addEventListener('submit', handleSearchFormSubmit);