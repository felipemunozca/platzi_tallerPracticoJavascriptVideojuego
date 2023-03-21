
/* Se crean las variables que se recibiran desde el archivo index.html. */
const canvas = document.querySelector("#game");
const btnUp = document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');



//se crearan eventos para detectar cuando un usuario presione un boton.
//creare una funcion posteriormente llamada moveUp, moveLeft, moveLeft, moveDown.
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);
//creo un nuevo evento que escuche a window o "la ventana del navegador" de tipo keydown o "presionar tecla",  el cual registrara los movimientos de las flechas del teclado. Adicionalmente agrega una nueva funcion donde se crearan los ciclos para revisar que tecla fue la que presiono.
window.addEventListener('keydown', moveByKeys);

//creo las funciones de los eventos addEventListener que representen a que boton se esta presionando.
function moveUp() {
    console.log('Me muevo hacia arriba.');
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

//creo una funcion para detectar que tecla se esta presionando en el teclado, la cual sera recibido como un parametro de evento.
function moveByKeys(event) {
    console.log(event);
    //ahora podre ver toda la informacion de cada tecla que se haya presionado en la consola, si se presiona la flecha para ver mas detalles, una de las propiedades es "key" la cual muestra que valor tiene cada tecla. Ese es el valor que utilizaremos para este juego.
    //ahora creo un condicional para preguntar que tecla se esta presionando, registrando el evento, el parametro key y si es igual a la palabra clave ArrowUp.
    // if (event.key == 'ArrowUp') {
    //     moveUp();
    // } else if (event.key == 'ArrowLeft') {
    //     moveLeft();
    // } else if (event.key == 'ArrowRight') {
    //     moveRight();
    // } else if (event.key == 'ArrowDown') {
    //     moveDown();
    // }

    //cuando un if solo tiene una opcion, se puede refactorizar el codigo, y quitar las llaves de cada ciclo, para dejar la ejecucion de cada evento en una sola linea.
    if (event.key == 'ArrowUp') moveUp();
    else if (event.key == 'ArrowLeft') moveLeft();
    else if (event.key == 'ArrowRight') moveRight();
    else if (event.key == 'ArrowDown') moveDown();

}