var interval = setInterval(crasher, 10);
var stop = false
var randomNum;
var fcnt = 0; //function time
var xPos = 0;
var yPos = 400;
var multiplier = 1.00;
var iteration = 0;

randomNum = Math.floor((Math.random() * 200));

function crasher() {
  iteration++;

  if (stop == false && iteration % 4 == 0) {
    fcnt++;
    multiplier = fcnt/10;//multiplier + 0.01;
//    multiplier = Math.round(multiplier * 100) / 100
  }
  console.log(fcnt + " " + randomNum);

  if (fcnt >= randomNum) {
    stop = true;
    clearInterval(interval);
  }
  graph();
}

function graph() {
  var ctx = document.getElementById("canv").getContext("2d");
  var flooredMultiplier = Math.floor(multiplier);

  if (stop == false) {
    ctx.fillRect(xPos/1.7, yPos - 3, 3, 3);
    xPos += 1;
    yPos -= Math.pow(xPos, 1.1) * 0.0007;
  } else if (stop == true) {
    ctx.fillRect(xPos/1.7, yPos - 3, 3, 1000);
  }

  ctx.fillStyle = "#232c31";
  ctx.fillRect(10, 70, 200, 50);

  ctx.font = "30px Arial";
  ctx.fillStyle = "#FFF"
  ctx.fillText(multiplier + "X", 80, 110);
}
//clearing the canvas
function clean() {
  var ctx = document.getElementById("canv").getContext("2d");

  ctx.clearRect(0, 0, 480, 400);
}

//need to lower odds else we'll go bankrupt