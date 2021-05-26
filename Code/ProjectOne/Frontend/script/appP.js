const lanIP = `${window.location.hostname}:5000`;
const socket = io(`http://${lanIP}`);

let htmlds18, modal, btn, span;

const buttonStateCats = function(){
  

  // When the user clicks on the button, open the modal
  btn.onclick = function() {
    modal.style.display = "block";
  }

  // When the user clicks on <span> (x), close the modal
  span.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
}

const listenToSocket = function () {
    socket.on("connected", function () {
      console.log("verbonden met socket webserver");
    });
    socket.on("B2F_waarde_device", function (jsonObject) {
        console.log("Dit is de Waarde");
        console.log(jsonObject);
        htmlds18.innerHTML += `<p class="js-waarde"> ${jsonObject.waarde} °C </p>`;
        let lengte = htmlds18.querySelectorAll('.js-waarde');
        let x = lengte.length;
        if (x >= 10){
          htmlds18.innerHTML = '';
          htmlds18.innerHTML += `<p class="js-waarde"> ${jsonObject.waarde} °C </p>`;
        }
    });
}



//#region ***  Init / DOMContentLoaded                  ***********
const init = function () {
    console.log('DOM geladen');
    // Get some DOM, we created empty earlier.
    // Get the modal
    modal = document.getElementById("myModal");
    // Get the button that opens the modal
    btn = document.getElementById("myBtn");
    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];

    htmlds18 = document.querySelector('.js-data');
    console.log(htmlds18);
    //deze code wordt gestart vanaf index.html
    if(modal){
      buttonStateCats();
    }
    
    if(htmlds18){
      listenToSocket();
    }
  };
  
  document.addEventListener('DOMContentLoaded', init);
  //#endregion