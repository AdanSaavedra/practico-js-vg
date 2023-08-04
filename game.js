// variables from html
const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')
const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')
const btnStart = document.querySelector('#startButton')
const divStart = document.querySelector('#start')
const divRestart = document.querySelector('#restart')
const btnRestart = document.querySelector('#restartButton')

// Variables in js
let canvasSize;
let elementSize;
let level = 0;
let lives = 3; 
let timeStart;
let timePlayer;
let timeInterval

// Player position before start
const playerPosition = {
    x: undefined,
    y: undefined
}
// Gift position before start
const giftPosition = {
    x: undefined,
    y: undefined
}
// bombs array
let enemiesPosition= []

// event listener when load and resize
window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

// Set canvas size and start game
function setCanvasSize(){
    if(window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7;
    }else{
        canvasSize = window.innerHeight * 0.7
    }

    canvas.setAttribute('width', canvasSize)
    canvas.setAttribute('height', canvasSize)

    elementSize = (canvasSize / 10)
    startGame()
}

btnStart.addEventListener('click', pressPlay)
function pressPlay(){
    divStart.style.opacity = '0'
    divStart.style.transition = '300ms'
    if(!timeStart){
        timeStart= Date.now()
        timeInterval = setInterval(showTime,100);
        showRecord();
    }
}

function startGame(){
    // Canvas settings
    game.font = elementSize + 'px Verdana'
    game.textAlign = 'end'

    // set the map level
    const map = maps[level];

    if(!map){
        gameWin();
        return
    }
    showRecord();
    

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

            // Assign start position
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
    // verify if player is in the gift position, if true then go to next level
    if(Math.trunc(playerPosition.x) === Math.trunc(giftPosition.x) && Math.trunc(playerPosition.y) === Math.trunc(giftPosition.y)){
        levelWin()
    }
    // verify if player is on a bomb position
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

    const recordTime = localStorage.getItem('record_time');
    const playerTime = formatTime(Date.now() - timeStart)
    divRestart.style.opacity = '1'
    divRestart.style.transition = '300ms'
    divStart.style.zIndex='-999'
    if(recordTime){
        if (recordTime>= playerTime){
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML = 'Felicidades! Tienes un Nuevo Record!'
        }else{
            pResult.innerHTML = 'Vayaa... no lograste superar tu record.'
        }
    }else{
        localStorage.setItem('record_time', playerTime)
        pResult.innerHTML = 'Primera vez?'
    }
    console.log({recordTime, playerTime})
}

function levelFailed(){
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
function showRecord(){
    spanRecord.innerHTML = localStorage.getItem('record_time')
}
// Formatting the time
function formatTime(ms){
    const cs = parseInt(ms/10) % 100
    const seg = parseInt(ms/1000) % 60
    const min = parseInt(ms/60000) % 60
    const csStr = `0${cs}`.slice(-2)
    const segStr = `0${seg}`.slice(-2)
    const minStr = `0${min}`.slice(-2)
    return `${minStr}:${segStr}:${csStr}`
}

// set listener to buttons
window.addEventListener('keydown',moveByKeys)
btnUp?.addEventListener('click', moveUp);
btnLeft?.addEventListener('click', moveLeft);
btnRight?.addEventListener('click', moveRight);
btnDown?.addEventListener('click', moveDown);

// set keys options
function moveByKeys(event){
    if(event.key == 'ArrowUp' || event.key=='w' || event.key=='W') moveUp()
    else if(event.key == 'ArrowLeft' || event.key=='a' || event.key=='A') moveLeft()
    else if(event.key == 'ArrowRight' || event.key=='d' || event.key=='D') moveRight()
    else if(event.key == 'ArrowDown' || event.key=='s' || event.key=='s') moveDown()
}
function moveUp(){
    if(Math.trunc(playerPosition.y) > Math.trunc(elementSize)){
        playerPosition.y-= elementSize;
        startGame()
    }
}
function moveLeft(){
    if(Math.trunc(playerPosition.x) > Math.trunc(elementSize)){
        playerPosition.x-= elementSize;
        startGame()
    }
}
function moveRight(){
    if(Math.ceil(playerPosition.x) < Math.trunc(canvasSize)){
        playerPosition.x+= elementSize;
        startGame()
    }
}
function moveDown(){
    if(playerPosition.y < canvasSize){
        playerPosition.y+= elementSize;
        startGame()
    }
    
}
btnRestart.addEventListener('click', pressRestart)
function pressRestart(){
    window.location.reload();
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