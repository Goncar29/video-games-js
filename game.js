const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

let canvasSize;
let elementSize;

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

    elementSize = canvasSize / 10;

    startGame();
}

function startGame() {

    console.log({ canvasSize, elementSize });

    game.font = elementSize + 'px Verdana';
    game.textAlign = 'end';

    for (let i = 1; i <= 10; i++){
        game.fillText(emojis['X'], elementSize, elementSize * i);
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