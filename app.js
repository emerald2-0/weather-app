//Service Worker
//check support:
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('sw_pages_cached.js')
      .then(reg => console.log('Service Worker: Registered'))
      .catch(err => console.log(`Error received: {$err}`))
  })
}

//Open Weather Call

function getData() {
  var str = localStorage.getItem("weatherForecast");

  if (str != null) {
    return (arr = JSON.parse(str));
  }
}

function showData() {
  getData();
  console.log(arr);
  var [tempResponse, nameResponse, descResponse, CntrResponse] = arr;

  var name = document.querySelector(".name");
  var desc = document.querySelector(".desc");
  var temp = document.querySelector(".temp");
  var country = document.querySelector(".country");

  name.innerHTML = nameResponse;
  temp.innerHTML = tempResponse;
  desc.innerHTML = descResponse;
  country.innerHTML = CntrResponse;
}

function setData(arr) {
  localStorage.setItem("weatherForecast", JSON.stringify(arr));
  getData();
  showData();
}

var button = document.querySelector(".button");

button.addEventListener("click", function () {
  var uservalue = document.querySelector(".uservalue");
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      uservalue.value +
      "&appid=1c7a6a6e2c64b71e4e305eca93afafac"
  )
    .then((response) => response.json())
    .then((data) => {
      var nameResponse = data["name"];
      var tempResponse = data["main"]["temp"];
      var descResponse = data["weather"][0]["description"];
      var CntrResponse = data["sys"]["country"];

      var arr = [];
      arr.push(nameResponse, tempResponse, descResponse, CntrResponse);

      setData(arr);
    })

    .catch((err) => alert("Wrong City name!"));
});
