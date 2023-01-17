const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementsSize;

window.addEventListener('load', startGame);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8;
    }else{
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

function startGame() {
    console.log({ canvasSize, elementsSize });

    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[2];
    const mapRows = map.trim().split('\n'); // quitamos los espacios vacios al inicio y final y los convertimos en array
    const mapRowCols = mapRows.map(row => row.trim().split('')); // ahora quitamos los espacios a cada array y separamos por cada elemento
    console.log({map, mapRows, mapRowCols});

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) =>{
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(emoji, posX, posY);
            console.log({ row, rowIndex, col, colIndex });
        });
    });

    // for (let row = 1; row <= 10; row++){
    //     for (let col = 1; col <= 10; col++){
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    //     }
    // }
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnUDown.addEventListener('click', moveDown);

function moveByKeys(event){
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
function moveUp(){
    console.log('Me quiero mover hacia arriba')
}
function moveLeft(){
    console.log('Me quiero mover hacia la izquierda')
}
function moveRight(){
    console.log('Me quiero mover hacia la derecha')
}
function moveDown(){
    console.log('Me quiero mover hacia abajo')
}

/*     game.fiilRect(0,0,100,100) //definimos el lugar donde iniciar el trazo (cualquier cosa)
    game.clearRect(50,50,50,50)  // borramos trazo
    game.clearRect()
    game.clearRect(0,0,50,50) 

    game.font = '25px Verdana'
    game.fillStyle = 'purple';
    game.textAlign = 'left'
    game.fillText('Platzi', 25, 25) */