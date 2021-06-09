import 'bootstrap';
import './style.scss';
import getOpenweatherApiKey from './openweatherApiKey';
import getMapboxApiKeyKey from './mapboxApiKey';
import cityWeatherCard from './cityWeatherCard';
import weeklyWeatherCard from './weeklyWeatherCard';
import { kelvinToFarenheit, kelvinToCelsius } from './helpers';

function fetchHandler(response) {
  if (response.ok) {
    return response.json().then((json) => Promise.resolve({
      json,
      response,
    }))
      .catch(() => Promise.resolve({
        response,
      }));
  }
  return response.json().catch(() => {
    throw new Error(response.statusText);
  });
}

const getWeatherForecast = (citySearchBox) => {
  let url = 'https://api.openweathermap.org/data/2.5/weather?q=';
  url += citySearchBox;
  url += '&appid=';
  url += getOpenweatherApiKey;
  return fetch(url);
};

const getFiveDaysWeatherForecast = (citySearchBox) => {
  let url = 'https://api.openweathermap.org/data/2.5/forecast?q=';
  url += citySearchBox;
  url += '&appid=';
  url += getOpenweatherApiKey;
  return fetch(url);
};

function getOneDayForecast(forecast) {
  const tempC = kelvinToCelsius(forecast.main.temp);
  const tempF = kelvinToFarenheit(forecast.main.temp);
  const feelsC = kelvinToCelsius(forecast.main.feels_like);
  const feelsF = kelvinToFarenheit(forecast.main.feels_like);
  const weatherIcon = `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
  const weatherDesc = forecast.weather[0].description;
  const city = forecast.name;
  const { humidity } = forecast.main;
  const tempSelector = document.getElementById('tempSelector').checked;
  const temp = tempSelector ? tempC : tempF;
  const feelsLike = tempSelector ? feelsC : feelsF;
  return cityWeatherCard({
    temp, feelsLike, weatherIcon, weatherDesc, city, humidity,
  });
}

function getFiveDayForecast(fiveDaysForecast) {
  return weeklyWeatherCard(fiveDaysForecast);
}

const searchCity = document.getElementById('searchCity');
const tooltipText = document.getElementById('searchHelp');
let currentForecast = '';
let fiveDaysForecast = '';

const createMap = (lat = -31.4135, lon = -64.1811) => {
  document.getElementById('weathermap').innerHTML = "<div id='mapid'></div>";
  // eslint-disable-next-line no-undef
  const mymap = L.map('mapid').setView([lat, lon], 11);
  // eslint-disable-next-line no-undef
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: getMapboxApiKeyKey,
  }).addTo(mymap);
};

const citySearchBoxElement = document.getElementById('citySearchBox');
citySearchBoxElement.addEventListener('keyup', (e) => {
  if (e.target.value.length < 2) {
    tooltipText.classList.remove('d-none');
    document.getElementById('searchCity').disabled = true;
  } else if (e.target.value.length === 3) {
    tooltipText.classList.add('d-none');
    document.getElementById('searchCity').disabled = false;
  }
});

function showAlert(alertObj) {
  const alert = `<div class="alert alert-${alertObj.class} alert-dismissible fade show d-flex justify-content-between" role="alert">`
    + `   <strong>${alertObj.message}</strong>`
    + '       <button class="close bg-transparent border-danger " type="button" id="closeAlert" data-dismiss="alert" aria-label="Close">'
    + '           <span class="bg-none" aria-hidden="true">×</span>'
    + '       </button>'
    + '   </div>';

  document.getElementById('alert').innerHTML = alert;
}

searchCity.addEventListener('click', (e) => {
  e.preventDefault();
  const citySearchBox = document.getElementById('citySearchBox').value;
  if (citySearchBox.length > 2) {
    getWeatherForecast(citySearchBox)
      .then((response) => fetchHandler(response))
      .then((res) => {
        if (res.cod) {
          showAlert({ class: 'danger', message: `Problem encountered: ${res.message}` });
        } else {
          currentForecast = res.json;
          document.getElementById('city-weather-card').innerHTML = getOneDayForecast(currentForecast);
          createMap(currentForecast.coord.lat, currentForecast.coord.lon);
        }
      });
    getFiveDaysWeatherForecast(citySearchBox)
      .then((response) => fetchHandler(response))
      .then((res) => {
        fiveDaysForecast = res.json;
        document.getElementById('weekly-weather-card').innerHTML = getFiveDayForecast(fiveDaysForecast);
      });
  }
});

window.onload = () => {
  document.getElementById('searchCity').disabled = true;
};
