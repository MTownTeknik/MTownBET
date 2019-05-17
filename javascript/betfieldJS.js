var maxCurrency;
var currentBet = 100;


function main() {
	maxCurrency = getCookie("Currency");

	if(maxCurrency == 0) {
		maxCurrency = 10000;
	}

	UpdateMax();
}

function add(amount) {
	getCurrentBet();

	if(currentBet + amount < maxCurrency)
	{
		currentBet += amount;
	} else {
		currentBet = maxCurrency;
	}

	if(currentBet < 0) {
		currentBet = 0;
	}

	
	changeText();
}


function multiply(factor) {
	getCurrentBet();

	if(currentBet * factor < maxCurrency)
	{
		currentBet *= factor;
	} else {
		currentBet = maxCurrency;
	}

	currentBet = Math.round(currentBet);

	changeText();
}


function setMax() {
	currentBet = Number(maxCurrency);
	changeText();
}


function clearBet() {
	currentBet = 0;
	changeText();
}


function getCurrentBet() {
	var textF = document.getElementById("betAmount");
	var writtenBet = Number(textF.value);

	currentBet = writtenBet;
}


function changeText() {
	var textF = document.getElementById("betAmount");
	textF.value = currentBet;
}


function writee() {
	getCurrentBet();

	if(currentBet > maxCurrency) {
		currentBet = maxCurrency;
	}

	changeText();
}

function UpdateMax() 
{
	document.getElementById("betHeader").innerHTML = "YOUR BET (MAX: " + maxCurrency + ")";
}

function ChangeBalance(value) 
{
	maxCurrency += value;
	setCookie("Currency", maxCurrency, 7);
}