const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let htmlds18;

const waardeVeranderenStats = function(object){
  htmlds18.innerHTML = '';
  htmlds18.innerHTML = `<p class="js-waarde"> ${object.waarde} °C </p>`;
}

const waardeHistoriek = function(object){
  htmlds18.innerHTML += `<p class="js-waarde"> ${object.waarde} °C </p>`;
  let lengte = htmlds18.querySelectorAll('.js-waarde');
  let x = lengte.length;
  if (x >= 10){
    htmlds18.innerHTML = '';
    htmlds18.innerHTML += `<p class="js-waarde"> ${object.waarde} °C </p>`;
  }
}


const listenToSocket = function () {
    socket.on("connected", function () {
      console.log("verbonden met socket webserver");
    });
    socket.on("B2F_waarde_device", function (jsonObject) {
        console.log("Dit is de Waarde");
        console.log(jsonObject);
        waardeVeranderenStats(jsonObject);
        // htmlds18.innerHTML = `<p class="js-waarde"> ${jsonObject.waarde} °C </p>`;
        // let lengte = htmlds18.querySelectorAll('.js-waarde');
        // let x = lengte.length;
        // if (x >= 10){
        //   htmlds18.innerHTML = '';
        //   htmlds18.innerHTML = `<p class="js-waarde"> <img src="img/thermometer.svg" alt=""> ${jsonObject.waarde} °C </p>`;
        // }
    });
}



//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
    console.log('DOM geladen');
    // Get some DOM, we created empty earlier.

    htmlds18 = document.querySelector('.js-dataTemp');
    console.log(htmlds18);
    //deze code wordt gestart vanaf index.html
    
    if(htmlds18){
      listenToSocket();
    }
  };
  
  document.addEventListener('DOMContentLoaded', init);
  //#endregion