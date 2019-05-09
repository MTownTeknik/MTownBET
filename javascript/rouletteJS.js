
var redColor = "#ff3855";
var blackColor = "#232323";
var greenColor = "#00bb00";

var numOrder = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 
				5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];


var offset = 0;
var preOffset = 0;
var spinLength;
var vel;
var spinBool = false;

var spinInterval;

//BETTING CURRENCY
var redInvested = 0;
var greenInvested = 0;
var blackInvested = 0;
var oddInvested = 0;
var evenInvested = 0;


function Draw() {
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


function slide(){
	if(offset < spinLength)
	{
		if(offset - preOffset < 1500)
		{
			vel = vel + 0.05;
		}

		if(offset > spinLength - 1500)
		{
			vel = vel - 0.05;
		} 

		if(vel < 0)
		{
			vel = 1;
		}

		offset = offset + vel;
		
		Draw();
	} else {
		spinBool = false;
		console.log(offset%3700);
		console.log("TALET ÄR: " + numOrder[(4 + Math.floor((offset%3700 + 50)/100)) % 37])

		var clr = "";

		if(((4 + Math.floor((offset%3700 + 50)/100)) % 37) %2 == 0)
		{
			clr = "Black";
		} else {
			clr = "Red";
		}

		if((4 + Math.floor((offset%3700 + 50)/100)) % 37 == 0)
		{
			clr = "Green";
		}

		alert("DU RULLADE: " + numOrder[(4 + Math.floor((offset%3700 + 50)/100)) % 37] + ", Färgen är: " + clr);
		clearInterval(spinInterval);
	}
}

function Roll() 
{
	if(spinBool == false && lockBets())
	{
		spinBool = true;
		spinLength = Math.random() * 4000 + 4000 + offset;
		preOffset = offset;
		vel = 0.25;
		spinInterval = setInterval(slide, 10);
	}
}

function LockBets() 
{
	var totalBetted = 0;
	totalBetted += (redInvested + greenInvested + blackInvested);
	totalBetted += (oddInvested + evenInvested);

	//forloop alla numbers

	if(totalBetted > 0) 
	{
		//Set cookiers(current cookies - totalBetted)
		return true;
	}
	return false;
}

function ClearBets() 
{

}


function BetColor(collar) 
{
	var betGraph = document.getElementById("bet" + collar).getElementsByTagName('p')[0];

	switch(collar) 
	{
		case "Red":
			redInvested += currentBet;
			maxCurrency -= currentBet;
			betGraph.innerHTML = "INVESTED: " + redInvested;
			break;
		case "Green":
			greenInvested += currentBet;
			maxCurrency -= currentBet;
			betGraph.innerHTML = "INVESTED: " + greenInvested;
			break;
		case "Black":
			blackInvested += currentBet;
			maxCurrency -= currentBet;
			betGraph.innerHTML = "INVESTED: " + blackInvested;
			break;
		case "Odd":
			oddInvested += currentBet;
			maxCurrency -= currentBet;
			betGraph.innerHTML = "INVESTED: " + oddInvested;
			break;
		case "Even":
			evenInvested += currentBet;
			maxCurrency -= currentBet;
			betGraph.innerHTML = "INVESTED: " + evenInvested;
			break;
	}

	//writee();
}
