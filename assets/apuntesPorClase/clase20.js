/* Se crea una función para determinar el tamaño del tablero de juego. */
function setCanvasSize() {
    //cambiar el tamaño del tablero a un máximo del 70% -> 0.7
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.7;
    } else {
        canvasSize = window.innerHeight * 0.7;
    }

    //tomo la variable canvasSize y utilizando el constructor y el método toFixed() para decirle que tenga cero decimales y con eso evitare todos los problemas de coordenadas generados por los decimales de cada calculo matemático.
    canvasSize = Number(canvasSize.toFixed(0));

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    //el juego tiene un problema grave en su ejecución, cuando se comienza a mover la calavera, se guarda la posición en variables playerPosition, el problema ocurre cuando se cambia el tamaño de pantalla al mismo tiempo que se mueve el jugador, porque la calavera queda con sus posiciones originales.
    //el primer paso sera matar las posiciones guardadas en variables al cambiar el tamaño del tablero.
    playerPosition.x = undefined;
    playerPosition.y = undefined;

    startGame();
}

/* funciones para detectar que tecla o que botón se están presionando. */
function moveUp() {
    
    //utilizo la función fixNumber para poder quitar los decimales de la resta que producirá, de esta manera se corrigen la mayoría de los errores cuando el jugador trata de avanzar y esta al lado del emoji regalo, pero no puede llegar a el.
    //para asegurarme que los cálculos sean parejos en todo momento, utilizare la misma función en cada calculo que se haga al moverse.
    if (fixNumber(playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT');
        // console.log(playerPosition.y - elementsSize)
    } else {
        // console.log(playerPosition.y - elementsSize)
        (playerPosition.y -= elementsSize).toFixed(2);
        startGame();
    }
}
function moveLeft() {
    if (fixNumber(playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        fixNumber(playerPosition.x -= elementsSize);
        startGame();
    }
}
function moveRight() {
    if (fixNumber(playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        fixNumber(playerPosition.x += elementsSize);
        startGame();
    }
}
function moveDown() {
    if (fixNumber(playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        fixNumber(playerPosition.y += elementsSize);
        startGame();
    }
}

//se crea una función para poder reparar los errores producidos por los cambios de pantalla, que se producen con los decimales.
//utilizo el constructor Number de javascript para asegurar que la respuesta que obtenga la función si o si sera un numero, y con un máximo de 2 decimales.
function fixNumber(numero) {
    return Number(numero.toFixed(2));
}