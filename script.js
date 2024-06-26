let inputDir = {x:0 , y:0};
let foodSound = new Audio('food.mp3');
let gameOverSound = new Audio('gameover.mp3');
let moveSound = new Audio('move.mp3');
let musicSound = new Audio('music.mp3');
let board = document.getElementById("board");
let speed= 8;
let score=0;
let scoreBox = document.getElementById("scoreBox");
let lastPaint = 0;
let snakeArr = [{
    x:13 ,y:15
}];
let food = { x:6 , y:8};

function main (ctime){ musicSound.play();
    window.requestAnimationFrame(main);
 if((ctime -lastPaint)/1000 < 1/speed){
    return;
 }
 else{
lastPaint=ctime;
gameEngine();
 }
}

function isCollide(snake){
  for(let i =1; i<snakeArr.length ;i++){
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){speed=8;return true;}
    }
      if (snake[0].x <=0 || snake[0].x>=18 || snake[0].y <=0 || snake[0].y>=18)
      {speed=8;return true;}
}

function gameEngine(){
   //updating snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0,y:0}; 
        alert("Game Over. Press any key to start the game");
        snakeArr=[{x:13,y:15}];
       
        score=0;
    }

//you have eaten the food and now u hv to regenerate the food and increment the score
if(snakeArr[0].x === food.x && snakeArr[0].y===food.y){
    foodSound.play();
    score++;
    speed+=1;
    console.log(speed);
    if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score : " +score;
    snakeArr.unshift({x:snakeArr[0].x+inputDir.x ,y:snakeArr[0].y+inputDir.y});
    let a=2;
    let b=16;
    food={x:Math.round(a +(b-a)*Math.random()),y:Math.round(a +(b-a)*Math.random())}
}

//move the snake
for(let i= snakeArr.length - 2 ;i>=0 ; i--){
    const element =Array[i];
    snakeArr[i+1]= {...snakeArr[i]};
}
snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

   //display Snake
    board.innerHTML="";
    snakeArr.forEach((e, index) =>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart= e.x;
        if(index === 0)
        snakeElement.classList.add('head');
    else
    snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    })
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart= food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}


//logic
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e=> {
    moveSound.play();
    inputDir = {x:0 , y : 1 };
    switch(e.key){
        case"ArrowUp":
  
        inputDir.x= 0;
        inputDir.y= -1;
        break;
        case"ArrowDown":
    
        inputDir.x= 0;
        inputDir.y= 1;
        break;
        case"ArrowRight":
        inputDir.x= 1;
        inputDir.y= 0;
        break;
        case"ArrowLeft":
        inputDir.x= -1;
        inputDir.y= 0;
        break;
default:
    break;
    }
}
) 

