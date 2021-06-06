const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let htmlSwitch, htmlds18, htmlLdr, htmlRain, htmlFilling, htmlPaw, htmlPawShade, htmlRed, 
htmlRedShade, htmlRedSmall, htmlRedShadeSmall;

const clearClassList = function (el, klasse) {
  el.classList.remove(`${klasse}`);
};
const addClassList = function (el, klasse) {
  el.classList.add(`${klasse}`);
};

const hatchCloseSvg = function(el){
  el.classList.add("filling_off")
}

const waardeVeranderenStats = function(html, object, value){
  html.innerHTML = '';
  html.innerHTML = `<p class="js-waarde"> ${object.waarde} ${value} </p>`;
}

const waardeHistoriek = function(html, object, value){
  html.innerHTML += `<p class="js-waarde"> ${object.waarde} ${value} </p>`;
  let lengte = html.querySelectorAll('.js-waarde');
  let x = lengte.length;
  if (x >= 10){
    html.innerHTML -= `<p class="js-waarde"></p>`;
    html.innerHTML += `<p class="js-waarde"> ${object.waarde} ${value} </p>`;
  }
}

const LockOff = function(){
  // remove the transparent layers when hatch opens
  clearClassList(htmlFilling, "filling_off");
  clearClassList(htmlPaw, "filling_off");
  clearClassList(htmlPawShade, "filling_off");
  clearClassList(htmlRed, "filling_off");
  clearClassList(htmlRedShade, "filling_off");
  clearClassList(htmlRedSmall, "filling_off");
  clearClassList(htmlRedShadeSmall, "filling_off");

  // add the colors
  addClassList(htmlFilling, "filling_on");
  addClassList(htmlPaw, "paw_on");
  addClassList(htmlPawShade, "paw_shade_on");
  addClassList(htmlRed, "red_on");
  addClassList(htmlRedShade, "red_shade_on");
  addClassList(htmlRedSmall, "red_on");
  addClassList(htmlRedShadeSmall, "red_shade_on");
}

const LockOn = function(){
  // remove the colors
  clearClassList(htmlFilling, "filling_on");
  clearClassList(htmlPaw, "paw_on");
  clearClassList(htmlPawShade, "paw_shade_on");
  clearClassList(htmlRed, "red_on");
  clearClassList(htmlRedShade, "red_shade_on");
  clearClassList(htmlRedSmall, "red_on");
  clearClassList(htmlRedShadeSmall, "red_shade_on");
  // add the transparency
  hatchCloseSvg(htmlFilling);
  hatchCloseSvg(htmlPaw);
  hatchCloseSvg(htmlPawShade);
  hatchCloseSvg(htmlRed);
  hatchCloseSvg(htmlRedShade);
  hatchCloseSvg(htmlRedSmall);
  hatchCloseSvg(htmlRedShadeSmall);
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

    socket.on("B2F_verandering_magnet", function (jsonObject) {
      console.log("De status van het slot is veranderd");
      console.log(`waarde: ${jsonObject}`);
      const knop = htmlSwitch
      knop.dataset.status = jsonObject.status;
  
      if (jsonObject.status == 5) {
            LockOff();
      }else{
        LockOn();
      };
    }); 
}


const listenToClickHatch = function(){
  htmlSwitch.addEventListener("click", function () {
    let newstate;
    let waarde;
    // console.log(this.dataset.status);

    if (this.dataset.status == 4){
      LockOff();
      htmlSwitch.innerHTML = "Close";
      this.dataset.status = 5;
      newstate = 5;
      waarde = 0;
      console.log("open");
    }
    else{
      LockOn();
      htmlSwitch.innerHTML = "Open";
      this.dataset.status = 4;
      newstate = 4;
      waarde = 1;
      console.log("closed");

    };
    socket.emit("F2B_switch", {new_status: newstate, new_waarde: waarde});
    
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
    // switch knop
    htmlSwitch = document.querySelector('.js-switch')
    // house svg fillings on/off
    htmlFilling = document.querySelector('.js-filling');
    htmlPaw = document.querySelector('.js-paw');
    htmlPawShade = document.querySelector('.js-paw-shade');
    htmlRed = document.querySelector('.js-red');
    htmlRedShade = document.querySelector('.js-red-shade');
    htmlRedSmall = document.querySelector('.js-red-small');
    htmlRedShadeSmall = document.querySelector('.js-red-shade-small');

    //deze code wordt gestart vanaf index.html
    if (htmlSwitch){
      console.log(htmlSwitch)
      listenToClickHatch();
    }
    if(htmlds18){
      console.log(htmlds18)
      listenToSocket();
    }

  };
  
  document.addEventListener('DOMContentLoaded', init);
  //#endregion