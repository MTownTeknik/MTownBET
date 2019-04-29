var interval = setInterval(crasher, 100);
var stop = false
var randomNum;
var fcnt = 0; //function time
var xPos = 10;
var yPos = 10;

randomNum = Math.floor((Math.random() * 100) + fcnt);
console.log(fcnt + " " + randomNum);

function crashCounter() {
  var multiplier = 1.00;
  var i;

  for (i = 0; crasher()!= 1; i++) {
    graph();
    multiplier = multiplier + 0.01;
    console.log(multiplier);
  } //doesnt draw the line down when crashing
}

function crasher() {
  fcnt++;

  if (fcnt >= randomNum) {
    stop = true;
    clearInterval(interval);
    return 1;
  }
}

function graph() {
  var ctx = document.getElementById("canv").getContext("2d");
  ctx.fillStyle = "#FFF";

  if (stop == false) {
    ctx.fillRect(xPos, yPos, 1, 1);
    xPos++;
  } else if (stop == true){
    ctx.fillRect(xPos, yPos, 1, 50);
  }
  ctx.save();
}