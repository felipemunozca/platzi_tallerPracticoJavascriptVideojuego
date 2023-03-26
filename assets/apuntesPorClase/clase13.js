//creo un arreglo el cual estará vació, en este arreglo se agregaran las posiciones de todas las bombas que aparezcan en el tablero.
//se produce un error al declarar el arreglo como const, ya que no se puede limpiar, asi que se debe cambiar por let.
let enemiesPosition = [];

/* Función con la que se iniciara el juego, el orden del mapa y la impresión de los emojis. */
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(map, mapRows, mapRowCols)

    //para corregir el error de carga de datos duplicados en el arreglo al mover al jugador, dentro de la misma función limpio el arreglo por cada vez que se ejecuta la función.
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
            //creo una nueva condicional, esta vez para renderizar los emojis de bombas en el tablero.
            else if (col == 'X') {
                //utilizo el método push() para enviar todas las posiciones de la bombas dentro del arreglo vació.
                //pero dejar el código de esta manera, produce un error gravisimo, y es que cada vez que el jugador haga un movimiento la función se volverá a ejecutar y el arreglo volverá a recibir las posiciones, por lo que cada vez ira creciendo mas y mas, por ejemplo, en la primera vuelta seran 90 bombas, si me muevo una vez seran 180, si me mueve otra vez seran 270 y asi sucesivamente.
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
        console.log('Subiste de nivel!')
    }

    //utilizo el método find() para recorrer el arreglo de enemigos para que me retorne una respuesta si encuentra algún objeto que cumpla con las condiciones que le establezca.
    const enemyCollision = enemiesPosition.find(enemy => {
        //creo nuevas variables y pregunto si enemy en su eje X y Y son iguales a la posición del jugador en los mismos ejes.
        //también se debe utilizar el método toFixed() para delimitar la cantidad de decimales de cada posición.
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        //retorno una respuesta SOLO si hay colisión en X y Y.
        return enemyCollisionX && enemyCollisionY;
    });

    //creo una nueva validación para determinar si el jugador choca con algún elemento en X o Y que sea un emoji de bomba.
    if (enemyCollision) {
        console.log('Chocaste contra un enemigo :(')
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}