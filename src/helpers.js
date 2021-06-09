const kelvinToFarenheit = (kelvin) => Math.round(((parseFloat(kelvin) - 273.15) * 1.8) + 32);
const kelvinToCelsius = (kelvin) => Math.round(parseFloat(kelvin) - 273.15);

export { kelvinToFarenheit, kelvinToCelsius };