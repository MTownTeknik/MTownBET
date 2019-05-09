var loadRepeats = 0;		//DEN SKA VARA 3. MAN KAN TEMPORÄRT BYTA DEN TILL (0) FÖR ATT SKIPPA ANIMATION VID UTVECKLING!


loadAnim = setInterval(removeLoad, 1000);


function main() {
	if(loadRepeats == 0) {
		loadRepeats = 1;
		removeLoad();
	}


	//setCookie("test", 100, 1);
	//alert(getCookie("test"));
}

function loadPage(url, pix) {

	var frame = document.getElementById("gameFrame");
	frame.src = url;
	frame.style.height = pix + 'vw';
}

function removeLoad() {
	loadRepeats--;

	if(loadRepeats == 0) {
		var overlay = document.getElementById("preload");
		overlay.parentNode.removeChild(overlay);
		loadPage("roulette.html", 50);									//BYT ROULETTE MED HOME.HTML NÄR DEN ÄR GJORD!!!
		clearInterval(loadAnim);
	}
}