

function test() {
  	var ctx = document.getElementById("canv").getContext("2d");

  	for(var i = 0; i < 37; i++)
  	{
  		if(i%2 == 0)
  		{
  			ctx.fillStyle = "#FF0000";
  		} else {
  			ctx.fillStyle = "#000000";
  		}

		
  		ctx.fillRect(i * 100, 0, 100, 150);
  		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.font = "40px Calibri";
  		ctx.fillText("27", i * 100 + 50, 53);
  	}

  	ctx.fillStyle = "#5994d7";
  	ctx.fillRect(450, 0, 4, 150.5);
}