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
var credits = 100;
var betted = 0;
var paid = [0,0];

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
  
 $('#can').click(function(e){

    var rect = document.getElementById("can").getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;
    //console.log("x: " + x + " y: " + y);

//    var x = e.clientX;
  //  var y = e.clientY;         
    console.log("xy:"+x+" "+y);
    if ( 310<y && y<375 ) {
      if ( 314<x && x<355 ) {
        spin();
      }
      if ( 141<x && x<180 ) {
        payTable();
      }
      if ( 198<x && x<240 ) {
        bet(credits);
      }
      if ( 255<x && x<294 ) {
        bet(1);
      }
    }
  });
  
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
          win(1);
        } else if (wheelstart[0]==wheelstart[1] || wheelstart[0]==wheelstart[2] || wheelstart[1]==wheelstart[2]) {
          win(0);
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
  ctx.fillStyle = "red";
  ctx.font = "20px Arial";
  ctx.fillText(credits,132,283);
  ctx.fillText(betted,212,283);
  ctx.fillText(paid[0],410,280);
  ctx.fillText(paid[1],410,297);
}

function spin() {
  if (betted>0) {
    for (var i = 0;i<3;i++) {
      wheeltargetspeed[i] = 15+i;
    }
    rand = frame+130+Math.random()*100;// (ca 4 sek)
  } else {
    alert("You have to bet something!");
  }
}

function bet(amount) {
  if (amount <= credits) {
    credits-=amount;
    betted+=amount;
    updateNumbers();
  } else {
    alert("You don't have any more credits!");
  }
}

function updateNumbers() {
  paid[0] = 4*betted;
  paid[1] = 20*betted;
}

function payTable() {
  credits = 0;
}

function win(wich) {
  credits+=paid[wich];
  betted=0;
  paid[0]=0;
  paid[1]=0;
  console.log("win");
}

function loose() {
  paid[0]=0;
  paid[1]=0;
  betted=0;
  console.log("loose");
}
