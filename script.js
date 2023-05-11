var APIKey = "d6667d63c8e1e6fc96cb41dfaaea5edd"
//Select search button
var cityForm = document.getElementById("city-form")
function getLatLon(city){
    var geoURL = "http://api.openweathermap.org/geo/1.0/direct?q="+ city +"&limit=5&appid="+ APIKey
    fetch(geoURL).then(function(response){
        console.log(response)
        return response.json()
    }) .then(function(data){
        console.log(data)
        getWeather(data[0].lat,data[0].lon)
    })
}
function getWeather(lat,lon){ 
    var weatherURL = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(weatherURL).then(function (response) {
        console.log(response)
        return response.json()
    }).then(function (data) {
        console.log(data)
        var card = $("<div>").addClass("card")
        var cardTitle = $("<h2>").addClass("card-title").text(data.name)
        $("#current").append(card.append(cardTitle))
    }) 
    getForecast(lat,lon)
}
function getForecast(lat, lon) {
    var forecastURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`
    fetch(forecastURL).then(function (response) {
        console.log(response)
        return response.json()
    }).then(function (data) {
        console.log(data)
        var forecastArray = []
        for(var i=0; i<data.list.length; i++){
            var targetTime = data.list[i].dt_txt.split(" ").pop()
            console.log(targetTime)
            if(targetTime==="12:00:00"){
                forecastArray.push(data.list[i])
            }
        }
       console.log(forecastArray) 
    })
}
//Add click to search button
cityForm.addEventListener("submit", function(event){
    event.preventDefault()
    console.log(event)
    var city = document.getElementById("city-input").value
    getLatLon(city)
}) 
//Get city name on click
//Get weather with city name
