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
      console.log(response);
      //save city to local storage
      let cities = $(JSON.parse(localStorage.getItem("cities"))) || [];
      cities.push(response.name);

      let icon = response.weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
      //add city name
      $(".h3").text(`${response.name} (${moment().format("MM/DD/YYYY")})`);
      $("#icon-image").attr("src", iconurl);
      //empties the ul before looping through storage again
      $("ul").empty();

      //loop through array and list cities-------------------

      cities.each((i) => {
        //create list element
        let li = $(`<li>${cities[i]}</li>`);
        //add bootstrap class
        li.addClass("list-group-item");
        //declare ul
        let ul = $("ul");
        //append li to ul
        ul.append(li);
      });

      //set cities back in local storage
      localStorage.setItem("cities", JSON.stringify(cities));

      //declare lat and lon for second api call
      let lat = response.coord.lat;
      let lon = response.coord.lon;
      //address
      let apiAddress2 = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=a6d51def84a4c7a5cfb3387c9243b441`;
      console.log(lon, lat);
      //api call
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

          console.log(icon);

          //add Temperature to the current block
          $("#temperature").text(`Temperature: ${temperature} °F`);
          $("#humidity").text(`Humidity: ${humidity} %`);
          $("#wind-speed").text(`Wind Speed: ${windSpeed} MPH`);
          $("#uv-index").text(`UV Index: `);
          $("#uv-index-span").text(UVIndex);
          if (UVIndex < 3) {
            $("#uv-index-span").css("background-color", "green");
          } else if (UVIndex > 3 && UVIndex < 6) {
            $("#uv-index-span").css("background-color", "rgb(197, 197, 8)");
          } else {
            $("#uv-index-span").css("background-color", "red");
          }
          //5 Day Forecast
          let days = response.daily;
          for (let i = 1; i <= 5; i++) {
            console.log(days[i].temp.day);
            console.log(days[i].humidity);
            console.log(days[i].weather[0].icon);
          }
        });
    });
}
//let search begin on button click
button.on("click", (e) => {
  e.preventDefault();
  let city = input.val();
  getWeather(city);
});
