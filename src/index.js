import 'bootstrap';
import "./style.scss";
import getKey from './apiKey';
import countriesJsonList from './json-lists/ISO3166.country.list.json';
import citiesJsonList from './json-lists/city.list.min.json';

const apiKey = getKey;
let citiesNamesList = [];
let countriesNamesList = [];

Object.keys(countriesJsonList[100]).forEach((key) => {
  console.log(key, countriesJsonList[100][key]);
});

Object.keys(citiesJsonList[100]).forEach((key) => {
  console.log(key, citiesJsonList[100][key]);
});

async function citiesData() {
  const citiesNamesArr = [];
  citiesJsonList.forEach((element) => {
    citiesNamesArr.push({
      cityName: element.name,
      isoCountryName: element.country,
      id: element.id,
    });
  });
  return citiesNamesArr;
}

async function countriesData() {
  const countriesNamesArr = [];
  countriesJsonList.forEach((element) => {
    countriesNamesArr.push({ countryName: element.name, countryCode: element['country-code'], isoCountryName: element['alpha-2'] });
  });
  return countriesNamesArr;
}

const citySelected = (e) => {
  console.log(e.target.childNodes[1].innerText)
}

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

function accentsTidy(s) {
  let r = s.toLowerCase();
  const nonAsciis = {
    a: '[àáâãäå]',
    ae: 'æ',
    c: 'ç',
    e: '[èéêë]',
    i: '[ìíîï]',
    n: 'ñ',
    o: '[òóôõö]',
    oe: 'œ',
    u: '[ùúûűü]',
    y: '[ýÿ]',
  };
  for (let i in nonAsciis) {
    r = r.replace(new RegExp(nonAsciis[i], 'g'), i);
  }
  return r;
}

async function addCountryInfo(tempArray) {
  countriesData().then((countriesNamesListFromStorage) => {
    tempArray.forEach((item) => {
      countriesNamesListFromStorage.forEach((countryItem) => {
        if (item.isoCountryName === countryItem.isoCountryName) {
          Object.assign(item, { countryCode: countryItem.countryCode });
          Object.assign(item, { countryName: countryItem.countryName });
        }
      });
    });
  });
  return tempArray;
};

const searchCity = document.getElementById("searchCity");
searchCity.addEventListener('click', (e) => {
  e.preventDefault();
  let tempArray = [];
  const citySearchBox = document.getElementById("citySearchBox").value;
  if (citySearchBox.length > 2) {
    const searchBoxText = accentsTidy(citySearchBox).toLowerCase();
    tempArray = citiesNamesList.filter((city) => accentsTidy(city.cityName).toLowerCase().includes(searchBoxText)
    );
    addCountryInfo(tempArray)
      .then((result) => (tempArray = result))
      .then((result) =>{
        createRow(result);
      });
  } else {
    createRow(["Please enter more than 3 characters"]);
  }
});



const keyword = document.getElementById('keyword');
keyword.addEventListener('keyup', (e) => {
  let tempArray = [];
  console.log(e.target.value);
  if (e.target.value.length > 2) {
    const searchBoxText = accentsTidy(e.target.value).toLowerCase();
    tempArray = citiesNamesList.filter((city) => accentsTidy(city).toLowerCase().includes(searchBoxText)
    );
    console.log(tempArray);

    createRow(tempArray);
  } else {
    createRow(['Please enter more than 3 characters']);
  }
});

window.onload = () => {
  citiesData().then((citiesNamesListFromStorage) => {
    citiesNamesList = citiesNamesListFromStorage;
  });
};
