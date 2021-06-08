const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let htmlSwitch, htmlds18, htmlLdr, htmlRain, htmlFilling, htmlPaw, htmlPawShade, htmlRed, 
htmlRedShade, htmlRedSmall, htmlRedShadeSmall, htmlTable;

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


const listenToSocketWeather = function () {
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

const listenToSocketCats = function(){
  socket.on("B2F_katten", function(jsonObject){
    console.log(jsonObject);
    rows = document.querySelector('.js-katten');
    rows.innerHTML = '';
    for (const kat of jsonObject.katten){
      Status = kat.Status;
      if(Status == 1){
        Locatie = 'Outside';
      }else{
        Locatie = 'Inside';
      };
      rows.innerHTML += `
      <li class="js-table-row table-row" >
        <div class=" col col-1">
            <a class="js-delete c-delete" href="#" data-id="${kat.KatID}">
                <svg class="c-__delete-symbol" height="20pt" viewBox="0 0 329.26933 329"
                    width="15pt">
                    <path
                        d="m194.800781 164.769531 128.210938-128.214843c8.34375-8.339844 8.34375-21.824219 0-30.164063-8.339844-8.339844-21.824219-8.339844-30.164063 0l-128.214844 128.214844-128.210937-128.214844c-8.34375-8.339844-21.824219-8.339844-30.164063 0-8.34375 8.339844-8.34375 21.824219 0 30.164063l128.210938 128.214843-128.210938 128.214844c-8.34375 8.339844-8.34375 21.824219 0 30.164063 4.15625 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921875-2.089844 15.082031-6.25l128.210937-128.214844 128.214844 128.214844c4.160156 4.160156 9.621094 6.25 15.082032 6.25 5.460937 0 10.921874-2.089844 15.082031-6.25 8.34375-8.339844 8.34375-21.824219 0-30.164063zm0 0" />
                </svg>
            </a>
        </div>
        <div class="col col-2">${kat.Naam}</div>
        <div class="col col-4">${Locatie}</div>
      </li>`;
    } 
    listenToClickDelete();
  })
}

const listenToSocket = function(){
  socket.on("connected", function () {
    console.log("verbonden met socket webserver");
  });
  socket.on("B2F_verandering_magnet", function (jsonObject) {
    // console.log(`waarde: ${jsonObject}`);
    const knop = htmlSwitch
    knop.dataset.status = jsonObject.status;

    if (jsonObject.status == 5) {
      // console.log("De status van het slot is veranderd");
      htmlSwitch.innerHTML = "Close";
      LockOff();
    }else{
      // console.log("De status van het slot is veranderd");
      LockOn();
      htmlSwitch.innerHTML = "Open";
    };
  }); 
}


const listenToClickHatch = function(){
  htmlSwitch.addEventListener("click", function () {
    let newstate;
    let waarde;
    // console.log(this.dataset.status);

    if (this.dataset.status == 4){
      // LockOff();
      // htmlSwitch.innerHTML = "Close";
      this.dataset.status = 5;
      newstate = 5;
      waarde = 0;
      console.log("open");
    }
    else{
      // LockOn();
      // htmlSwitch.innerHTML = "Open";
      this.dataset.status = 4;
      newstate = 4;
      waarde = 1;
      console.log("closed");

    };
    socket.emit("F2B_switch", {new_status: newstate, new_waarde: waarde});
    
  });

}

const listenToClickDelete = function(){
  const buttons = document.querySelectorAll('.js-delete');
  for (const btn of buttons){
    btn.addEventListener("click", function (){
      let id = btn.getAttribute('data-id');
      console.log(id);
      socket.emit("F2B_delete_cat", {katid: id});
    })
  }
}

const listenToClickAdd = function(){
  const btn = document.querySelector('.js-submit');
  btn.addEventListener("click", function(){
    let name = document.querySelector('.js-name').value;
    let rfid = document.querySelector('.js-rfid').value;
    let state = document.querySelector('.js-status').value;
    socket.emit("F2B_add_cat", {naam: name, rfidN: rfid, status: state});
  })
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
    // cats
    htmlTable = document.querySelector('.js-table')
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
      listenToSocket();
    }
    if(htmlTable){
      listenToSocketCats();
    }
    if(document.querySelector('.js-submit')){
      listenToClickAdd();
    }
    if(htmlds18){
      console.log(htmlds18)
      listenToSocketWeather();
    }

  };
  
  document.addEventListener('DOMContentLoaded', init);
  //#endregion