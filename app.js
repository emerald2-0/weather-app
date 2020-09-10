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
var button = document.querySelector('.button');
var uservalue = document.querySelector('.uservalue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var country = document.querySelector('.country');

function setData(data){ 
var DataString = Json.stringify(data);
localStorage.setItem("weatherForecast", "DataString") ;
getData();
showData(); }

function getData(){
var str= localStorage.getItem("DataString");
var uiData; 
return (uiData = Json.parse(str)); }

function showData(){
getData();

var [    tempResponse, nameResponse,descResponse, CntrResponse ] = uiData;

return(
name.innerHTML = nameResponse;
  	temp.innerHTML = tempResponse;
  	desc.innerHTML = descResponse;
  	country.innerHTML = CntrResponse;);

}


button.addEventListener('click', function(){
	fetch('https://api.openweathermap.org/data/2.5/weather?q='+uservalue.value+'&appid=1c7a6a6e2c64b71e4e305eca93afafac')
  .then(response => response.json())
  .then(data => {
  	var nameResponse = data['name'];
  	var tempResponse = data['main']['temp'];
  	var descResponse = data['weather'][0]['description'];
  	var CntrResponse = data['sys']['country']

var arr = [ ];
arr.push(nameResponse, tempResponse,  descResponse, CntrResponse) ;

setData(arr);

  	
  })

 .catch(err => alert("Wrong City name!"))
})


 
