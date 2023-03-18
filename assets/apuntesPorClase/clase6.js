console.log('Comienza el curso...')

/* Se crean las variables que se recibiran desde el archivo index.html. */
const canvas = document.querySelector("#game");


/* Se crean las variables propias del juego. */
const game = canvas.getContext('2d');
let canvasSize;
let elementsSize;

//Se crea un evento utilizando load, para que cargue el juego en cuanto se abra la pantalla.
window.addEventListener('load', setCanvasSize);
//Se crea un evento utilizando resize, que escuchara cada vez que se haga un cambio de tamaño en la pantalla.
window.addEventListener('resize', setCanvasSize);

//Se crea una funcion que se ejecutara al iniciar el juego.
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;

    startGame();
}

//funcion que cargara los emojis en el tablero.
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';

    //creo una variable para almacenar el primer mapa creado en mapas.js
    const map = maps[0];
    console.log(map);
    //creo una variable que sera igual a un arreglo de un arreglo (bidemensional) de cada mapa dividiendo cada fila por los saltos de linea.
    //el metodo split() permite separar una cadena de texto o cualquier valor en un arreglo de multiples dimenciones, separando los valores segun lo que se escriba entre los parentesis.
    //Para este caso, se crearan arreglos a partir de las separaciones de saltos de lines \n
    //si se imprime el codigo tal cual esta regla, me creara un arreglo con 12 posiciones, ya que cuenta los espacios vacios donde se abren las comillas invertidas como una linea, y tambien agrega el espacio vacio donde se tabulan los mapas en mapas.js
    /**
     *  0: ""
        1: "    IXXXXXXXXX"
        2: "    -XXXXXXXXX"
        3: "    -XXXXXXXXX"
        4: "    -XXXXXXXXX"
        5: "    -XXXXXXXXX"
        6: "    -XXXXXXXXX"
        7: "    -XXXXXXXXX"
        8: "    -XXXXXXXXX"
        9: "    -XXXXXXXXX"
        10: "    OXXXXXXXXX"
        11: ""
        length: 12
     */
    //para corregir este problema, se deben limpiar estos espacios en blanco. Para ello utilizo el metodo trim
    //trim() -> este metodo elimina los espacios en blanco en ambos extremos de un string.
    //ahora se eliminaron las posiciones 0 y 11 del arreglo que tenia, y se quitaron los espacios en blanco de la posicion 1, pero el resto de filas siguen teniendo el espacio en blanco de la tabulacion.
    const mapRows = map.trim().split("\n");
    console.log(mapRows);

    //ahora necesito las filas del arreglo, que se impriman sin el espacio.
    //ahora la variable mapRows es un arreglo no puedo utilizar el metodo strim() directamente, ya que solo funciona con string. Asi que para poder editar la informacion que estoy recibiendo, con los espacios en blanco, debo crear un nuevo arreglo utilizando el metodo map(), es decir, un nuevo arreglo a partir de otros arreglos.
    //creo una nueva variable mapRowCols la cual sera igual al arreglo mapRows y al metodo .map() y row simboliza a cada fila, convirtiendose en un string y ahora puedo utilizar el metodo string
    //si imprimo el codigo tal cual, queda de la siguiente manera:
    /**
     *  0: "IXXXXXXXXX"
        1: "-XXXXXXXXX"
        2: "-XXXXXXXXX"
        3: "-XXXXXXXXX"
        4: "-XXXXXXXXX"
        5: "-XXXXXXXXX"
        6: "-XXXXXXXXX"
        7: "-XXXXXXXXX"
        8: "-XXXXXXXXX"
        9: "OXXXXXXXXX"
        length: 10
     */
    //ahora que ya no tengo ningun elemento extra en los mapas, utilizare el metodo split() y lo dejo vacio para separar cada caracteres como un objeto unico el cual depues tomara la forma del emoji que corresponda.
    //asi se acaba de crear un arreglo de 10 posiciones. Y cada posicion en si misma es otro arreglo de 10 posiciones. Esto es un arreglo multidimencional.
    const mapRowCols = mapRows.map(row => row.trim().split(''));
    console.log(mapRowCols)

    //para recorrer un arreglo bidimensional debo utilizar un ciclo for y dentro, otro ciclo for.
    //un ciclo for va a representar el movimiento de filas. Y el otro ciclo for representara el movimiento de columnas.
    //una recomendacion es no utilizar dos variables i en un for dentro de otro for, ya que se puede crear confucion, para este caso las variebles "i" seran reemplezadas por "row" e "col" respectivamente.
    for (let row = 1; row <= 10; row++) {
        for (let col = 1; col <= 10; col++) {
            //ahora voy a hacer el cambio para que se imprima el emoji que corresponda segun el caracter del mapa.
            //utilizo la variable mapRowCols para traer cada arreglo. Y MUY IMPORTANTE, como los ciclos for estan contando desde el UNO en adelante, pero los arreglos comienzan en la posicion CERO, le debo restar -1 al entrar a la fila y despues a la columna.
            game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
        }
    }
}