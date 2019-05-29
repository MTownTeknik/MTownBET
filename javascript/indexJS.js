var loadRepeats = 3;		//DEN SKA VARA 3. MAN KAN TEMPORÄRT BYTA DEN TILL (0) FÖR ATT SKIPPA ANIMATION VID UTVECKLING!
var currentPage;


loadAnim = setInterval(removeLoad, 1000);


function main() {
	if(loadRepeats == 0) {
		loadRepeats = 1;
		removeLoad();
	}

	if(getCookie("Currency") == 0 || getCookie("Currency") == null) 
	{
		setCookie("Currency", 10000, 7);
	}


	setInterval(UpdateMoney, 100);

}

function loadPage(url, pix) {
	currentPage = url;
	var frame = document.getElementById("gameFrame");
	frame.src = url;
	frame.style.height = pix + 'vw';


	document.getElementById("Slots").src = "img/SlotsIcon.png";
	document.getElementById("Roulette").src = "img/RouletteIcon.png";
	document.getElementById("Crash").src = "img/CrashIcon.png";

	switch(url)
	{
		case "bandit.html":
			FadeB(false, "Slots");
			break;

		case "roulette.html":
			FadeB(false, "Roulette");
			break;

		case "crash.html":
			FadeB(false, "Crash");
			break;
	}

	
}

function removeLoad() {
	loadRepeats--;

	if(loadRepeats == 0) {
		var overlay = document.getElementById("preload");
		overlay.parentNode.removeChild(overlay);
		clearInterval(loadAnim);
	}
}


function UpdateMoney() {
	var dv = document.getElementById("currency").getElementsByTagName('p')[0];

	var currencyString = "$ " + getCookie("Currency"); 

	dv.innerHTML = currencyString;
}

function FadeB(activeBool, id) 
{
	var img = document.getElementById(id);

	if(activeBool == true) 
	{
		img.src = "img/" + id + "IconActive.png";
	} else {
		img.src = "img/" + id + "Icon.png";
	}

	switch(currentPage) 
	{
		case "bandit.html":
			if(id == "Slots")
			{
				img.src = "img/" + id + "IconActive.png";
			}
			break;
		case "roulette.html":
			if(id == "Roulette")
			{
				img.src = "img/" + id + "IconActive.png";
			}
			break;
		case "crash.html":
			if(id == "Crash")
			{
				img.src = "img/" + id + "IconActive.png";
			}
			break;
	}
}