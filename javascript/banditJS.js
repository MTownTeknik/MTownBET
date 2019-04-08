var ctx;
var tim;
var frame=0;
var images = [];
var frameimage;

//page loads
window.onload = function() {
  console.log("run");
  for (var i = 0;i<16;i++) {
    images[i] = document.getElementById("bi"+i);
  }
  frameimage = document.getElementById("fr");
//  image.src = './img/i3.png';
  document.getElementById("can").width = 480;
  document.getElementById("can").height = 400;

  ctx=document.getElementById("can").getContext("2d");
  
  
//  ctx.drawImage(image1, 60,60);
  //ctx.drawImage(frameimage, 0,0);

  console.log("runned");
  
  tim = setInterval(tick,20);
  
};

var wheelstart = [0,0,0];
var wheelspeed = [0,0,0];
var wheelframe = [0,0,0];
var wheelpos = [26,26,26];
var rand = 0;
var frame = 0;

function tick() {
  for (var i = 0;i<3;i++) {
    wheelpos[i]+=wheelspeed[i]; //1-20
    if (wheelpos[i]>=92) {
      wheelstart[i]--;
      if (wheelstart[i]<0) wheelstart[i]=15;
      wheelpos[i]=wheelpos[i]-92;
    }
    if (wheelpos[i]>=26 && wheelspeed[i]==0) {
      wheelpos[i]=26;
    }

    ctx.drawImage(images[(wheelstart[i])%16], 100*i+90, wheelpos[i]+16); 
    ctx.drawImage(images[(wheelstart[i]+1)%16], 100*i+90, wheelpos[i]+108);
    ctx.drawImage(images[(wheelstart[i]+2)%16], 100*i+90, wheelpos[i]+200);
    if (frame>rand) {
      if (wheelspeed[0] == 0) {
        if (wheelspeed[1] == 0) {
          wheelspeed[2] = 0;
        }
        wheelspeed[1] = 0;
      }
      wheelspeed[0] = 0;
      rand = frame+20+Math.random()*20;
    }
  }
  frame++;
  ctx.drawImage(frameimage, 0,0);
}

function roll() {
  for (var i = 0;i<3;i++) {
    wheelspeed[i] = 15+i;
  }
  rand = frame+130+Math.random()*100;// (ca 4 sek)
}

function win() {
}

function loose() {
}
