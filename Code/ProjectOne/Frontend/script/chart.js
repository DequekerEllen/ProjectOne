const data = function(){
    window.onload = function(){
      socket.emit("F2B_data");
    } 
}

const ListenToSocketData = function(){
    console.log();

    var xValues = ["Italy", "France", "Spain"];
    var yValues = [55, 49, 44];
    var barColors = ["red", "green","blue"];

    new Chart("myChart", {
    type: "bar",
    data: {
        labels: xValues,
        datasets: [{
        backgroundColor: barColors,
        data: yValues
        }]
    },
    options: {
        legend: {display: false},
        title: {
        display: true,
        text: "Times your cats have passed through"
        }
    }
    });
}

data();
ListenToSocketData();