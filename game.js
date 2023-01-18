const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
};

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

    const map = maps[0]; // Elegimos el mapa
    const mapRows = map.trim().split('\n'); // quitamos los espacios vacios al inicio y final y los convertimos en array
    const mapRowCols = mapRows.map(row => row.trim().split('')); // ahora quitamos los espacios a cada array y separamos por cada elemento
    console.log({map, mapRows, mapRowCols});
    
    // borramos todo el mapa para que cada movimiento del jugador desaparezca su posicion anterior
    game.clearRect(0, 0, canvasSize, canvasSize); 
    // Posicionamos cada elemento del mapa 
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) =>{
            const emoji = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);
        // Esto es lo mismo que el forEach de arriba
        // for (let row = 1; row <= 10; row++){
        //     for (let col = 1; col <= 10; col++){
        //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        //     }
        // }

            //  Aqui debe de ir el jugador
            if(col == 'O'){
                if(!playerPosition.x && !playerPosition.y){
                    console.log({ posX, posY });
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    console.log({playerPosition});
                }
            }

            //  Renderizamos el mapa con los emojis correspondiente del mapa
            game.fillText(emoji, posX, posY);
            console.log({ row, rowIndex, col, colIndex });
        });
    });

    movePlayer();
}
//  Renderizamos al jugador
function movePlayer(){
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event){
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}
function moveUp(){
    console.log('Me quiero mover hacia arriba')
    playerPosition.y -= elementsSize;
    startGame(); //volvemos a ejecutar el juego con cada movimietno del jugador para eliminar su posicion anterior
}
function moveLeft(){
    console.log('Me quiero mover hacia la izquierda')
    playerPosition.x -= elementsSize;
    startGame();
}
function moveRight(){
    console.log('Me quiero mover hacia la derecha')
    playerPosition.x += elementsSize;
    startGame();
}
function moveDown(){
    console.log('Me quiero mover hacia abajo')
    playerPosition.y += elementsSize;
    startGame();
}

/*     game.fiilRect(0,0,100,100) //definimos el lugar donde iniciar el trazo (cualquier cosa)
    game.clearRect(50,50,50,50)  // borramos trazo
    game.clearRect()
    game.clearRect(0,0,50,50) 

    game.font = '25px Verdana'
    game.fillStyle = 'purple';
    game.textAlign = 'left'
    game.fillText('Platzi', 25, 25) */