const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let htmlds18, htmlLdr, htmlRain, htmlFilling, htmlPaw, htmlPawShade, htmlRed, htmlRedShade;

const clearClassList = function (el, klasse) {
  el.classList.remove(`${klasse}`);
};
const addClassList = function (el, klasse) {
  el.classList.add(`${klasse}`);
};

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
    // sensor data
    htmlds18 = document.querySelector('.js-dataTemp');
    htmlLdr = document.querySelector('.js-dataLdr');
    htmlRain = document.querySelector('.js-dataRain');
    // house svg fillings on/off
    htmlFilling = document.querySelector('.js-filling');
    htmlPaw = document.querySelector('.js-paw');
    htmlPawShade = document.querySelector('.js-paw-shade');
    htmlRed = document.querySelector('.js-red');
    htmlRedShade = document.querySelector('.js-red-shade');
    //console
    console.log(htmlds18);

    //deze code wordt gestart vanaf index.html

    
    if(htmlds18){
      listenToSocket();
    }
  };
  
  document.addEventListener('DOMContentLoaded', init);
  //#endregion