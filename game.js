const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.querySelector('#up')
const btnLeft = document.querySelector('#left')
const btnRight = document.querySelector('#right')
const btnDown = document.querySelector('#down')

let canvasSize;
let elementSize;

const playerPosition = {
    x: undefined,
    y: undefined
}

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

    elementSize = (canvasSize / 10)-1
    startGame()
}

function startGame(){
    console.log({elementSize, canvasSize});

    game.font = elementSize + 'px Verdana'
    game.textAlign = 'end'

    const map = maps[0];
    const mapRows = map.trim().split("\n")
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    mapRowCols.forEach((row, rowI) => {
        row.forEach((col,colI) =>{
            const emoji = emojis[col]
            const posX = elementSize * (colI + 1)
            const posY = elementSize * (rowI + 1)
            game.fillText(emoji, posX, posY)
        })
    })

    // for (let i = 1; i <= 10; i++) {
    //     for (let j = 1; j <= 10; j++) {
    //         game.fillText(emojis[mapRowCols[i -1][j-1]], elementSize * j, elementSize * i) 
    //     } 
    // }
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
    console.log('Me quiero mover hacia arriba')
}
function moveLeft(){
    console.log('Me quiero mover hacia izq')
}
function moveRight(){
    console.log('Me quiero mover hacia der')
}
function moveDown(){
    console.log('Me quiero mover hacia abajo')
}



// game.fillRect(0,50,100,100);
    // game.clearRect(50,50,50,50);
    // game.clearRect(50,0,50,50)

    // game.font = '25px Verdana'
    // game.fillStyle = 'purple'
    // game.textAlign = 'left'
    // game.fillText('Platzi', 25,25)