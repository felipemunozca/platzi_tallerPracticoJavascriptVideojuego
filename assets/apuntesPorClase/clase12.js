//se crea una nueva variable, la cual guardara la posición del emoji regalo, que es el emoji que se utilizara para que el jugador pase al siguiente nivel.
//en teoría una variable const no debería permitir que su valor cambie, es una de sus reglas, pero al estar trabajando con un objeto, lo que cambia son sus valores internos.
const giftPosition = {
    x: undefined,
    y: undefined,
}

/* Se crea una función para determinar el tamaño del tablero de juego. */
function setCanvasSize() {
    //NOTA IMPORTANTE:
    //Se corrige el error en el que el jugador no podia recorrer el tablero completo, y al ir hacia la derecha y tratar de volver a la izquierda, no se podia entrar a la primera fila. Esto se debía a que el tamaño del tablero se estaba generando multiplicando por 0.75 y eso daba muchos decimales, asi que se cambio el valor por 0.8 y se soluciono el problema.
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
            //creo un nuevo condicional, esta vez comparara si dentro del mapa hay una "I" la cual sera el emoji de regalo.
            else if (col == "I") {
                //le asigno la posición en eje X y Y al regalo.
                giftPosition.x = posX;
                giftPosition.y = posY;
                console.log({giftPosition});
                //la posición del regalo se encuentra en: Object { x: 55.425, y: 55.425 }
            }

            game.fillText(simbolo, posX, posY);
        })
    });

    movePlayer();
}

/* función para hacer que el emoji del jugador se mueva en el tablero. */
function movePlayer() {
    //cada vez que el jugador realize un movimiento, voy a evaluar si esta chocando con otro emoji o no, asi que creare una variable por cada distinta colisión que puede haber.
    //la colisión se producirá cuando ambas variables tengan la misma posición.
    //Se puede dar el error que las posiciones no sean 100% iguales debido a los decimales que puede tener cada posición dependiendo del tamaño por de la pantalla, por ejemplo: playerPosition {x: 37.20000000005}. Para evitar este problema, vamos a limitar la cantidad de decimales a utilizar por cada posición, utilizando el método toFixed(). 
    const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
    const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
    //creo una nueva variable que retorne un TRUE, es decir que ambos valores son iguales.
    const giftCollision = giftCollisionX && giftCollisionY;

    //creo una condición para saber si el jugador "choco" o llego al emoji de regalo. Si la respuesta es TRUE, mostrara el mensaje en la consola.
    if (giftCollision) {
        console.log('Subiste de nivel!')
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}