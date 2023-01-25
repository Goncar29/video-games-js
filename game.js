const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives')
const spanTime = document.querySelector('#time')
const spanRecord = document.querySelector('#record')
const pResult = document.querySelector('#result')

let canvasSize;
let elementsSize;
let level = 0;
let lives = 3;

let timeStart;
let timePlayer;
let timeInterval;

const playerPosition = {
    x: undefined,
    y: undefined,
};
const giftPosition = {
    x: undefined,
    y: undefined,
};
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
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
    
    const map = maps[level]; // Elegimos el mapa

    if (!map) {
        gameWin();
        return;
    }

    if(!timeStart){
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split('\n'); // quitamos los espacios vacios al inicio y final y los convertimos en array
    const mapRowCols = mapRows.map(row => row.trim().split('')); // ahora quitamos los espacios a cada array y separamos por cada elemento
    console.log({map, mapRows, mapRowCols});

    showLives();

    // limpiamos el erray de las bombas porque se duplica cada vez que se ejecuta la funcion
    enemyPositions = [];
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
            } else if(col == 'I'){
                giftPosition.x = posX;
                giftPosition.y = posY;
            } else if(col == 'X'){
                enemyPositions.push({
                    x: posX,
                    y: posY,
                })
            }

            //  Renderizamos el mapa con los emojis correspondiente del mapa
            game.fillText(emoji, posX, posY);
            // console.log({ row, rowIndex, col, colIndex });
        });
    });

    movePlayer();
}
//  Renderizamos al jugador
function movePlayer(){
    //colocamos toFixed() porque evitamos la cantidad de decimales que nos genera el error de no poder coincidir con la colicion del regalo y subir de nivel
    const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    const giftCollision = giftCollisionX && giftCollisionY;

    if(giftCollision){
        levelWin();
        console.log('Subiste de nivel')
    }

    const enemyPosition = enemyPositions.find(enemy => {
        const enemyCollitionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollitionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollitionX && enemyCollitionY;
    });

    if(enemyPosition){
        console.log('Chocaste con una bomba')
        levelFail();
    }
        game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function levelWin(){
    console.log('Subiste de nivel');
    level++;
    startGame();
}

function levelFail(){
    console.log('Chocaste contra un enemigo')

    lives--;

    console.log(`lives ${lives}`);

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined; // si perdemos el tiempo vuelve a 0
    }
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function gameWin(){
    console.log('Terminaste el juego!');
    clearInterval(timeInterval)

    const recordTime = localStorage.getItem('record_time');
    const playerTime = ((Date.now() - timeStart)/1000).toFixed(1);

    if(recordTime){ // vemos si hay un tiempo
        if(recordTime > playerTime){ // vemos si el tiempo fue superado
            localStorage.setItem('record_time', playerTime)
            pResult.innerHTML = 'Superaste el record!';
        } else{
            pResult.innerHTML = 'No superaste el tiempo';
        }
    } else{
        localStorage.setItem('record_time', playerTime)
        pResult.innerHTML = 'Primera vez? Muy bien! ahora trata de superar el record!';
    }
    console.log({recordTime, playerTime});
}

function showLives(){
    // creamos un array usando (Array) con la cantidad de vidas y usamos fill para que inserte la cantidad de lives
    const heartsArray = Array(lives).fill(emojis['HEART'])
    console.log(heartsArray)

    spanLives.innerHTML = heartsArray.join(''); // el join es solo para quitar las comas del array
}

function showTime(){
    // Mostramos el tiempo en segundos
    spanTime.innerHTML = ((Date.now() - timeStart)/1000).toFixed(1);
}

function showRecord(){
    // Mostramos el tiempo en segundos
    spanRecord.innerHTML = localStorage.getItem('record_time');
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
    //condicion para evitar salir del mapa
    if ((playerPosition.y - elementsSize) < elementsSize){
        console.log('OUT')
    }else{
        playerPosition.y -= elementsSize;
        startGame(); //volvemos a ejecutar el juego con cada movimietno del jugador para eliminar su posicion anterior    
    }
}
function moveLeft(){
    console.log('Me quiero mover hacia la izquierda')

    if ((playerPosition.x - elementsSize) < elementsSize){
        console.log('OUT')
    }else{
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight(){
    console.log('Me quiero mover hacia la derecha')
    
    if ((playerPosition.x + elementsSize) > canvasSize){
        console.log('OUT')
    }else{
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown(){
    console.log('Me quiero mover hacia abajo')
    
    if ((playerPosition.y + elementsSize) > canvasSize){
        console.log('OUT')
    }else{
        playerPosition.y += elementsSize;
        startGame();
    }
}

/*     game.fiilRect(0,0,100,100) //definimos el lugar donde iniciar el trazo (cualquier cosa)
    game.clearRect(50,50,50,50)  // borramos trazo
    game.clearRect()
    game.clearRect(0,0,50,50) 

    game.font = '25px Verdana'
    game.fillStyle = 'purple';
    game.textAlign = 'left'
    game.fillText('Platzi', 25, 25) */