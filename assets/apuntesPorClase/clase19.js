//creo nuevos selectores para el record del jugador y el mensaje.
const spanRecord = document.querySelector('#record');
const result = document.querySelector('#result');

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
        //dentro de este condicional inicio la función para mostrar el record de tiempo.
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

function gameWin() {
    console.log('Felicidades, completaste el juego.')
    clearInterval(timeInterval);

    //debo crear una forma de guardar los record del jugador en la memoria del navegador.
    //localStorage -> almacenamiento local en nuestro navegador. Esa información se guarda en un navegador y si se cierra y abre la pagina la recordara, pero solo sera visible desde ese navegador, si cambio a otro navegador, no aparecerá dicha información.
    //localStorage tiene 3 propiedades útiles:
    //setItem() -> guardar la información.
    //getItem() -> leer la información.
    //removeItem() -> borrar la información.

    //creo una variable que buscara en el almacenamiento del navegador algún valor de record de tiempo.    
    const recordTime = localStorage.getItem('record_time');
    // console.log(recordTime);
    //creo una variable para asignar el tiempo que demoro el jugador en completar los 3 niveles.
    const playerTime = Date.now() - timeStart;

    //creo una validación para saber si existe o no un recordTime.
    if (recordTime) {
        //creo una validación dentro de la otra, para saber si el record del jugador es mayor o igual al registro en memoria.
        if (recordTime >= playerTime) {
            //si la condición se cumple, guardo la información en el localStorage.
            localStorage.setItem('record_time', playerTime);
            // console.log('Superaste el record!!!');
            //ahora que la lógica funciona, reemplazo los mensajes de la consola por mensajes que se imprimirán en el HTML.
            result.innerHTML = 'Superaste el record!!!';
        }
        //en el caso que la condición no se cumpla, le envió un mensaje al usuario diciendo que aun no supera el record.
        else {
            // console.log('Lo siento, aun no superaste el record.');
            result.innerHTML = 'Lo siento, aun no superaste el record.';
        }
    }
    //pero que pasa si es la primera vez que se abre el juego, no tendrá ningún record anterior y si se deja el código tal cual, se producirá un error ya que record_time no se ha creado, por lo que se debe crear un else donde el tiempo que se demore el jugador, sera el nuevo record.
    else {
        localStorage.setItem('record_time', playerTime);
        result.innerHTML = 'Primera vez? Muy bien, pero ahora trata de superar tu tiempo :)';
    }   
}

function showRecord() {
    spanRecord.innerHTML = localStorage.getItem('record_time');
}