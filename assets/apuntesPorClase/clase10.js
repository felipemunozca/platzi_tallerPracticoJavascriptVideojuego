/* Funcion con la que se iniciara el juego, el orden del mapa y la impresion de los emojis. */
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    // console.log(map, mapRows, mapRowCols)

    //cada vez que se llame a la funcion starGame() antes de imprimir los mapas en el tablero, se utilizara el metodo clearRect() para borrar todo, siguiendo la estrucuta de la formula clearRect(x, y, width, height) se borrara las posiciones desde el eje X = 0, eje Y = 0 hasta el tamaño del canvas width = canvasSize y height = canvasSize.
    game.clearRect(0 , 0, canvasSize, canvasSize);

    //Refactorizacion del codigo de dos ciclos for.
    mapRowCols.forEach((row, rowIndex) => {
        row.forEach((col, colIndex) => {
            const simbolo = emojis[col];
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);

            //Ahora con los pequeños cambios se produce un error, ya que cada vez que el mapa tenga una O se renderiza la posicion del jugador dentro de playerPosition, por lo tanto, cada vez que se vuelve a ejecutar la funcion startGame(), se vuelve a asignar la posicion del jugador en el punto de partida.
            //para solucionar este problema, se debe crear un nuevo condicional que haga la pregunta que si playerPosition tanto en x como en y tiene  un valor distinto a undefined, que no vuelva al jugador al punto de partida.
            if (col == 'O') {
                //si playerPosition {x, y} son distintos de cero, undefined o null, se ejecuta el codigo que asigna la posicion del emoji.
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


/* funciones para detectar que tecla o que boton se estan presionando. */
function moveUp() {
    // console.log('Me muevo hacia arriba.');
    playerPosition.y -= elementsSize;
    // movePlayer();
    //ahora para poder utilizar el metodo clearRect() y borrar todo el tablero cada vez que se presione una tecla o boton, debo cambiar la funcion que llamaba por startGame()
    startGame();
}
//agrego los movimientos a las demas funciones.
function moveLeft() {
    // console.log('Me muevo hacia la izquierda.');
    //moveLeft se mueve en el eje X por lo que debe restar para ir a la izquierda
    playerPosition.x -= elementsSize;
    startGame();
}
function moveRight() {
    // console.log('Me muevo hacia la derecha.');
    //moveRight se mueve en el eje X por lo que debe sumar para ir a la derecha.
    playerPosition.x += elementsSize;
    startGame();
}
function moveDown() {
    // console.log('Me muevo hacia abajo.')
    //moveDown se mueve en el eje Y por lo que debe sumar para moverse hacia abajo
    playerPosition.y += elementsSize;
    startGame();
}
