var interval = setInterval(crasher, 10);
var stop = false
var randomNum;
var fcnt = 0; //function time
var xPos = 0;
var yPos = 400;

randomNum = Math.floor((Math.random() * 200) + fcnt);
console.log(fcnt + " " + randomNum);

function crashCounter() {
  var multiplier = 1.00;
  var i;

  for (i = 0; crasher() != 1; i++) {
    multiplier = multiplier + 0.01;
    console.log(multiplier);
  }

}

function crasher() {
  fcnt++;

  if (fcnt >= randomNum) {
    stop = true;
    clearInterval(interval);
    //return 1;
  }
  graph();
}

function graph() {
  var ctx = document.getElementById("canv").getContext("2d");
  ctx.fillStyle = "#FFF"

  if (stop == false) {
    ctx.fillRect(xPos, yPos, 5, 5);
    xPos += 1;
    yPos -= 1;
  } else if (stop == true) {
    ctx.fillRect(xPos, yPos, 5, 1000);
  }
  ctx.save();
}

function clean() { //clears the canvas
  var ctx = document.getElementById("canv").getContext("2d");

  ctx.clearRect(0, 0, 480, 400);
}