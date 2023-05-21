// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
const searchBox = document.querySelector(".search-box");
const searchBtn = document.querySelector(".searchBtn");
const inputSearch = document.querySelector(".inputSearch");
const errorBox = document.querySelector(".error");
const errorMsg = document.querySelector(".erro-msg");
const weatherBox = document.querySelector(".weather-box");
const weatherImg = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const tempDisp = document.querySelector(".temp-disp");
const humidity = document.querySelector(".hum-text");
const wind = document.querySelector(".wind-text");

const getWeather = async function (city) {
  try {
    const apiKey = "13302b747a039d3b004e879b3c715337";
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    );
    if (!res.ok) {
      throw new Error("City or Country Not Found");
    }
    const data = await res.json();
    console.log(data);

    weatherBox.style.display = "block";
    errorBox.style.display = "none";

    weatherImg.setAttribute("src", `./src/img/${data.weather[0].main}.png`);
    temperature.innerHTML = `${Math.round(data.main.temp - 273.15)} °C`;
    tempDisp.innerHTML = data.weather[0].description;
    humidity.innerHTML = `${data.main.humidity} %`;
    wind.innerHTML = `${data.wind.speed} km/h`;
  } catch (err) {
    errorBox.style.display = "flex";
    errorMsg.innerHTML = `${err.message}`;
    weatherBox.style.display = "none";
    console.error(err);
  }
};

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  const city = inputSearch.value;
  getWeather(city);
});
