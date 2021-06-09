import { kelvinToFarenheit, kelvinToCelsius } from './helpers';

export default function weeklyWeatherCard(apiResponse) {
  let weeklyCardsHTML = '';
  const toCelsius = document.getElementById('tempSelector').checked;
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  for (let i = 0; i < 5; i += 1) {
    const weatherData = apiResponse.list[(i * 8) + 4];
    const day = days[new Date(weatherData.dt * 1000).getUTCDay()];
    const tMin = toCelsius ? kelvinToCelsius(weatherData.main.temp_min)
      : kelvinToFarenheit(weatherData.main.temp_min);
    const tMax = toCelsius ? kelvinToCelsius(weatherData.main.temp_max)
      : kelvinToFarenheit(weatherData.main.temp_max);
    const weeklyWeatherCard = '<div class="weakly-weather-item">'
  + '        <div class="upper-day-info d-block d-md-flex justify-content-between">'
  + `          <p class="mb-1"> ${day} </p>`
  + `          <p class="mb-0"> ${weatherData.weather[0].description} </p>`
  + '        </div>'
  + '        <hr class="w-100">'
  + '        <div class="lower-day-info d-flex align-items-center justify-content-around">'
  + `          <img src="http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png" alt="weather icon">`
  + '          <div class="min-max-day-temp d-block">'
  + `            <p class="mb-0"> ${tMax}<sup>&deg;</sup> </p>`
  + `            <p class="mt-2 mb-0"> ${tMin}<sup>&deg;</sup> </p>`
  + '          </div>'
  + '        </div>'
  + '      </div>';
    weeklyCardsHTML += weeklyWeatherCard;
  }
  return weeklyCardsHTML;
}
