console.log('Comienza el curso...')

/* Se crean las variables que se recibiran desde el archivo index.html. */
const canvas = document.querySelector("#game");
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');

/* Se crean las variables propias del juego. */
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

const playerPosition = {
    x: undefined,
    y: undefined,
}

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

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(map, mapRows, mapRowCols)

    //Refactorizacion del codigo de dos ciclos for.
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const simbolo = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            if (col == 'O') {
                // console.log({ posX, posY});
                playerPosition.x = posX;
                playerPosition.y = posY;
                // console.log({playerPosition})
            }

            game.fillText(simbolo, posX, posY);
        })
    });

    movePlayer();
}

//se crea un nueva funcion para hacer que el emoji del jugador se mueva en el tablero.
function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

//se crea un evento para detectar cuando un usuario presione un boton del teclado.
//se crean eventos para detectar cuando un usuario presione uno de los botones del juego.
window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

//se crea una funcion para filtrar que tecla se esta presionando.
function moveByKeys(event) {
    // console.log(event);
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}

//se crean funciones para detectar que tecla o que boton se estan presionando.
function moveUp() {
    console.log('Me muevo hacia arriba.');
    playerPosition.y -= elementsSize;
    movePlayer();
}
function moveLeft() {
    console.log('Me muevo hacia la izquierda.');
}
function moveRight() {
    console.log('Me muevo hacia la derecha.')
}
function moveDown() {
    console.log('Me muevo hacia abajo.')
}

