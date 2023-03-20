//funcion que cargara los emojis en el tablero.
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split("\n");
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log(map, mapRows, mapRowCols)

    // for (let row = 1; row <= 10; row++) {
    //     for (let col = 1; col <= 10; col++) {
    //         game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    //     }
    // }

    /* Crear un ciclo for dentro de otro ciclo for y luego buscar posiciones dentro de un arreglo restando -1 en cada arreglo se hace complicado de leer, por lo que en esta clase se va a REFACTORIZAR el codigo para mejorar la ejecucion y la lectura. */

    //creo una nueva forma de recorrer el arreglo mapRowCols.
    //el primer atributo que voy a recorrer es una fila row.
    //dentro de cada metodo forEach() agregare un nuevo argumento para guardar el index de cada emoji.
    mapRowCols.forEach((row, rowIndex) => {
        //ahora con un segundo forEach voy a recorrer cada fila para recorrer cada columna.
        row.forEach((col, colIndex) => {
            //ahora ya puedo obtener todas las posiciones de filas y columnas con sus respectivos simbolos, por lo que se imprime en la consola, apareceran los 100 simbolos en la consola.
            console.log({row, col});
            
            //siguiendo la misma logica anterior, si ya tengo el valor de cada caracter del mapa, puedo utilizar la consola para imprimir los 100 emojis de cada mapa.
            console.log(emojis[col]);
            
            //ya que tengo los emojis de cada fila y columna, los paso a una variable.
            const simbolo = emojis[col];
            
            //ahora tengo que definir las posiciones X e Y de cada emoji. Pero como no tengo el indice de cada ciclo for para recordar la posicion de cada emoji, para solucionar esto, el metodo forEach() permite tener un segundo argumento, que es la posicion del index, para ello creare un nuevo argumento en cada forEach.
            //ahora ya puedo comenzar a imprimir cada emoji en el tablero utilizando el mismo metodo fillText() y como parametros ira la variable simbolo, elementSize el tamaño de la pantalla por el indice de la columna, y la posicion donde comenzara que es la cero.
            //si se imprime el codigo tal cual, la primera fila de bombas se vera sobre el tablero, solo vera una pequeña parte de cada emoji. 
            /* game.fillText(simbolo, elementsSize * colIndex, 0); */
            
            //creo dos nuevas variables para guardar las posiciones de los ejes X e Y. despues le debo sumar +1 a la posicion ya que debo iniciar el indice en 1 ya que los arreglos comienzan en 0 y ese valor no se imprimiria en el tablero. A partir desde ahi se imprimira la coordenada igual que el mapa de mapas.js
            const posX = elementsSize * (colIndex + 1);
            const posY = elementsSize * (rowIndex + 1);
            game.fillText(simbolo, posX, posY);
        })
    });
}