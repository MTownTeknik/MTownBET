var interval = setInterval(crasher, 10);
var stop = false
var randomNum;
var fcnt = 0; //function time
var xPos = 0;
var yPos = 400;
var multiplier = 1.00;

randomNum = Math.floor((Math.random() * 200) + fcnt);
console.log(fcnt + " " + randomNum);

function crashCounter() {

  var i;

  for (i = 0; stop == false; i++) {
    multiplier = multiplier + 0.01;
    multiplier = Math.round(multiplier * 100) / 100;
    console.log(multiplier);
  }

}

function crasher() {
  fcnt++;
  var i;

  if (stop == false) {
    multiplier = multiplier + 0.01;
    console.log(multiplier);
  }

  if (fcnt >= randomNum) {
    stop = true;
    clearInterval(interval);
    //return 1;
  }
  graph();
}

function graph() {
  var ctx = document.getElementById("canv").getContext("2d");

  if (stop == false) {
    ctx.fillRect(xPos, yPos, 5, 5);
    xPos += 1;
    yPos -= 1;
  } else if (stop == true) {
    ctx.fillRect(xPos, yPos, 5, 1000);
  }


  ctx.fillStyle = "#232c31";
  ctx.fillRect(0, 10, 200, 50);

  ctx.font = "30px Arial";
  ctx.fillStyle = "#FFF"
  ctx.fillText(multiplier + "X", 10, 50);
}

function clean() { //clears the canvas
  var ctx = document.getElementById("canv").getContext("2d");

  ctx.clearRect(0, 0, 480, 400);
}