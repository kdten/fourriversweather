// Openweathermap API. Do not share it publicly.
const api = "1f5dd9456ba9213876292754165e9241"; //Replace with your API

const iconImg = document.getElementById("weather-icon");
const iconImgForecast = document.getElementById("weather-icon-fc");
const loc = document.querySelector("#location");
const feelsL = document.querySelector(".fl");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".desc");
const sunriseDOM = document.querySelector(".sunrise");
const sunsetDOM = document.querySelector(".sunset");

const lowTempHTML = document.querySelector(".low-temp");
const highTempHTML = document.querySelector(".high-temp");

window.addEventListener("load", () => {
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

      
      const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${api}&units=metric&exclude=minutely`;
      const geocodingURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${api}`;
      //  *********************** ADDD PROMISE TO HANDLE MULTIPLE APIS *******************
      Promise.all([
        fetch(geocodingURL),
        fetch(weatherURL),
      ])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then(function (data) {
          const cityName = data[0][0].name;
          //weather portion
          console.log(data[1]);
          const { temp, feels_like } = data[1].current;
          const { min, max } = data[1].daily[0].temp;

          const { description, icon } = data[1].current.weather[0];
          //const { sunrise, sunset } = data[1].sys;
          // const for forecast
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const iconFcUrl = `http://openweathermap.org/img/wn/${icon}.png`;
          const mainTemp = (temp * 9) / 5 + 32;
          const feelsLikeF = (feels_like * 9) / 5 + 32;
          const lowTempToday = (min * 9) / 5 + 32;
          const highTempToday = (max * 9) / 5 + 32;
          // Converting Epoch(Unix) time to GMT
          // const sunriseGMT = new Date(sunrise * 1000);
          // const sunsetGMT = new Date(sunset * 1000);

          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          iconImgForecast.src = iconFcUrl;
          loc.textContent = `${cityName}`;
          desc.textContent = `${description}`;
          feelsL.textContent = `${feelsLikeF.toFixed(0)} °F`;
          tempF.textContent = `${mainTemp.toFixed(0)} °F`;
          // sunriseDOM.textContent = `${sunriseGMT.toLocaleDateString()}, ${sunriseGMT.toLocaleTimeString()}`;
          // sunsetDOM.textContent = `${sunsetGMT.toLocaleDateString()}, ${sunsetGMT.toLocaleTimeString()}`;
          //string for
          lowTempHTML.textContent = `${lowTempToday.toFixed(0)} °F`;
          highTempHTML.textContent = `${highTempToday.toFixed(0)} °F`;
        


          document.getElementById('.media-scroller').innerHTML = data[1].daily.map(user => 
            `<div class="media-element">
            <img class="icon-sm" src="" alt="" srcset="" id="weather-icon" />
            <div class="date">Today</div>
            <div class="low-temp">75&deg;F </div>
            <div class="high-temp">${data[1].daily[0].temp.max}&deg;F</div>
          </div>`
        ).join('')
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        });





      //const geocodingURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${api}`;
      let cityName;
      // Using fetch to get city data
      fetch(geocodingURL)
      
      .then((response) => {
        return response.json();
      });




      //****************************************************************************************** */
      fetch(weatherURL)
        .then((data) => {
          
        });
    });
  }
});
