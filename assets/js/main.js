console.log('Comienza el curso...')

/* Se crean las variables que se recibiran desde el archivo index.html. */
const canvas = document.querySelector("#game");


/* Se crean las variables propias del juego. */
//se utiliza el metodo getContext() para decir que canvas sera renderizado en 2 dimenciones, es decir, tendra un eje X y un eje Y.
const game = canvas.getContext('2d');

//Se crea un evento utilizando load, para que cargue el juego en cuanto se abra la pantalla.
window.addEventListener('load', startGame());

//Se crea una funcion que se ejecutara al iniciar el juego.
function startGame() {
    //fillRect() -> metodo para dibujar el trazo al cual se le deben indicar cordenadas de los ejes X y Y. Recibira cuatro argumentos:
    //fillRect( xinicial, yinicial, width, height)
    //primero, donde inicia el eje X.
    //segundo, donde inicia el eje y.
    //tercero, el ancho que tendra el trazo.
    //cuarto, el alto que tendra el trazo.
    game.fillRect(0,0,100,100); //se crea un cuadrado dentro del canvas.
    //clearRect() -> metodo para borrar un trazo al cual se le deben indicar cordenadas de los ejes X y Y. Recibe los mimos argumentos que el metodo anterior.
    game.clearRect(0,0,50,50); //se borra un cuadrado dentro del cuadrado que ya habia creado.
    game.clearRect(50,50,50,50); //borrar la parte de abajo el cuadrado, creando un patron de tablero de ajedrez.

    //ahora si quiero crear un nuevo cuadro, en el lado opuesto del cambas, primero escribo el 200 que representa al eje x y el 50 al eje y. Si estos valores son mayores el dibujo se saldra del canvas.
    game.fillRect(200,50,100,100);
    
    //font y fillStyle no son metodos. Sino que se declaran como atributos que recibiran valores, para personalizar mi mensaje. Son como las propiedades de CSS.
    game.font = '25px Verdana';
    game.fillStyle = 'purple';
    game.textAlign = 'center';
    //ver imagen 02-text-align para entender porque el mensaje cambia de posicion dependiendo de la palabra que se utilice.

    //fillText() -> metodo que nos permite insertar texto. Se debe indicar el texto y las cordenadas donde ira el texto. Si las cordenadsa son 0 y 0 el mensaje no se vera, tienen que ser mayores a ese numero.
    game.fillText('Platzi', 150, 75);

    
}