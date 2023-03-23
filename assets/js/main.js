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

/* Se crea un evento utilizando load, para que cargue el juego en cuanto se abra la pantalla. */
window.addEventListener('load', setCanvasSize);
/* Se crea un evento utilizando resize, que escuchara cada vez que se haga un cambio de tamaño en la pantalla. */
window.addEventListener('resize', setCanvasSize);

/* Se crea una funcion para determinar el tamaño del tablero de juego. */
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

/* Funcion con la que se iniciara el juego, el orden del mapa y la impresion de los emojis. */
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(map, mapRows, mapRowCols)

    game.clearRect(0 , 0, canvasSize, canvasSize);

    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const simbolo = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            if (col == 'O') {
                if (!playerPosition.x && !playerPosition.y) {
                    // console.log({ posX, posY});
                    playerPosition.x = posX;
                    playerPosition.y = posY;
                    // console.log({playerPosition})
                }
                
            }

            game.fillText(simbolo, posX, posY);
        })
    });

    movePlayer();
}

/* funcion para hacer que el emoji del jugador se mueva en el tablero. */
function movePlayer() {
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}

/* Se escucha un evento para detectar cuando un usuario presione un boton del teclado. */
window.addEventListener('keydown', moveByKeys);
/* Se escuchan eventos para detectar cuando un usuario presione uno de los botones del juego. */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

/* funcion para comprobar que tecla se esta presionando. */
function moveByKeys(event) {
    // console.log(event);
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}

/* funciones para detectar que tecla o que boton se estan presionando. */
function moveUp() {
    // console.log('Me muevo hacia arriba.');
    playerPosition.y -= elementsSize;
    startGame();
}
function moveLeft() {
    // console.log('Me muevo hacia la izquierda.');
    playerPosition.x -= elementsSize;
    startGame();
}
function moveRight() {
    // console.log('Me muevo hacia la derecha.');
    playerPosition.x += elementsSize;
    startGame();
}
function moveDown() {
    // console.log('Me muevo hacia abajo.')
    playerPosition.y += elementsSize;
    startGame();
}

