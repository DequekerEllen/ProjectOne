const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

// ******* Html Data *******
let htmlSwitch, htmlds18, htmlLdr, htmlRain, htmlFilling, htmlPaw, htmlPawShade, htmlRed, 
htmlRedShade, htmlRedSmall, htmlRedShadeSmall, htmlTable;

// ******* Classlist *******
const clearClassList = function (el, klasse) {
  el.classList.remove(`${klasse}`);
};
const addClassList = function (el, klasse) {
  el.classList.add(`${klasse}`);
};

// ******* House svg colors control *******
const hatchCloseSvg = function(el){
  el.classList.add("filling_off")
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

// ******* Change values data *******
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

// ******* Listen To Socket *******
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
                <svg class="c-__delete-symbol"  viewBox="0 0 512 512"  xmlns="http://www.w3.org/2000/svg">
                  <path d="m256 512c-141.160156 0-256-114.839844-256-256s114.839844-256 256-256 256 114.839844 256 256-114.839844 256-256 256zm0-475.429688c-120.992188 0-219.429688 98.4375-219.429688 219.429688s98.4375 219.429688 219.429688 219.429688 219.429688-98.4375 219.429688-219.429688-98.4375-219.429688-219.429688-219.429688zm0 0"/><path d="m347.429688 365.714844c-4.679688 0-9.359376-1.785156-12.929688-5.359375l-182.855469-182.855469c-7.144531-7.144531-7.144531-18.714844 0-25.855469 7.140625-7.140625 18.714844-7.144531 25.855469 0l182.855469 182.855469c7.144531 7.144531 7.144531 18.714844 0 25.855469-3.570313 3.574219-8.246094 5.359375-12.925781 5.359375zm0 0"/><path d="m164.570312 365.714844c-4.679687 0-9.355468-1.785156-12.925781-5.359375-7.144531-7.140625-7.144531-18.714844 0-25.855469l182.855469-182.855469c7.144531-7.144531 18.714844-7.144531 25.855469 0 7.140625 7.140625 7.144531 18.714844 0 25.855469l-182.855469 182.855469c-3.570312 3.574219-8.25 5.359375-12.929688 5.359375zm0 0"/>
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
    listenToClickHatch();
  }); 
}

// ******* Listen To Click *******
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

const listenToSocketId = function(){
  socket.on("B2F_id", function(jsonObject){
    console.log(jsonObject.rfid);
    let id = jsonObject.rfid;
    document.querySelector('.js-rfid').value = id;
  })
}

const scan = function(){
  window.onload = function(){
    alert("Scan your rfid tag");
    socket.emit("F2B_scan");
  } 
}

// ******* region ***  Init / DOMContentLoaded *******
const init = function () {
    console.log('DOM geladen');
    // ******* Get some DOM, we created empty earlier. ********
    // ******* sensor data *******
    htmlds18 = document.querySelector('.js-dataTemp');
    htmlLdr = document.querySelector('.js-dataLdr');
    htmlRain = document.querySelector('.js-dataRain');
    // ******* switch knop *******
    htmlSwitch = document.querySelector('.js-switch')
    // ******* cats ********
    htmlTable = document.querySelector('.js-table')
    // ******* house svg fillings on/off *******
    htmlFilling = document.querySelector('.js-filling');
    htmlPaw = document.querySelector('.js-paw');
    htmlPawShade = document.querySelector('.js-paw-shade');
    htmlRed = document.querySelector('.js-red');
    htmlRedShade = document.querySelector('.js-red-shade');
    htmlRedSmall = document.querySelector('.js-red-small');
    htmlRedShadeSmall = document.querySelector('.js-red-shade-small');

    // ******* Code started from '...'.html *******
    if (htmlSwitch){
      console.log(htmlSwitch);
      listenToSocket();
    }
    if(htmlTable){
      listenToSocketCats();
    }
    if(document.querySelector('.js-submit')){
      scan();
      listenToSocketId();
      listenToClickAdd();
    }
    if(htmlds18){
      console.log(htmlds18);
      listenToSocketWeather();
    }

  };
  
  document.addEventListener('DOMContentLoaded', init);
  // ******* endregion *******