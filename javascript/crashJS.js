var stop = false;
var iteration = 0;
var fcnt = 0; //function time
var xPos = 0;
var yPos = 400;
var multiplier = 1.00;
var interval;
var randomNum;

var invested = 0;
var buttonPressed = 0;
var pullOut = false;
var able2pullOut = false;
//changing random num changes the max multiplier value
randomNum = Math.floor((Math.random() * 140));

function crasher() {
  iteration++;
  //iteration % n. - slower multiplier speed and + faster
  if (stop == false && iteration % 6 == 0) {
    fcnt++;
    multiplier = multiplier + 0.01;
    multiplier = Math.round(multiplier * 100) / 100;
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
    ctx.fillRect(xPos / 1.7, yPos - 3, 3, 3);
    xPos += 1;
    yPos -= Math.pow(xPos, 1.1) * 0.0007;
  } else if (stop == true) {
    ctx.fillRect(xPos / 1.7, yPos - 3, 3, 1000);
  }

  ctx.fillStyle = "#2f3e45";
  ctx.fillRect(10, 70, 200, 50);

  ctx.font = "30px Arial";
  ctx.fillStyle = "#FFF";
  ctx.fillText(multiplier + "X", 80, 110);
}

function bet() {
  if (currentBet <= maxCurrency && currentBet >= 1) {
    interval = setInterval(crasher, 12);
    invested = currentBet;
    ChangeBalance(0-invested);
    buttonPressed++;
    able2pullOut = true;
  }

  if (buttonPressed == 2 && able2pullOut == true && stop == false) {
    pullOut = true;
    able2pullOut = false;
  }

  if (pullOut == true && stop == false) {
    ChangeBalance(Math.round(invested * multiplier));
  }
  UpdateMax();
}

function restart() {
  buttonPressed = 0;
  able2pullOut = false;
  stop = false;
  clean();
}

//clearing the canvas
function clean() {
  var ctx = document.getElementById("canv").getContext("2d");

  ctx.clearRect(0, 0, 480, 400);
}


/*
Fixa så att man faktiskt kan dra ut.
Sen ska man kunna spela om.
Måste ändre "invest" knappen när man tryckt på den en gång
*/
