/* Se crean las variables que se recibiran desde el archivo index.html. */
const canvas = document.querySelector("#game");


/* Se crean las variables propias del juego. */
const game = canvas.getContext('2d');
//paso variables ya creadas a ser de tipo globales.
let canvasSize;
let elementsSize;

//Se crea un evento utilizando load, para que cargue el juego en cuanto se abra la pantalla.
//se hace un  cambio en la logica, en vez de correr al inicio la funcion startGame, se cambia por setCanvasSize, la cual lo primero que hara es ver el tamaño de la pantalla y calcular el tamaño del tablero, y luuego se imprimiran los emojis.
window.addEventListener('load', setCanvasSize);
//creo un nuevo evento que escuchara cada vez que se haga un cambio de tamaño en la pantalla.
//NOTA IMPORTANTE: no agregar los parentesis luego del nombre del funcion ya que la logica de JS se queda esperando algun parametro para recibir.
window.addEventListener('resize', setCanvasSize);

//Se crea una funcion que se ejecutara al iniciar el juego.
function startGame() {
    game.font = elementsSize + 'px Verdana';
    game.textAlign = 'end';
    for (let i = 1; i <= 10; i++) {
        game.fillText(emojis['X'], elementsSize * i, elementsSize);
    }
}

//reorganizo el codigo y creo una nueva funcion que se encargue de calcular el tamaño del canvas.
function setCanvasSize() {
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    elementsSize = canvasSize / 10;
    // console.log({ canvasSize, elementsSize })

    //ahora aqui es donde se ejecuta la funcion para iniciar el juego, ya que lo primero es determinar el tamaño del tablero.
    //estas funciones iran cambiando a medida que avance el curso, por lo que los nombres podran cambiar.
    startGame();
}