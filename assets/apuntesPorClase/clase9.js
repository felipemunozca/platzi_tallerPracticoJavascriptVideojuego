//se crea una nueva variable la cual guardara en memoria, la posicion del jugador dentro del tablero. Esto sera un objeto y tendra dos posiciones, se registraran el eje X y Y y tendran un valor de undefined.
const playerPosition = {
    x: undefined,
    y: undefined,
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

            //agrego una nueva validacion. Si el valor de columna es igual a "O" le asignare las posiciones en los ejes X e Y.
            if (col == 'O') {
                //para saber las posiciones de los ejes puedo imprimir por consola la posicion en la que esta iniciando el jugador, me mostrara un mensaje como: Object { posX: 55.425, posY: 554.25 } ya que se mide en base a los pixeles de la pantalla.
                console.log({ posX, posY});
                playerPosition.x = posX;
                playerPosition.y = posY;
                //ahora pruebo si mi objeto playerPosition tiene las coordenadas guardadas.
                console.log({playerPosition})
            }

            game.fillText(simbolo, posX, posY);
        })
    });

    //una vez que el mapa este renderizado, llamo a la funcion movePlayer para que muestre cada vez que el usuario haga un movimiento.
    //pero como no estoy borrando los movimientos anteriores, apareceran muchas calaberas en el tablero.
    movePlayer();
}


//se crean funciones para detectar que tecla o que boton se estan presionando.
function moveUp() {
    console.log('Me muevo hacia arriba.');
    //para poder hacer el emoji se mueva por el tablero, debo hacer que se ejecute al llamar a la funcion correspondiente, y esto se lograra volviendo a calcular los tamaños del tablero.
    //para obtener una nueva posicion, debo sumar o restar pixeles del playerPosition. Para el caso de "subir" le voy a restar el valor de elementSize.
    playerPosition.y -= elementsSize;
    //vuelvo a llamar a la funcion de mover al jugador, para que recalcule la posicion.
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

//se crea un nueva funcion para hacer que el emoji del jugador se mueva en el tablero.
function movePlayer() {
    //se utiliza el metodo fillText y se le pasan como parametros: el nombre del emoji a utilizar, la posicion del jugador en los ejex X y Y.
    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y)
}