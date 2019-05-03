var interval = setInterval(crasher, 8);
var stop = false
var randomNum;
var fcnt = 0; //function time
var xPos = 0;
var yPos = 400;
var multiplier = 1.00;
var iteration = 0;

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
iteration++;

  if (stop == false && iteration%8==0) {
    fcnt++;
    multiplier = multiplier + 0.01;
    multiplier = Math.round(multiplier * 100) / 100;
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
    ctx.fillRect(xPos, yPos-3, 3, 3);
    xPos += 1;
<<<<<<< HEAD
    yPos -= xPos/200;
  } else if (stop == true) {
    ctx.fillRect(xPos, yPos, 5, 1000);
  }

=======
    yPos -= Math.pow(xPos, 2) * 0.00001;
  } //insert a crash thingy here
>>>>>>> c4e8af7b65d33dd7fea6bcec9fb1161ebaa1db9a

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