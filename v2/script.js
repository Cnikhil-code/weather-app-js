const cityInput = document.getElementById("city");
const searchBtn = document.getElementById("search");
const locationBtn = document.getElementById("location");

const weather = document.querySelector(".weather");
const loading = document.querySelector(".loading");

const weatherIcon = document.querySelector(".weather-icon");
const emojiElement = document.querySelector(".emoji");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const weatherDescription = document.querySelector(".description");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");

const apiKey = "5bca63192a823246c0e59b0512cebbb1";

weather.style.display = "none";

async function getWeather(url) {
  try {
    loading.textContent = "Loading...";
    searchBtn.disabled = true;
    locationBtn.disabled = true;

    const response = await fetch(url);
    const data = await response.json();

    if (data.cod != 200) {
      alert(data.message);
      return;
    }

    const icon = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.alt = data.weather[0].description;

    const weatherType = data.weather[0].main;

    let emoji = "";

    switch (weatherType) {
      case "Clear":
        emoji = "☀️";
        break;

      case "Clouds":
        emoji = "☁️";
        break;

      case "Rain":
        emoji = "🌧️";
        break;

      case "Thunderstorm":
        emoji = "⛈️";
        break;

      case "Snow":
        emoji = "❄️";
        break;

      default:
        emoji = "🌍";
    }

    weather.style.display = "block";

    emojiElement.textContent = emoji;
    cityElement.textContent = data.name;
    tempElement.textContent = `${data.main.temp}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidityElement.textContent = `Humidity: ${data.main.humidity}%`;
    windElement.textContent = `Wind: ${data.wind.speed} m/s`;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.textContent = "";
    searchBtn.disabled = false;
    locationBtn.disabled = false;
  }
}

function searchCity() {
  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  getWeather(url);
}

searchBtn.addEventListener("click", searchCity);

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchCity();
  }
});

locationBtn.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

      getWeather(url);
    },
    () => {
      alert("Location access denied.");
    },
  );
});
