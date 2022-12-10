// Openweathermap API. Do not share it publicly.
const api = "1f5dd9456ba9213876292754165e9241"; //Replace with your API

const iconImg = document.getElementById("weather-icon");
const loc = document.querySelector("#location");
const feelsL = document.querySelector(".fl");
const tempF = document.querySelector(".f");
const desc = document.querySelector(".desc");

window.addEventListener("load", () => {
  let long;
  let lat;
  // let lang = 'en';
  // let units = 'imperial';
  // let exclude = 'minutely';

  // Accesing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const weatherURL = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${long}&appid=${api}&units=imperial&exclude=minutely`;
      const geocodingURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${api}`;
      //  *********************** ADDD PROMISE TO HANDLE MULTIPLE APIS *******************
      Promise.all([fetch(geocodingURL), fetch(weatherURL)])
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
          const { temp, feels_like } = data[1].current;
          const dailyArray = data[1].daily;
          const { description, icon } = data[1].current.weather[0];
          //const { sunrise, sunset } = data[1].sys;
          // const for forecast
          const iconUrl = `http://openweathermap.org/img/wn/${icon}@2x.png`;
          const mainTemp = temp;
          const feelsLikeF = feels_like;
          // Converting Epoch(Unix) time to GMT
          // const sunriseGMT = new Date(sunrise * 1000);
          // const sunsetGMT = new Date(sunset * 1000);
          console.log(dailyArray);
          // Interacting with DOM to show data
          iconImg.src = iconUrl;
          loc.textContent = `${cityName}`;
          desc.textContent = `${description}`;
          feelsL.textContent = `${feelsLikeF.toFixed(0)} °F`;
          tempF.textContent = `${mainTemp.toFixed(0)} °F`;

          
          const mediaSc = document.querySelector(".day-scroller");
          for (let i = 0; i < 8; i++) {
            // Create a new date object using the timestamp from the dailyArray object, and a todays date to compare it to
            const date = new Date(dailyArray[i].dt * 1000);
            const todayDate = new Date();
          
            // Get the month and day part from the date object
            const month = date.toLocaleString("default", { month: "short" });
            const day = date.toLocaleString("default", { day: "numeric" });
            const weekday = date.toLocaleString("default", { weekday: "short" });
            const todayMonth = todayDate.toLocaleString("default", { month: "short" });
            const todayDay = todayDate.toLocaleString("default", { day: "numeric" });
          
            // Generate the formatted date string
            const formattedDate = `${month} ${day}`;
            const formattedTodayDate = `${todayMonth} ${todayDay}`;
            // console.log(`${todayMonth} ${todayDay}`);
            // console.log(`${month} ${day}`);

            mediaSc.innerHTML += `<div class="media-element">
            <img class="icon-sm" src="http://openweathermap.org/img/wn/${
              dailyArray[i].weather[0].icon
            }.png" alt="" srcset="" id="weather-icon" />
            <div class="date"><strong>${weekday}</strong> ${formattedDate}</div>
            <div class="low-temp">${dailyArray[i].temp.min.toFixed(0)}°</div>
            <div class="high-temp">${dailyArray[i].temp.max.toFixed(0)}°</div>
          </div>`;
          }
        })
        .catch(function (error) {
          // if there's an error, log it
          console.log(error);
        });

      //const geocodingURL = `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=5&appid=${api}`;
      let cityName;
      // Using fetch to get city data
      fetch(geocodingURL).then((response) => {
        return response.json();
      });

      //****************************************************************************************** */
      fetch(weatherURL).then((data) => {});
    });
  }
});
