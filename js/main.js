async function search(city) {
    var weather = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`
    );
    if (weather.ok && 400 != weather.status) {
      var city = await weather.json();
      displayCurrent(city.location, city.current),
        displayAnother(city.forecast.forecastday);
    }
  }
  document.getElementById("search").addEventListener("keyup", (a) => {
    search(a.target.value);
  });
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  function displayCurrent(a, t) {
    if (null != t) {
      var e = new Date(t.last_updated.replace(" ", "T"));
      var element = `
       <div class="col-md-4">
              <div class="item firstDay">
                <div class="days today d-flex justify-content-between">
                  <p>${days[e.getDay()]}</p>
                  <p>${e.getDate() + " " + monthNames[e.getMonth()]}</p>
                </div>
                <br/>
                <div class="daydetails">
                  <h6>${a.name}</h6>
                  <h1 class="text-white">${
                    t.temp_c
                  }<span class="degree">o</span> C</h1>
                    <img src="https:${t.condition.icon}" alt="" width=90><br/>
                    ${t.condition.text}<br/>
                    <div class="weathericons">
      <span><img src="imgs/icon-umberella.png" alt="">20%</span><span>
      <img src="imgs/icon-wind.png" alt="">18km/h</span><span>
      <img src="imgs/icon-compass.png" alt="">East</span> 
                </div></div>
              </div>
            </div>`;
      document.getElementById("weatherDiv").innerHTML = element;
    }
  }
  function displayAnother(a) {
    var cartona = "";
    for (var e = 1; e < a.length; e++)
      cartona += `
    <div class="col-md-4">
              <div class="item text-center secondDay">
                <div class="days">
                  <p>${days[new Date(a[e].date.replace(" ", "T")).getDay()]}</p>
                </div>
                <br/>
                <br/>
                <div class="daydetails">
                   <img src="https:${a[e].day.condition.icon}" alt="" width=48>
                  <br/>
                  <br/>
                   <h2 class="text-white">${
                     a[e].day.maxtemp_c
                   }<span class="degreemax">o</span> C</h2>
                   <h5 class="text-white">${
                     a[e].day.mintemp_c
                   }<span class="degreemin">o</span> </h5>
                   <br/>
                   <br/>
                   ${a[e].day.condition.text}
                   </div>
              </div>
            </div>`;
    document.getElementById("weatherDiv").innerHTML += cartona;
  }
  search("cairo");
  