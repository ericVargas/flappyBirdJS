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

let gravity = 1.5;

let score = 0;

// Sounds
let fly = new Audio();
let oneUp = new Audio();

fly.src = "sound/fly.mp3";
oneUp.src = "sound/score.mp3";

// When key down
document.addEventListener("keydown", moveUp);
//document.addEventListener("click", moveUp);

function moveUp(){
    bY -= 25;
    fly.play();
}

// Pipe coordinates
let pipe = [];

pipe[0] = {
    x: cvs.width,
    y: 0
}

// Drawing images
function draw(){
    ctx.drawImage(bg,0,0);
    
    // Continously draw new pipes
    for (let i = 0; i < pipe.length; i++){
        ctx.drawImage (pipeT,pipe[i].x,pipe[i].y);
        ctx.drawImage (pipeB,pipe[i].x,pipe[i].y + constant);
        
        // Moving pipes to the left
        pipe[i].x --;
        
        // Randomize x coordinates of new pipes
        if(pipe[i].x == 125){
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeT.height) - pipeT.height
            });
        }
        
        // Detecting collision
        if(bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeT.width && (bY <= pipe[i].y + pipeT.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >= cvs.height - fg.height){
            location.reload(); // reload page
        }
        
        // Add to score
        if(pipe[i].x == 5){
            score++;
            oneUp.play();
        }
    }
    
    ctx.drawImage(fg,0,cvs.height - fg.height);
    
    ctx.drawImage(bird,bX,bY);
    
    bY += gravity;
    
    ctx.fillStyle = "#000";
    ctx.font = "20px Verdana";
    ctx.fillText("Score : "+score,10,cvs.height-20);
    
    requestAnimationFrame(draw);
}

draw();