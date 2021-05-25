const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let htmlds18;

const listenToSocket = function () {
    socket.on("connected", function () {
      console.log("verbonden met socket webserver");
    });
    socket.on("B2F_waarde_device", function (jsonObject) {
        console.log("Dit is de Waarde");
        console.log(jsonObject);
      });
}

//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
    console.log('DOM geladen')
    // Get some DOM, we created empty earlier.
    htmlds18 = document.querySelector('.js-data');
    console.log(htmlds18);
    listenToSocket();
    //deze code wordt gestart vanaf index.html
  };
  
  document.addEventListener('DOMContentLoaded', init);
  //#endregion