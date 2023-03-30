//creo una nueva variable donde aparecerá el tiempo que lleva jugando.
const spanTime = document.querySelector('#time');

//creo nuevas variables, las cuales no tendrá valor de momento.
let timeStart;
let timePlayer;
let timeInterval;

/* Función con la que se iniciara el juego, el orden del mapa y la impresión de los emojis. */
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    //apenas cargue la pantalla del juego, el tiempo comenzara a correr.
    //creo una condición que preguntara si la variable timeStart NO tiene ningún valor, se le asignara un tiempo utilizando el constructor Date().
    if (!timeStart) {
        timeStart = Date.now();
        //utilizo la variable timeInterval la cual sera igual la función setInterval()
        //setInterval() -> es una función de javascript que nos permite enviar otra función dentro, junto con un tiempo de espera para que se ejecute (callback). Este intervalo se ejecutara SIEMPRE cada cierto intervalo de tiempo hasta que el mismo código la detenga.
        //NO CONFUNDIR CON setTimeout()
        //setTimeout() -> función de javascript que funciona igual que setInterval() la única diferencia, es que esta se ejecutara solo UNA VEZ después de cumplirse el tiempo de espera del callback.
        //setInterval() tendrá como argumentos la función showTime() que se estará ejecutando cada 100 milisegundos.
        timeInterval = setInterval(showTime, 100);
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


function gameWin() {
    console.log('Felicidades, completaste el juego.')
    //cuando el jugador complete el juego, el tiempo se debe detener, para eso puedo utilizar la función clearInterval().
    //clearInterval() -> función de javascript que se utiliza para DETENER la ejecución de un intervalo.
    clearInterval(timeInterval);
}

function gameFail() {
    // console.log('Chocaste contra un enemigo.');

    lives--;
    // console.log(`me quedan ${lives} vidas.`)

    if (lives <= 0) {
        level = 0;
        lives = 3;
        //si se me acaban las vidas, también debo resetear el tiempo de juego.
        timeStart = undefined;
    }

    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}


function showTime() {
    spanTime.innerHTML = Date.now() - timeStart;
}



//Ejemplo de código de compañero de como imprimir el tiempo en:
//mm:ss:msms
function formatTimeClassmate(ms){
    const cs = parseInt(ms/10) % 100
    const seg = parseInt(ms/1000) % 60
    const min = parseInt(ms/60000) % 60
    const csStr = `${cs}`.padStart(2,"0")
    const segStr = `${seg}`.padStart(2,"0")
    const minStr = `${min}`.padStart(2,"0")
    return`${minStr}:${segStr}:${csStr}`
}
function showTimeClassmate(){
    spanTime.innerHTML = formatTime(Date.now()-timeStart);
}