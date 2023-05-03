//Váriaveis e seleção de elementos

const key = "6a3fc457ef08ce45001c2cf5c07e2891";
const apiUnsplash = "https://source.unsplash.com/1600x900/?";


const cityInput = document.querySelector("#city");
const searchBtn = document.querySelector("#search");

const weatherElement = document.querySelector("#weather-data");
const cityElement = document.querySelector("#find-city");
const temperature = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

//Funções

const getWeatherData = async (city) => {
  const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}&lang=pt_br`;

  const res = await fetch(apiWeatherURL);
  const data = await res.json();

  return data;
};

const showWeatherData = async (city) => {
  const data = await getWeatherData(city);

  cityElement.innerText = data.name;
  temperature.innerText = parseInt(data.main.temp);
  descElement.innerText = data.weather[0].description;
  weatherIconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
  );
  countryElement.setAttribute("src", `https://flagsapi.com/${data.sys.country}/flat/64.png`);
  humidityElement.innerText = `${data.main.humidity}%`;
  windElement.innerText = `${data.wind.speed}km/h`;
  //Aplicando a API Unsplash

  document.body.style.backgroundImage = `url("${apiUnsplash + city}")`;

  weatherElement.classList.remove('hide');
};

//Eventos
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  const city = cityInput.value;

  showWeatherData(city);
});

cityInput.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    const city = e.target.value;

    showWeatherData(city);
  }
});
