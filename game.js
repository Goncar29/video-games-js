const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

window.addEventListener('load', starGame);

function starGame() {
    game.fiilRect(0,0,100,100) //definimos el lugar donde iniciar el trazo (cualquier cosa)
    game.clearRect(50,50,50,50)  // borramos trazo
    game.clearRect()
    game.clearRect(0,0,50,50) 

    game.font = '25px Verdana'
    game.fillStyle = 'purple';
    game.textAlign = 'left'
    game.fillText('Platzi', 25, 25)
}
