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

//page loads, setup timer, sizes, buttonclick function
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

// the function that animates the rolling wheels
function tick() {
  for (var i = 0;i<3;i++) {                   //loopa igenom alla tre hjulen
    if (wheelspeed[i]<wheeltargetspeed[i]) {    //acceleration
      wheelspeed[i]++;
    }
  
    wheelpos[i]+=wheelspeed[i];                 //uppdatera position med hastighet
    if (wheelpos[i]>26 && wheeltargetspeed[i]==0) {  //ska den stanna hjulet? stanna p� r�tt pos.
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
      if (wheelstart[i]<0) wheelstart[i]=15;    //i s� fall, backa en hel bild och byt ikon-pekare
      wheelpos[i]=wheelpos[i]-92;
    }

    ctx.drawImage(images[(wheelstart[i])%16], 100*i+90, wheelpos[i]+16);        //rita ut tre ikoner f�r ett hjul
    ctx.drawImage(images[(wheelstart[i]+1)%16], 100*i+90, wheelpos[i]+108);
    ctx.drawImage(images[(wheelstart[i]+2)%16], 100*i+90, wheelpos[i]+200);

                            //inled l�sning i ordning
    if (frame>rand) {           
      if (wheelspeed[0] == 0) {
        if (wheelspeed[1] == 0) {
          if (wheeltargetspeed[2] != 0) document.getElementById("stop").play();
          wheeltargetspeed[2] = 0;
        }
        if (wheeltargetspeed[1] != 0) document.getElementById("stop").play();
        wheeltargetspeed[1] = 0;
      }
      if (wheeltargetspeed[0] != 0) document.getElementById("stop").play();
      wheeltargetspeed[0] = 0;
      rand = frame+20+Math.random()*20;   //lite slumpf�rdr�jning mellan l�sningen av hjulen
    }
  }
  frame++;                          //uppdatera framecounter som h�ller reda p� slumptider bl.a.
  ctx.drawImage(frameimage, 0,0);   //rita ut ramen �ver allt
  ctx.fillStyle = "red";
  ctx.font = "20px Arial";
  ctx.fillText(credits,132,283);
  ctx.fillText(betted,212,283);
  ctx.fillText(paid[0],410,280);
  ctx.fillText(paid[1],410,297);
}

// s�tt fart p� hjulen, om man satsat
function spin() {
  if (betted>0) {
    document.getElementById("spin").play();
    for (var i = 0;i<3;i++) {
      wheeltargetspeed[i] = 15+i;
    }
    rand = frame+130+Math.random()*100;// (ca 4 sek)
  } else {
    alert("You have to bet something!");
  }
}

//satsa n�t, om man har n�t
function bet(amount) {
  if (amount <= credits) {
    document.getElementById("coin").play();
    credits-=amount;
    betted+=amount;
    updateNumbers();
  } else {
    alert("You don't have any more credits!");
  }
}

//uppdatera de utdelade summorna
function updateNumbers() {
  paid[0] = 4*betted;   //two alike: ((15+15+15)*16/4096)=0.1758... -> 1/5.68
  paid[1] = 200*betted; //three alike 16/4096=0.003906... -> 1/256
}

//spelaren tar ut krediter i "pengar"....
function payTable() {
  credits = 0;
}

//spelaren fick en vinst
function win(wich) {
  if (wich==0) document.getElementById("pay").play();
  if (wich==1) document.getElementById("jackpot").play();
  credits+=paid[wich];
  betted=0;
  paid[0]=0;
  paid[1]=0;
  console.log("win");
}

//spelaren f�rlorade omg�ngen
function loose() {
  paid[0]=0;
  paid[1]=0;
  betted=0;
  console.log("loose");
}
