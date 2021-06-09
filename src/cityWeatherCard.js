export default function cityWeatherCard(apiResponse) {
  let cityWeatherCard = "<div class=' col-md-6'>";
  cityWeatherCard += "<div class='card'> <span class='icon'><img class='img-fluid'";
  cityWeatherCard += `src='${apiResponse.weatherIcon}' /></span>`;
  cityWeatherCard += "<div class='title'>";
  cityWeatherCard += `<p>${apiResponse.city}</p>`;
  cityWeatherCard += '</div>';
  cityWeatherCard += `<div class='temp'>${apiResponse.temp}<sup>&deg;</sup></div>`;
  cityWeatherCard += "<div class='row'>";
  cityWeatherCard += "<div class='col-4'>";
  cityWeatherCard += "<div class='header'>Expect</div>";
  cityWeatherCard += `<div class='value'>${apiResponse.weatherDesc}</div>`;
  cityWeatherCard += '</div>';
  cityWeatherCard += "<div class='col-4'>";
  cityWeatherCard += "<div class='header'>Feels like</div>";
  cityWeatherCard += `<div class='value'>${apiResponse.feelsLike}<sup>&deg;</sup></div>`;
  cityWeatherCard += '</div>';
  cityWeatherCard += "<div class='col-4'>";
  cityWeatherCard += "<div class='header'>Humidity</div>";
  cityWeatherCard += `<div class='value'>${apiResponse.humidity}%</div>`;
  cityWeatherCard += '</div>';
  cityWeatherCard += '</div>';
  cityWeatherCard += '</div>';
  cityWeatherCard += '</div>';
  return cityWeatherCard;
}