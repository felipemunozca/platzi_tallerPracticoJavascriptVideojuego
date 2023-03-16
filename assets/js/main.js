console.log('Comienza el curso...')

/* Se crean las variables que se recibiran desde el archivo index.html. */
const canvas = document.querySelector("#game");


/* Se crean las variables propias del juego. */
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

//Se crea un evento utilizando load, para que cargue el juego en cuanto se abra la pantalla.
window.addEventListener('load', setCanvasSize);
//Se crea un evento utilizando resize, que escuchara cada vez que se haga un cambio de tamaño en la pantalla.
window.addEventListener('resize', setCanvasSize);

//Se crea una funcion que se ejecutara al iniciar el juego.
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

//funcion que cargara los emojis en el tablero.
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize * i, elementsSize);
    }
}