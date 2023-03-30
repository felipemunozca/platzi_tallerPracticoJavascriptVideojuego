console.log('Comienza el curso...')

/* Se crean las variables que se recibirán desde el archivo index.html. */
const canvas = document.querySelector("#game");
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');
const spanLives = document.querySelector('#lives');
const spanTime = document.querySelector('#time');
const spanRecord = document.querySelector('#record');
const result = document.querySelector('#result');

/* Se crean las variables propias del juego. */
const game = canvas.getContext('2d');
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
}

const giftPosition = {
    x: undefined,
    y: undefined,
}

let enemiesPosition = [];

/* Se crea un evento utilizando load, para que cargue el juego en cuanto se abra la pantalla. */
window.addEventListener('load', setCanvasSize);
/* Se crea un evento utilizando resize, que escuchara cada vez que se haga un cambio de tamaño en la pantalla. */
window.addEventListener('resize', setCanvasSize);

/* Se crea una función para determinar el tamaño del tablero de juego. */
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.8;
    } else {
        canvasSize = window.innerHeight * 0.8;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

/* Función con la que se iniciara el juego, el orden del mapa y la impresión de los emojis. */
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    if (!timeStart) {
        timeStart = Date.now();
        timeInterval = setInterval(showTime, 100);
        showRecord();
    }

    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(map, mapRows, mapRowCols)

    showLives();

    enemiesPosition = [];
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
            else if (col == "I") {
                giftPosition.x = posX;
                giftPosition.y = posY;
                // console.log({giftPosition});
            }
            else if (col == 'X') {
                enemiesPosition.push({
                    x: posX,
                    y: posY,
                });
                // console.log(enemiesPosition.length);
            }

            game.fillText(simbolo, posX, posY);
        })
    });

    movePlayer();
}

/* función para hacer que el emoji del jugador se mueva en el tablero. */
function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        levelWin();
    }
    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        gameFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

/* Se escucha un evento para detectar cuando un usuario presione un botón del teclado. */
window.addEventListener('keydown', moveByKeys);
/* Se escuchan eventos para detectar cuando un usuario presione uno de los botones del juego. */
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

/* función para comprobar que tecla se esta presionando. */
function moveByKeys(event) {
    // console.log(event);
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();
}

/* funciones para detectar que tecla o que botón se están presionando. */
function moveUp() {
    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT');
        // console.log(playerPosition.y - elementsSize)
    } else {
        // console.log(playerPosition.y - elementsSize)
        playerPosition.y -= elementsSize;
        startGame();
    }
    
}
function moveLeft() {
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight() {
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
}
function moveDown() {
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}

function levelWin() {
    console.log('Subiste de nivel!');
    level++;
    startGame();
}

function gameWin() {
    console.log('Felicidades, completaste el juego.')
    clearInterval(timeInterval);

    const recordTime = localStorage.getItem('record_time');
    // console.log(recordTime);
    const playerTime = Date.now() - timeStart;

    if (recordTime) {
        if (recordTime >= playerTime) {
            localStorage.setItem('record_time', playerTime);
            // console.log('Superaste el record!!!');
            result.innerHTML = 'Superaste el record!!!';
        } else {
            // console.log('Lo siento, aun no superaste el record.');
            result.innerHTML = 'Lo siento, aun no superaste el record.';
        }
    } else {
        localStorage.setItem('record_time', playerTime);
        result.innerHTML = 'Primera vez? Muy bien, pero ahora trata de superar tu tiempo :)';
    }   
}

function gameFail() {
    // console.log('Chocaste contra un enemigo.');

    lives--;
    // console.log(`me quedan ${lives} vidas.`)

    if (lives <= 0) {
        level = 0;
        lives = 3;
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}

function showLives() {
    const heartsArray = Array(lives).fill(emojis['HEART']);
    // console.log(heartsArray);
    
    spanLives.innerHTML = "";
    heartsArray.forEach(heart => spanLives.append(heart));
}

function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}