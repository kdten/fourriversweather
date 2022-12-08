// Openweathermap API. Do not share it publicly.
const api = '1f5dd9456ba9213876292754165e9241'; //Replace with your API

const iconImg = document.getElementById('weather-icon');
const loc = document.querySelector('#location');
const feelsL = document.querySelector('.fl');
const tempF = document.querySelector('.f');
const desc = document.querySelector('.desc');
const sunriseDOM = document.querySelector('.sunrise');
const sunsetDOM = document.querySelector('.sunset');

const lowTempHTML = document.querySelector('.low-temp');
const highTempHTML = document.querySelector('.high-temp');

window.addEventListener('load', () => {
  let long;
  let lat;
  // let lang = 'en';
  // let units = 'imperial'; 
  // let exclude = 'minutely,alerts';
  // let url = `http://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}&exclude=${exclude}`;

  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;



      const base = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${api}&units=metric&exclude=minutely`;

      // Using fetch to get data
      fetch(base)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          const { temp, feels_like } = data.current;
          const { min, max } = data.daily[0].temp;
          const place = data.name;
          const { description, icon } = data.current.weather[0];
          //const { sunrise, sunset } = data.sys;
          // const for forecast
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const mainTemp = (temp * 9) / 5 + 32;
          const feelsLikeF = (feels_like * 9) / 5 + 32;
          const lowTempToday = (min * 9) / 5 + 32;
          const highTempToday = (max * 9) / 5 + 32;
          // Converting Epoch(Unix) time to GMT
          // const sunriseGMT = new Date(sunrise * 1000);
          // const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${place}`;
          desc.textContent = `${description}`;
          feelsL.textContent = `${feelsLikeF.toFixed(0)} °F`;
          tempF.textContent = `${mainTemp.toFixed(0)} °F`;
          // sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          // sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
          //string for 
          lowTempToday.textContent = `${lowTempToday.toFixed(0)} °F`;
          highTempToday.textContent = `${highTempToday.toFixed(0)} °F`;
        });
    });
  }
});
