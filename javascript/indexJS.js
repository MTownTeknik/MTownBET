function main() {
}

function loadPage(url, pix) {

	var frame = document.getElementById("gameFrame");
	frame.src = url;
	frame.style.height = pix + 'vw';
}
