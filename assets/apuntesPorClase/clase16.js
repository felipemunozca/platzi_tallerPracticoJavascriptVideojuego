let lives = 3;

/* Función con la que se iniciara el juego, el orden del mapa y la impresión de los emojis. */
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[level];

    if (!map) {
        gameWin();
        return;
    }

    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(map, mapRows, mapRowCols)

    //llamo a la función showLives()
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

//creo una nueva función para mostrar las vidas que le quedan al jugador.
function showLives() {
    //utilizando innerHTML le inserto el emoji corazón.
    //spanLives.innerHTML = emojis['HEART'];

    //creo una nueva variable la cual sera un arreglo, pero algo distinto.
    //En vez de crear un arreglo nuevo, utilizo el "prototipo" de Array, el cual es un constructor de javascript, para declararlo SIEMPRE se escribirá con la primara A en mayúscula.
    //El Array se llenara con las vidas del jugador, y utilizando el método fill().
    const heartsArray = Array(lives).fill(emojis['HEART']); // ejemplo de Array = [1,2,3]
    console.log(heartsArray);
    
    //utilizo el innerHTML igual a vació para poder limpiar el ciclo foreach ya que con cada vuelta se irían agregando mas vidas en el HTML.
    spanLives.innerHTML = "";
    //recorro el arreglo del corazones y por cada elemento encontrado, se llama a la función append() para que inserte los corazones. 
    heartsArray.forEach(heart => spanLives.append(heart));
}

//ejemplo de como un compañero simplifico el código para poder imprimir los corazones.
function showLivesClassmate() {
    spanLives.innerHTML = emojis["HEART"].repeat(lives);
}