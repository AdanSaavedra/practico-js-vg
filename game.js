const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

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

    const map = maps[2];
    const mapRows = map.trim().split("\n")
    const mapRowCols = mapRows.map(row => row.trim().split(''))

    for (let i = 1; i <= 10; i++) {
        for (let j = 1; j <= 10; j++) {
            game.fillText(emojis[mapRowCols[i -1][j-1]], elementSize * j, elementSize * i) 
        } 
    }
}

// game.fillRect(0,50,100,100);
    // game.clearRect(50,50,50,50);
    // game.clearRect(50,0,50,50)

    // game.font = '25px Verdana'
    // game.fillStyle = 'purple'
    // game.textAlign = 'left'
    // game.fillText('Platzi', 25,25)