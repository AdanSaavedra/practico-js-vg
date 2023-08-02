const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')

const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementSize;
let level = 0;
let lives = 3; 
let timeStart;
let timePlayer;
let timeInterval

const playerPosition = {
    x: undefined,
    y: undefined
}
const giftPosition = {
    x: undefined,
    y: undefined
}
let enemiesPosition= []

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = (canvasSize / 10)
    startGame()
}

function startGame(){
    console.log({elementSize, canvasSize});

    game.font = elementSize + 'px Verdana'
    game.textAlign = 'end'

    const map = maps[level];

    if(!map){
        gameWin();
        return
    }
    if(!timeStart){
        timeStart= Date.now()
        timeInterval = setInterval(showTime,100);
    }

    const mapRows = map.trim().split("\n")
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    showLives()
    enemiesPosition=[]
    game.clearRect(0,0,canvasSize, canvasSize)

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col,colI) =>{
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)

            if(col == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                }
            } else if(col == 'I'){
                giftPosition.x = posX
                giftPosition.y = posY
            }else if(col == 'X'){
                enemiesPosition.push({
                    x: posX,
                    y: posY
                })
            }

            game.fillText(emoji, posX, posY)
        })
    })

    movePlayer()
}

function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x,playerPosition.y)
    console.log(playerPosition)
    if(Math.trunc(playerPosition.x) === Math.trunc(giftPosition.x) && Math.trunc(playerPosition.y) === Math.trunc(giftPosition.y)){
        levelWin()
    }
    const enemyCollision = enemiesPosition.find(enemy =>{
        const enemyCollisionX = Math.trunc(enemy.x) == Math.trunc(playerPosition.x)
        const enemyCollisionY = Math.trunc(enemy.y) == Math.trunc(playerPosition.y)
        return enemyCollisionX && enemyCollisionY
    })
    if(enemyCollision){
        levelFailed();
    }
}

function levelWin(){
    level++;
    startGame()
}
function gameWin(){
    console.log('Terminaste')
    clearInterval(timeInterval)
}
function levelFailed(){
    console.log('Chocaste perro')
    lives--;
    if(lives<= 0){
        level = 0;
        lives = 3
        timeStart = undefined
    }
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()
}

function showLives(){
    spanLives.innerHTML = emojis['HEART'].repeat(lives)
}
function showTime(){
    spanTime.innerHTML = formatTime(Date.now() - timeStart)
}
function formatTime(ms){
    const cs = parseInt(ms/10) % 100
    const seg = parseInt(ms/1000) % 60
    const min = parseInt(ms/60000) % 60
    const csStr = `0${cs}`.slice(-2)
    const segStr = `0${seg}`.slice(-2)
    const minStr = `0${min}`.slice(-2)
    return `${minStr}:${segStr}:${csStr}`
}

window.addEventListener('keydown',moveByKeys)
btnUp?.addEventListener('click', moveUp);
btnLeft?.addEventListener('click', moveLeft);
btnRight?.addEventListener('click', moveRight);
btnDown?.addEventListener('click', moveDown);

function moveByKeys(event){
    if(event.key == 'ArrowUp' || event.key=='w' || event.key=='W') moveUp()
    else if(event.key == 'ArrowLeft' || event.key=='a' || event.key=='A') moveLeft()
    else if(event.key == 'ArrowRight' || event.key=='d' || event.key=='D') moveRight()
    else if(event.key == 'ArrowDown' || event.key=='s' || event.key=='s') moveDown()
}
function moveUp(){
    if(Math.trunc(playerPosition.y) > Math.trunc(elementSize)){
        console.log('Me quiero mover hacia arriba')
        playerPosition.y-= elementSize;
        startGame()
    }
}
function moveLeft(){
    if(Math.trunc(playerPosition.x) > Math.trunc(elementSize)){
        console.log('Me quiero mover hacia izq')
        playerPosition.x-= elementSize;
        startGame()
    }
}
function moveRight(){
    if(Math.ceil(playerPosition.x) < Math.trunc(canvasSize)){
        console.log('Me quiero mover hacia der')
        playerPosition.x+= elementSize;
        startGame()
    }
}
function moveDown(){
    if(playerPosition.y < canvasSize){
        console.log('Me quiero mover hacia abajo')
        playerPosition.y+= elementSize;
        startGame()
    }
    
}



// for (let i = 1; i <= 10; i++) {
//     for (let j = 1; j <= 10; j++) {
//         game.fillText(emojis[mapRowCols[i -1][j-1]], elementSize * j, elementSize * i) 
//     } 
// }
// game.fillRect(0,50,100,100);
    // game.clearRect(50,50,50,50);
    // game.clearRect(50,0,50,50)

    // game.font = '25px Verdana'
    // game.fillStyle = 'purple'
    // game.textAlign = 'left'
    // game.fillText('Platzi', 25,25)