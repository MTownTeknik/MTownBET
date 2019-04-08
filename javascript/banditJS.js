var ctx;
var tim;
var frame=0;
var images = [];
var frameimage;
var wheelstart = [0,0,0];
var wheeltargetspeed = [0,0,0];
var wheelspeed = [0,0,0];
var wheelframe = [0,0,0];
var wheelpos = [26,26,26];
var rand = 0;
var frame = 0;

//page loads
window.onload = function() {
  for (var i = 0;i<16;i++) {
    images[i] = document.getElementById("bi"+i);
  }
  frameimage = document.getElementById("fr");
  document.getElementById("can").width = 480;
  document.getElementById("can").height = 400;

  ctx=document.getElementById("can").getContext("2d");
  
  tim = setInterval(tick,20);
  
};

function tick() {
  for (var i = 0;i<3;i++) {
    if (wheelspeed[i]<wheeltargetspeed[i]) {    //acceleration
      wheelspeed[i]++;
    }
  
    wheelpos[i]+=wheelspeed[i];                 //uppdatera position med hastighet
    if (wheelpos[i]>26 && wheeltargetspeed[i]==0) {  //ska den stanna hjulet? stanna på rätt pos.
      wheelspeed[i]=0;
      wheelpos[i]=26;
      if (wheelspeed[2]==0) {   //check for win
        if (wheelstart[0]==wheelstart[1] && wheelstart[0]==wheelstart[2]) {
          win();
        } else {                //loose
          loose();
        }
      }
    }

    if (wheelpos[i]>=92) {                      //har den scrollat fram en bild?
      wheelstart[i]--;
      if (wheelstart[i]<0) wheelstart[i]=15;    //i så fall, back en hel bild och byt ikon-pekare
      wheelpos[i]=wheelpos[i]-92;
    }

    ctx.drawImage(images[(wheelstart[i])%16], 100*i+90, wheelpos[i]+16);        //rita ut tre ikoner för ett hjul
    ctx.drawImage(images[(wheelstart[i]+1)%16], 100*i+90, wheelpos[i]+108);
    ctx.drawImage(images[(wheelstart[i]+2)%16], 100*i+90, wheelpos[i]+200);

                      //inled låsning i ordning
    if (frame>rand) {           
      if (wheelspeed[0] == 0) {
        if (wheelspeed[1] == 0) {
          wheeltargetspeed[2] = 0;
        }
        wheeltargetspeed[1] = 0;
      }
      wheeltargetspeed[0] = 0;
      rand = frame+20+Math.random()*20;   //lite fördröjning mellan låsningen av hjulen
    }
  }
  frame++;                          //uppdatera framecounter som håller reda på slumptider bl.a.
  ctx.drawImage(frameimage, 0,0);   //rita ut ramen över allt
}

function roll() {
  for (var i = 0;i<3;i++) {
    wheeltargetspeed[i] = 15+i;
  }
  rand = frame+130+Math.random()*100;// (ca 4 sek)
}

function win() {
  console.log("win");
}

function loose() {
  console.log("loose");
}
