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
    /**** INICIO CLASE 2 ****/
    //fillRect() -> metodo para dibujar el trazo al cual se le deben indicar cordenadas de los ejes X y Y. Recibira cuatro argumentos:
    //fillRect( xinicial, yinicial, width, height)
    //primero, donde inicia el eje X.
    //segundo, donde inicia el eje y.
    //tercero, el ancho que tendra el trazo.
    //cuarto, el alto que tendra el trazo.
    //game.fillRect(0,0,100,100); 
    //se crea un cuadrado dentro del canvas.

    //clearRect() -> metodo para borrar un trazo al cual se le deben indicar cordenadas de los ejes X y Y. Recibe los mimos argumentos que el metodo anterior.
    //game.clearRect(0,0,50,50); 
    //se borra un cuadrado dentro del cuadrado que ya habia creado.
    //game.clearRect(50,50,50,50); 
    //borrar la parte de abajo el cuadrado, creando un patron de tablero de ajedrez.

    //ahora si quiero crear un nuevo cuadro, en el lado opuesto del cambas, primero escribo el 200 que representa al eje x y el 50 al eje y. Si estos valores son mayores el dibujo se saldra del canvas.
    //game.fillRect(200,50,100,100);
    
    //font y fillStyle no son metodos. Sino que se declaran como atributos que recibiran valores, para personalizar mi mensaje. Son como las propiedades de CSS.
    //game.font = '25px Verdana';
    //game.fillStyle = 'purple';
    //game.textAlign = 'center';
    //ver imagen 02-text-align para entender porque el mensaje cambia de posicion dependiendo de la palabra que se utilice.

    //fillText() -> metodo que nos permite insertar texto. Se debe indicar el texto y las cordenadas donde ira el texto. Si las cordenadsa son 0 y 0 el mensaje no se vera, tienen que ser mayores a ese numero.
    //game.fillText('Platzi', 150, 75);
    /**** FINAL CLASE 2 ****/

    /**** INICIO CLASE 3 ****/
    //innerHeight y innerWidth son propiedades de "window" y nos permitiran calcular el alto y ancho de un elemento html a partir de una medida, que suele ser en decimal pero que representa un porcentaje. Por ejemplo el 75% sera el 0.75 
    // canvas.setAttribute('width', window.innerWidth * 0.75);
    // canvas.setAttribute('height', window.innerWidth * 0.75);
    //De esta forma podria crear un cuadrado donde iria la cuadrilla de 10x10 para el juego. PERO no es el metodo que mas me adecua, ya que al cambiar de tamaños de pantalla el cualculo no siempre se procesa bien y se demora en volver a cargarlo.

    //creo una variable vacia, la que posteriormente tendra los valores del width y del height del canvas del juego.
    let canvasSize;

    //ahora necesito crear una formula para poder hacer el calculo de un cuadrado, que sea dinamico, y que no ocupe toda la pantalla.
    //SI el alto es mayor que el ancho, aplico la formula para cambiar el tamaño del ancho.
    //SINO aplico la formula para cambiar el tamaño del alto.
    if (window.innerHeight > window.innerWidth) {
        canvasSize = window.innerWidth * 0.75;
    } else {
        canvasSize = window.innerHeight * 0.75;
    }

    //ahora agrego los atributos a width y height que estan guardados en canvasSize.
    canvas.setAttribute('width', canvasSize);
    canvas.setAttribute('height', canvasSize);

    //ahora vamos a crear la grilla de 10x10 que sera el tablero de juego.
    //Creo una nueva constante la cual sera igual al tamaño del canvas dividido en 10.
    const elementsSize = canvasSize / 10;
    console.log({ canvasSize, elementsSize })

    //ahora agregare los emojis definidos en el arreglo en mapas.js para dibujarlos en el tablero.
    //primero, para hacer que los emojis sean dinamicos y cambien de tamaño junto con la pantalla, concateno el valor de elementsSize con la palabra pixeles. IMPORTANTE, para que funcione, tambien se debe agregar la fuente con que se cargara la fuente.
    game.font = elementsSize + 'px Verdana';
    //utilizo la propiedad textAlign para colocar los emojis pegados a la izquierda del canvas.
    game.textAlign = 'end';
    //se crea un ciclo for para recorrer todas las posiciones del tablero
    for (let i = 1; i <= 10; i++) {
        //utilizando fillText para dibujar en el tablero, se utiliza el arreglo emojis mapas.js y se declara el valor X el cual sera cambiados por bombas.
        //luego con elementsSize le indico cada valor que tiene en el tablaero en el eje Y.
        game.fillText(emojis['X'], elementsSize * i, elementsSize);
    }
    /**** FINAL CLASE 3 ****/
}