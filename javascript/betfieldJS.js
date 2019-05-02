var maxCurrency = 10000;
var currentBet = 100;


function add(amount) {
	if(currentBet + amount < maxCurrency)
	{
		currentBet += amount;
	} else {
		currentBet = maxCurrency;
	}

	alert(currentBet);
}


function multiply(factor) {
	if(currentBet * factor < maxCurrency)
	{
		currentBet *= factor;
	} else {
		currentBet = maxCurrency;
	}

	alert(currentBet);
}


function setMax() {
	currentBet = maxCurrency;
}


function changeText() {
	var textF = documents.getElementById("betAmount");
}