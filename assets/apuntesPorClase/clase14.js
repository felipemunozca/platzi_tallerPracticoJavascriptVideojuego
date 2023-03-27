//creo una nueva variable, la cual tendrá el valor del primer mapa, es decir el -cero.
let level = 0;

/* Función con la que se iniciara el juego, el orden del mapa y la impresión de los emojis. */
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    //reemplazo el valor de maps de 0 a una variable para que asi se ejecuten los demás mapas de forma automática.
    const map = maps[level];

    //creo una nueva condición, que preguntara, si ya no queda ningún mapa en el arreglo (pase los 3 niveles), que ejecute una función.
    if (!map) {
        gameWin();
        //debo agregar un return, para que cuando esta condición se cumpla, se termine la ejecución del código.
        return;
    }

    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(map, mapRows, mapRowCols)

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
        // console.log('Subiste de nivel!')
        //llamo a la función levelWin()
        levelWin();
    }
    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        console.log('Chocaste contra un enemigo :(')
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

//creo una nueva función la que detectara cuando el jugador llegue al icono de regalo y lo pase al siguiente mapa.
function levelWin() {
    console.log('Subiste de nivel!');
    //aumento en 1 la variable level, para pasar al siguiente mapa.
    level++;
    startGame();
}

//creo una función para mostrar un mensaje que dice que lograste terminar el juego.
function gameWin() {
    console.log('Felicidades, completaste el juego.')
}