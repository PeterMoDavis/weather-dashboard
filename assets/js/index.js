// acct key : a6d51def84a4c7a5cfb3387c9243b441
let input = $("input");
let button = $("button");
//get weather by city
function getWeather(c) {
  let apiAddress = `https://api.openweathermap.org/data/2.5/weather?q=${c}&units=imperial&appid=a6d51def84a4c7a5cfb3387c9243b441`;
  fetch(apiAddress)
    .then((blob) => {
      return blob.json();
    })
    .then((response) => {
      console.log(response);
      let lat = response.coord.lat;
      let lon = response.coord.lon;

      console.log(lon, lat);
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=a6d51def84a4c7a5cfb3387c9243b441`
      )
        .then((blob) => {
          return blob.json();
        })
        .then((response) => {
          console.log(response);
          let temperature = response.current.temp;
          let humidity = response.current.humidity;
          let windSpeed = response.current.wind_speed;
          let UVIndex = response.current.uvi;
          let icon = response.current.weather[0].icon;
          console.log(
            "temp: " +
              temperature +
              " humidity: " +
              humidity +
              " Wind Speed " +
              windSpeed +
              " Uv Index " +
              UVIndex +
              " icon " +
              icon
          );
        });
    });
}
//let search begin on button click
button.on("click", (e) => {
  e.preventDefault();
  let city = input.val();
  getWeather(city);
});
