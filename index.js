let inputdir = { x: 0, y: 0 }
const foodSound = new Audio('../music/food.mp3')
const gameoverSound = new Audio('../music/gameover.mp3')
const moveSound = new Audio('../music/move.mp3')
const musicSound = new Audio('../music/music.mp3')
let lastPaintTime = 0
const SNAKE_SPEED=10
let score=0
let snakeArray = [{ x: 13, y: 15 }]
let foodItem = { x: 3, y: 12 }


function main(currentTime) {
    window.requestAnimationFrame(main)   // must be written on top..Creation of Game Loop
    let secondsSinceLastPaint=(currentTime-lastPaintTime)/1000   //to get in seconds the time since last screen was painted
    if ( secondsSinceLastPaint < 1/SNAKE_SPEED) {  //this is to set the minimum time interval in which    
        return;                                 //we want to paint the screen again. Until its reached 
    }                                           //we dont do anything. Just return 
    
    lastPaintTime = currentTime  // update the last paint time everytime we paint to curr  time
    //gameEngine()
    update()
    draw()

}

//Collison Code
function isCollide(snake) {
    //Bumb to yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            return true
        }
    }
    //Bump to wall
    if (snake[0].x >= 18 || snake[0].x <=0  || snake[0].y >= 18 || snake[0].y <=0) {
        return true;
    }

    return false
}


function update() {

    
    if (isCollide(snakeArray)) {
        gameoverSound.play()
        musicSound.pause()
        inputdir = { x: 0, y: 0 }
        alert("Game Over! Press OK to Play Again")
        snakeArray = [{ x: 13, y: 15 }]
        musicSound.play()
        score = 0
        CurrScore.innerHTML="Score: "+score
    }

    //moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] }   //spread used to craete new object everytime to avoid reference collision
    }
    snakeArray[0].x += inputdir.x;   //updating head in the input direction
    snakeArray[0].y += inputdir.y;


    //Eats Food and Grows AND New fooditem is generated at some random location 
    if (snakeArray[0].x === foodItem.x && snakeArray[0].y === foodItem.y) {
        score+=1
        CurrScore.innerHTML="Score: "+score
        if(score>hiscoreval)
        {
            hiscoreval=score
            localStorage.setItem("HiScore",JSON.stringify(hiscoreval))
            HighScore.innerHTML="HiScore: "+ hiscoreval
        }
        foodSound.play()
        
        snakeArray.unshift({ x: snakeArray[0].x + inputdir.x, y: snakeArray[0].y + inputdir.y })  //adding a clome of head at the beginning.. Read about it
        foodItem.x = Math.floor(Math.random() * (16 - 2) + 2)
        foodItem.y = Math.floor(Math.random() * (16 - 2) + 2)
    }
}



function draw()
{
    board.innerHTML = ""              //clear the board
    snakeArray.forEach((e, index) => {     // for each is running on sankeArray that has x & y so e->x & 
        let snakeElement = document.createElement('div')
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add('snake-head')
        }
        else {
            snakeElement.classList.add('snake-body')
        }
        board.appendChild(snakeElement)
    })

    let foodElement = document.createElement('div')
    foodElement.classList.add('food')
    foodElement.style.gridRowStart = foodItem.y;
    foodElement.style.gridColumnStart = foodItem.x;
    board.appendChild(foodElement)
}

//main logic
let hiscore=localStorage.getItem("HiScore")
let hiscoreval=0
    if(hiscore===null)
    {
        hiscoreval=0
        localStorage.setItem("HiScore", JSON.stringify(hiscoreval))
    }
    else{
        hiscoreval=parseInt(localStorage.getItem("HiScore"))
        HighScore.innerHTML="HiScore: "+ hiscoreval
    }

window.requestAnimationFrame(main)   // this also sends a timestamp of when the last time the function is fired
document.addEventListener('keydown', e => {
    inputdir = { x: 0, y: 0 }
    let lasInputDir={x:0,y:0}
    moveSound.play()
    musicSound.play()
    switch (e.key) {
        case "ArrowUp":                   //Movement wrt the user input on keyboard 
            inputdir.x = 0
            inputdir.y = -1
            break;
        case "ArrowDown":
            inputdir.x = 0
            inputdir.y = 1
            break;
        case "ArrowLeft":
            inputdir.x = -1
            inputdir.y = 0
            break;
        case "ArrowRight":
            inputdir.x = 1
            inputdir.y = 0
            break;

        default:
            break;
    }
})