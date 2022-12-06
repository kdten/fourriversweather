const form = document.querySelector(".top-banner form");
const input = document.querySelector(".top-banner input");
const msg = document.querySelector(".top-banner .msg");
const list = document.querySelector(".ajax-section .cities");
const apiKey = "1f5dd9456ba9213876292754165e9241";

form.addEventListener("submit", e => {
  e.preventDefault();
  const listItems = list.querySelectorAll(".ajax-section .city");
  const inputVal = input.value;

  //ajax here
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const { main, name, sys, weather } = data;
      const icon = `https://openweathermap.org/img/wn/${
        weather[0]["icon"]
      }@2x.png`;

      const li = document.createElement("li");
      li.classList.add("city");
      const currentMarkup = `
        <h2 class="city-name" data-name="${name},${sys.country}">
          <span>${name}</span>
          <sup>${sys.country}</sup>
        </h2>
        <div class="city-temp">${Math.round((main.temp)*1.8+32)}<sup>°F</sup></div>
        <figure>
          <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
          <figcaption>${weather[0]["description"]}</figcaption>
        </figure>
      `;
      li.innerHTML = currentMarkup;
      list.appendChild(li);
    })
    .catch(() => {
      msg.textContent = "Please enter a valid city";
    });

  msg.textContent = "";
  form.reset();
  input.focus();
});


// Forecast block

{/* <section class="horizontal-scroll">
      <div class="media-scroller">

        <div class="media-element">
          <img class="icon-sm" src="icons/clear-day.svg">
          <span class="date">Today</span>
          <span class="low-temp">81 </span>
          <span class="high-temp">90</span>
        </div>

        <div class="media-element">
          <img class="icon-sm" src="icons/clear-day.svg">
          <span class="date">Today</span>
          <span class="low-temp">81 </span>
          <span class="high-temp">90</span>
        </div>

        <div class="media-element">
          <img class="icon-sm" src="icons/clear-day.svg">
          <span class="date">Today</span>
          <span class="low-temp">81 </span>
          <span class="high-temp">90</span>
        </div>

        <div class="media-element">
          <img class="icon-sm" src="icons/clear-day.svg">
          <span class="date">Today</span>
          <span class="low-temp">81 </span>
          <span class="high-temp">90</span>
        </div>

        <div class="media-element">
          <img class="icon-sm" src="icons/clear-day.svg">
          <span class="date">Today</span>
          <span class="low-temp">81 </span>
          <span class="high-temp">90</span>
        </div>

        <div class="media-element">
          <img class="icon-sm" src="icons/clear-day.svg">
          <span class="date">Today</span>
          <span class="low-temp">81 </span>
          <span class="high-temp">90</span>
        </div>

        <div class="media-element">
          <img class="icon-sm" src="icons/clear-day.svg">
          <span class="date">Today</span>
          <span class="low-temp">81 </span>
          <span class="high-temp">90</span>
        </div>
      </div>
    </section>

    https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}&units=${units}$lang=en&exclude=&{exlude} */}