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
      let iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
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
          let cardContainer = $(".forecast-container");
          cardContainer.empty();

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
            let h2 = $("h2");
            let forecastTemp = days[i].temp.day;
            let forecastHumidity = days[i].humidity;
            let forecastIcon = days[i].weather[0].icon;
            let outterDiv = $("<div></div>");
            let innerDiv = $("<div></div>");
            let h5 = $("<h5></h5>").addClass("card-title");
            let image = $("<img>");
            let tempParagraph = $("<p></p>");
            let humidityParagraph = $("<p></p>");
            let iconurl =
              "http://openweathermap.org/img/w/" + forecastIcon + ".png";

            h2.css("display", "block");
            outterDiv.attr("class", "card text-white bg-primary");
            innerDiv.attr("class", "card-body m-3");
            outterDiv.append(innerDiv);
            $(".forecast-container").append(outterDiv);
            h5.text(moment().add([i], "day").format("MM/DD/YYYY"));
            image.attr("src", iconurl);
            tempParagraph.text(`Temp: ${forecastTemp} °F`);
            humidityParagraph.text(`Humidity: ${forecastHumidity}%`);
            innerDiv.append(h5, image, tempParagraph, humidityParagraph);
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
