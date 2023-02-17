let area = document.getElementById("area")
area.addEventListener("click", function() {
  area.value = ""
})

let btn = document.getElementById("continue")
btn.addEventListener("click", function() {
  window.location = "./index.html";
})

let showWeather = document.getElementById("showWeather");
showWeather.addEventListener("click", function(){
  
  let container = document.getElementById("container");
  let process = document.getElementById("process");
  
  container.style.display = "none";
  process.style.display = "block";
  
  let areaName = document.getElementById("area").value.replace(" ", "+")
  
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${areaName}&APPID=43d5939ed78fea35f571312a7825b5c2&units=metric`
  
  fetch(url)
  .then((response) => response.json())
  .then((data) => {
    if (!(data["cod"] == 200)){
      alert("City Name isn't Supported!")
      process.style.display = "none";
      container.style.display = "flex";
      return
    }
    
    let city = data["name"];
    let country = data["sys"]["country"];
    let sunriseStamp = data["sys"]["sunrise"];
    let sunsetStamp = data["sys"]["sunset"];
    let sunrise = new Date(sunriseStamp * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    let sunset = new Date(sunsetStamp * 1000).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })
    
    
    let temp = data["main"]["temp"];
    let feels = data["main"]["feels_like"];
    let sky = data["weather"][0]["description"];
    let weatherIcon = `http://openweathermap.org/img/w/${data["weather"][0]["icon"]}.png`
    let humidity = data["main"]["humidity"];
    let wind = data["wind"]["speed"];
    
    document.getElementById("city").innerText = city;
    document.getElementById("country").innerText = country;
    document.getElementById("sunrise").innerText = sunrise;
    document.getElementById("sunset").innerText = sunset;
    
    document.getElementById("weatherIcon").src = weatherIcon;
    document.getElementById("temp").innerText = temp;
    document.getElementById("feels").innerText = feels;
    document.getElementById("humidity").innerText = humidity;
    document.getElementById("wind").innerText = wind;
    
    
    document.getElementById("menuSection").style.display = "none";
    document.getElementById("weatherSection").style.display = "block";
    
  })
})

