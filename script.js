const ApiKey = "95ee8ba375dc016ad01f9e4290a81a34";

const WeatherdataEl = document.getElementById("Weather-data")

const cityinputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event)=>{
          event.preventDefault();
          const cityVAlue = cityinputEl.value;
          getweatherData(cityVAlue);

});

async function getweatherData(cityVAlue){
          try {
                    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityVAlue}&appid=${ApiKey}&units=metric`)
                    
                    if(!response.ok){
                              throw new Error("Network response was not ok")
                    }

                    const data = await response.json()

                    const temprature = Math.round(data.main.temp)

                    const discprition = data.weather[0].discprition

                    const icon = data.weather[0].icon

                    const details = [
                              `Feels like: ${Math.round(data.main.feels_like)}`,
                              `Humidity: ${data.main.humidity}%`,
                              `Wind speed: ${data.wind.speed} m/s`,
                    ]

                    WeatherdataEl.querySelector(".icon").innerHTML =` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="Weather icon">`

                    WeatherdataEl.querySelector(".temperature").textContent = `${temprature}°C`;

                    WeatherdataEl.querySelector(".discription").textContent = discprition;

                    WeatherdataEl.querySelector(".details").innerHTML = details.map(
                              (detail) => `<div>${detail}</div>`
                    ).join("");
          } catch (error) {
                    WeatherdataEl.querySelector(".icon").innerHTML ="";
                    WeatherdataEl.querySelector(".temperature").textContent ="";

                    WeatherdataEl.querySelector(".discription").textContent = "An error happened try again ";

                    WeatherdataEl.querySelector(".details").innerHTML = "";
          }
}