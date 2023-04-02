var apiKey = "4ce3c2e7893f384091af8f6cd9bd9fec";
var url = "https://api.forecast.io/forecast/" + apiKey + "/37.8267,-122.423";
var data = $.getJSON(url, function(data) {
  console.log(data);
});





