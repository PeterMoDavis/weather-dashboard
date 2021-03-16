// acct key : a6d51def84a4c7a5cfb3387c9243b441
let input = $("input");
let button = $("button");
//get weather by city
function getWeather(city) {
  let apiAddress1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=a6d51def84a4c7a5cfb3387c9243b441`;

  fetch(apiAddress1)
    .then((blob) => {
      return blob.json();
    })
    .then((response) => {
      //save city to local storage
      let cities = $(JSON.parse(localStorage.getItem("cities"))) || [];
      cities.push(response.name);

      //loop through array and list cities
      $("ul").empty();
      cities.each((i) => {
        let li = $(`<li>${cities[i]}</li>`);
        li.addClass("list-group-item");
        let ul = $("ul");
        ul.append(li);
        console.log(li);
      });
      localStorage.setItem("cities", JSON.stringify(cities));
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      let apiAddress2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=a6d51def84a4c7a5cfb3387c9243b441`;
      console.log(lon, lat);
      fetch(apiAddress2)
        .then((blob) => {
          return blob.json();
        })
        .then((response) => {
          console.log(response);
          //   current weather
          let temperature = response.current.temp;
          let humidity = response.current.humidity;
          let windSpeed = response.current.wind_speed;
          let UVIndex = response.current.uvi;
          //5 Day Forecast
          console.log(
            "temp: " +
              temperature +
              " humidity: " +
              humidity +
              " Wind Speed " +
              windSpeed +
              " Uv Index " +
              UVIndex
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
