
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
var numInvested = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];



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

function CreateNumBet() 
{
	var parentDiv = document.getElementById("numberBet");

	for(var i = 0; i < 36; i++)
	{
		var newDiv = document.createElement("div");
		newDiv.classList.add("numBet");
		newDiv.classList.add("FadeAura");

		var value = i%12 * 3 - Math.floor(i / 12) + 3;

		var h1 = document.createElement("h1");
		h1.innerHTML = value;

		var p = document.createElement("p");
		p.innerHTML = "INVESTED: 0";

		newDiv.appendChild(h1);
		newDiv.appendChild(p);
		newDiv.setAttribute('id', ("NUM" + value));

		for(var p = 0; p < 37; p++) 
		{
			if(numOrder[p] == value) 
			{
				if(p % 2 == 1) {
					newDiv.classList.add("betRed");
				} else {
					newDiv.classList.add("betBlack");
				}

			}
		}


		var newA = document.createElement("a");
		newA.setAttribute("onclick", 'BetNumber(' + value + ')');

		newA.appendChild(newDiv);

		parentDiv.appendChild(newA);
	}
}


function slide()
{
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

		var clr = "";
		var num;

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

		num = numOrder[(4 + Math.floor((offset%3700 + 50)/100)) % 37];
		clearInterval(spinInterval);

		Payout(clr, num);
		ClearBets();
	}
}

function Roll() 
{
	if(spinBool == false && LockBets())
	{
		spinBool = true;
		spinLength = Math.random() * 4000 + 4000 + offset;


		if((spinLength + 50) % 100 <= 5) 
		{
			spinLength += (2 + (50 - spinLength%100));
		}
		if((spinLength + 50) % 100 >= 95) 
		{
			spinLength -= (6 - (50 - spinLength%100));
		}
		

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

	for(var i = 0; i < 36; i++) 
	{
		totalBetted += numInvested[i];
	}

	if(totalBetted > 0) 
	{
		setCookie("Currency", maxCurrency, 7);
		return true;
	}
	return false;
}

function ClearBets() 
{
	document.getElementById("betRed").getElementsByTagName('p')[0].innerHTML = "INVESTED: 0";
	document.getElementById("betBlack").getElementsByTagName('p')[0].innerHTML = "INVESTED: 0";
	document.getElementById("betGreen").getElementsByTagName('p')[0].innerHTML = "INVESTED: 0";
	document.getElementById("betEven").getElementsByTagName('p')[0].innerHTML = "INVESTED: 0";
	document.getElementById("betOdd").getElementsByTagName('p')[0].innerHTML = "INVESTED: 0";

	for(var i = 1; i < 36; i++)
	{
		document.getElementById("NUM" + i).getElementsByTagName('p')[0].innerHTML = "INVESTED: 0";
		numInvested[i] = 0;
	}

	redInvested = 0;
	blackInvested = 0;
	greenInvested = 0;
	evenInvested = 0;
	oddInvested = 0;
}

function Payout(collor, namber) 
{
	switch(collor) 
	{
		case "Red":
			maxCurrency += (2 * redInvested);
			break;
		case "Black":
			maxCurrency += (2 * blackInvested);
			break;
		case "Green":
			maxCurrency += (14 * greenInvested);
			break;
	}

	if(namber % 2 == 0) {
		maxCurrency += (2 * evenInvested);
	} else {
		maxCurrency += (2 * oddInvested);
	}

	for(var i = 0; i < 36; i++) 
	{
		maxCurrency += (10 * numInvested[i]);
	}

	setCookie("Currency", maxCurrency, 7);
	UpdateMax();
}


function BetColor(collar) 
{
	if(spinBool) {
		return;
	}

	var betGraph = document.getElementById("bet" + collar).getElementsByTagName('p')[0];
	if(currentBet <= maxCurrency) {

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
	}

	UpdateMax();

}

function BetNumber(nam)
{
	if(spinBool) {
		return;
	}

	if(currentBet <= maxCurrency)
	{
		numInvested[nam] += currentBet;
		maxCurrency -= currentBet;

		var betGraph = document.getElementById("NUM" + nam).getElementsByTagName('p')[0];
		betGraph.innerHTML = "INVESTED " + numInvested[nam];
	}

	UpdateMax();

}

function Refund() 
{
	if(spinBool) {
		return;
	}

	var totalBetted = 0;
	totalBetted += (redInvested + greenInvested + blackInvested);
	totalBetted += (oddInvested + evenInvested);

	for(var i = 0; i < 36; i++) 
	{
		totalBetted += numInvested[i];
	}


	maxCurrency = Number(maxCurrency) + Number(totalBetted);


	ClearBets();
	UpdateMax();
}
