let cvs = document.getElementById("canvas");
let ctx = cvs.getContext("2d");

// Loading images
let bird = new Image();
let bg = new Image();
let fg = new Image();
let pipeT = new Image();
let pipeB = new Image();

bird.src = "img/bird.png";
bg.src = "img/bg.png";
fg.src = "img/fg.png";
pipeT.src = "img/pipeTop.png";
pipeB.src = "img/pipeBottom.png";

// Distance variables
let gap = 85;
let constant = pipeT.height + gap;

let bX = 10;
let bY = 150;

let gravity = 1;

// When key down
document.addEventListener("keydown", moveUp);

function moveUp(){
    bY -= 20;
}

// Drawing images
function draw(){
    ctx.drawImage(bg,0,0);
    
    ctx.drawImage (pipeT,100,0);
    ctx.drawImage (pipeB,100,0 + constant);
    
    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    requestAnimationFrame(draw);
}

draw();