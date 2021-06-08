import 'bootstrap';
import './style.scss';
import getOpenweatherApiKey from './openweatherApiKey';
import getMapboxApiKeyKey from './mapboxApiKey';

const openweatherApiKey = getOpenweatherApiKey;


const createRow = (lists) => {
  const list = document.getElementById('list');
  list.textContent = null;
  lists.forEach((l) => {
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(`${l.cityName}, ${l.countryName}`));
    const idNode = document.createElement('span');
    idNode.innerText = l.id;
    idNode.classList.add('d-none');
    li.appendChild(idNode);
    li.addEventListener('click', (e) => citySelected(e));
    list.appendChild(li);
  });
};

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

function getOneDayForecaste(forecast) {
  const tempC = Math.round(parseFloat(forecast.main.temp)-273.15);
  const tempF = Math.round(((parseFloat(forecast.main.temp)-273.15)*1.8)+32); 
  const feelsC = Math.round(parseFloat(forecast.main.feels_like)-273.15);
  const feelsF = Math.round(((parseFloat(forecast.main.feels_like)-273.15)*1.8)+32); 

  document.getElementById('description').innerText = forecast.weather[0].description;
  document.getElementById('temp').innerText = `${tempC}&deg;`;
  document.getElementById('location').innerText = forecast.name;
}

const searchCity = document.getElementById('searchCity');
let currentForecast = '';
let fiveDaysForecast = '';

const createMap = (lat = -31.4135, lon = -64.1811) => {
  document.getElementById('weathermap').innerHTML = "<div id='mapid'></div>";
  const mymap = L.map('mapid').setView([lat, lon], 11);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: getMapboxApiKeyKey,
  }).addTo(mymap);
};

searchCity.addEventListener('click', (e) => {
  e.preventDefault();
  const citySearchBox = document.getElementById('citySearchBox').value;
  if (citySearchBox.length > 2) {
    getWeatherForecast(citySearchBox)
      .then((response) => fetchHandler(response))
      .then((res) => {
        if (res.cod) {
          console.log('There was a problem: ', res.message)
        } else {
          currentForecast = res.json;
          console.log(currentForecast);
          getOneDayForecaste(currentForecast);
          createMap(currentForecast.coord.lat, currentForecast.coord.lon)
          // createRow(result);
        }
      });
    getFiveDaysWeatherForecast(citySearchBox)
      .then((response) => fetchHandler(response))
      .then((res) => {
        if (res.cod) {
          console.log('There was a problem: ', res.message)
        } else {
          fiveDaysForecast = res.json;
          console.log(fiveDaysForecast);
          // createRow(result);
        }
      });
  } else {
    createRow(['Please enter more than 3 characters']);
  }
});

window.onload = () => {
};
