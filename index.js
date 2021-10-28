let canvas = document.getElementById('myCanvas');
let ctx = canvas.getContext('2d');
canvas.style.border = '2px solid black';

// load all images
let bg = new Image();
bg.src = './images/bg.png';

let fg = new Image();
fg.src = './images/fg.png';

let bird = new Image();
bird.src = './images/bird.png'

let pipeNorth = new Image();
pipeNorth.src = './images/pipeNorth.png'

let pipeSouth = new Image();
pipeSouth.src = './images/pipeSouth.png'

let intervalId = 0;
let isGameOver = false;
let birdY = 30, birdX = 30
let foregroundY = canvas.height - fg.height
let pipeX = 200
let decPipe = 2
let score = 0;
let falling = true;

let audio = new Audio('https://res.cloudinary.com/manishp/video/upload/v1623305320/Horizon_Zero_Dawn_OST_-_Years_Of_Training_badkhk.mp3')

//creating an array of pipe co-ordinates
let pipes = [
    {x: pipeX, y: 0},
    {x: pipeX + 300, y: -100},
]

function draw(){

    ctx.drawImage(bg, 0, 0)
    ctx.drawImage(bird, birdX, birdY)

    // Looping over all the pipes in the pipe array and display each one
    for(let i=0; i<pipes.length; i++ ) {
        let gap = 100
        ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y)
        ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + pipeNorth.height + gap)

        // Move each pipe horizontally 
        pipes[i].x = pipes[i].x - decPipe

        // if the pipe goes beyond the left end of the canvas
        if(pipes[i].x + pipeNorth.width < 0 ) {
            pipes[i].x = 500
            pipes[i].y = -Math.floor(Math.random() * pipeNorth.height)
        }

        //if the bird crosses the right edge of the pipe
        if (birdX == pipes[i].x +  pipeNorth.width) {
            score++
        }

        // figure out bird collision with our pipes
        // if () {
        //     isGameOver = true;
        // }
        
    }

    //check if bird touches the foreground
    if (birdY + bird.height > foregroundY) {
        isGameOver = true
    }

    //bird movement
    if (falling) {
        birdY = birdY + 2
    }
    else {
        birdY = birdY - 5
    }
    
    ctx.drawImage(fg, 0, foregroundY)
    ctx.font = '24px Verdana'
    ctx.fillText(`Score: ${score}`, 30, canvas.height - 70 )


    if (isGameOver) {
        audio.pause()
        cancelAnimationFrame(intervalId)

    }
    else {
        intervalId = requestAnimationFrame(draw)
    }
    
}

window.addEventListener('load', () => {
    draw()

    document.addEventListener('mousedown', () => {
        falling = false
        audio.play()
        audio.volume = 0.1
    })
    document.addEventListener('mouseup', () => {
        falling = true
    })
    
})
