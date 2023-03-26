/* funciones para detectar que tecla o que botón se están presionando. */
function moveUp() {
    // console.log('Me muevo hacia arriba.');
    
    //se creara el código para evitar que el jugador se salga del tablero.
    //esto se hara mediante una validación con if. Si el la nueva posición que tendra el emoji nos da un numero negativo, o una posición mayor a las dimensiones del tablero, mostrar por consola un error.
    //EXPLICACIÓN, el objeto playerPosition tiene los valores de x=55.425 y y=554.25 . El valor de la variable elementSize es de 55.425 por lo que (554.25 - 55.425) < 55.425 y se cumple la condición, cada vez que el jugador se mueva hacia arriba el unico valor que cambiara sera el playerPosition en el eje Y por lo que cuando se rompa el calculo, el jugador no podra moverse mas.

    if ((playerPosition.y - elementsSize) < elementsSize) {
        console.log('OUT');
        console.log(playerPosition.y - elementsSize)
    } else {
        console.log(playerPosition.y - elementsSize)
        playerPosition.y -= elementsSize;
        startGame();
    }
    
}
function moveLeft() {
    // console.log('Me muevo hacia la izquierda.');

    //si vamos a movernos entre IZQUIERDA y DERECHA se debe utilizar el eje X.
    if ((playerPosition.x - elementsSize) < elementsSize) {
        console.log('OUT');
    } else {
        playerPosition.x -= elementsSize;
        startGame();
    }
}
function moveRight() {
    // console.log('Me muevo hacia la derecha.');
    //si vamos a movernos hacia la derecha, el tope debe ser el tamaño del canvas. Como le estare sumando valores a playerPosition, la comparacion debe ser mayor que el tamaño completo del canvas.
    if ((playerPosition.x + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.x += elementsSize;
        startGame();
    }
    
    
}
function moveDown() {
    // console.log('Me muevo hacia abajo.')
    if ((playerPosition.y + elementsSize) > canvasSize) {
        console.log('OUT');
    } else {
        playerPosition.y += elementsSize;
        startGame();
    }
}
/* NOTA IMPORTANTE: debibo a los cálculos de las variables, cuando el jugador se mueve completamente a la derecha y luego trata de volver a la primera linea, no puedo, debido a que la variable utiliza muchos decimales y no se cumple la condición de ser menor que. Esto se corregirá en futuras clases. */