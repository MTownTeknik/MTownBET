
var redColor = "#ff3855";
var blackColor = "#232323";
var greenColor = "#00bb00";

var numOrder = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
				5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];


var offset = 0;
var spinLength;


function test() {
  	var ctx = document.getElementById("canv").getContext("2d");

  	for(var i = 0; i < 74; i++)
  	{

  		if(i%37%2 == 1)
  		{
  			ctx.fillStyle = redColor;
  		} else {
  			ctx.fillStyle = blackColor;
  		}
		if(i%37 == 0) 
		{
			ctx.fillStyle = greenColor;
		}


  		ctx.fillRect(i * 100 - offset%3700, 0, 100, 150);

		ctx.fillStyle = "#FFF";
		ctx.textAlign = "center";
		ctx.font = "40px Calibri";
  		ctx.fillText(numOrder[i%37], i * 100 + 50 - offset%3700, 53);
  	}

  	ctx.fillStyle = "#5994d7";
  	ctx.fillRect(450, 0, 4, 150.5);
}


function Roll()
{
	spinLength = Math.random() * 3700;

	setInterval(slide, 10);
}


function slide(){
	if(offset < spinLength){

	offset = offset + 3;
	test();
	}
}