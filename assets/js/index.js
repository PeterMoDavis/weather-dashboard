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
      let temp = response.main.temp;
      let humidity = response.main.humidity;
      let windSpeed = response.wind.speed;
      console.log(temp, humidity, windSpeed);
    });
}
//let search begin on button click
button.on("click", (e) => {
  e.preventDefault();
  let city = input.val();
  getWeather(city);
});
