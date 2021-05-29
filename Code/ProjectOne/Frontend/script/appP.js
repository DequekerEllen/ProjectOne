const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let htmlds18, htmlLdr, htmlRain;


const waardeVeranderenStats = function(html, object, value){
  html.innerHTML = '';
  html.innerHTML = `<p class="js-waarde"> ${object.waarde} ${value} </p>`;
}

const waardeHistoriek = function(html, object, value){
  html.innerHTML += `<p class="js-waarde"> ${object.waarde} ${value} </p>`;
  let lengte = html.querySelectorAll('.js-waarde');
  let x = lengte.length;
  if (x >= 10){
    html.innerHTML = '';
    html.innerHTML += `<p class="js-waarde"> ${object.waarde} ${value} </p>`;
  }
}


const listenToSocket = function () {
    socket.on("connected", function () {
      console.log("verbonden met socket webserver");
    });
    socket.on("B2F_waardeTemp_device", function (jsonObject) {
      console.log("Dit is de Waarde");
      console.log(jsonObject);
      waardeVeranderenStats(htmlds18, jsonObject, "°C");
    });
    socket.on("B2F_waardeLicht_device", function (jsonObject) {
      console.log("Dit is de Waarde");
      console.log(jsonObject);
      waardeVeranderenStats(htmlLdr, jsonObject, "%");
    });
    socket.on("B2F_waardeRain_device", function (jsonObject) {
      console.log("Dit is de Waarde");
      console.log(jsonObject);
      waardeVeranderenStats(htmlRain, jsonObject, " ");
    });
}



//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
    console.log('DOM geladen');
    // Get some DOM, we created empty earlier.

    htmlds18 = document.querySelector('.js-dataTemp');
    htmlLdr = document.querySelector('.js-dataLdr');
    htmlRain = document.querySelector('.js-dataRain');
    console.log(htmlds18);
    //deze code wordt gestart vanaf index.html
    
    if(htmlds18){
      listenToSocket();
    }
  };
  
  document.addEventListener('DOMContentLoaded', init);
  //#endregion