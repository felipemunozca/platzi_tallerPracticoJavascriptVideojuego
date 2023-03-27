//creo una nueva variable para llevar el conteo de las vidas.
let lives = 3;

/* función para hacer que el emoji del jugador se mueva en el tablero. */
function movePlayer() {
    const giftCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
    const giftCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
    const giftCollision = giftCollisionX && giftCollisionY;

    if (giftCollision) {
        // console.log('Subiste de nivel!')
        //llamo a la función levelWin()
        levelWin();
    }
    const enemyCollision = enemiesPosition.find(enemy => {
        const enemyCollisionX = enemy.x.toFixed(2) == playerPosition.x.toFixed(2);
        const enemyCollisionY = enemy.y.toFixed(2) == playerPosition.y.toFixed(2);
        return enemyCollisionX && enemyCollisionY;
    });

    if (enemyCollision) {
        // console.log('Chocaste contra un enemigo :(');

        //creo una nueva función al chocar contra un enemigo.
        gameFail();
    }

    game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

function gameFail() {
    console.log('Chocaste contra un enemigo.');

    //cada vez que choque con un enemigo, le restare -1 a la variable lives.
    lives--;
    console.log(`me quedan ${lives} vidas.`)

    //creo un condicional que compare el valor de lives. Si esta variable tiene un valor menor o igual a cero, reseteara tanto los valores de level como de lives, asi el juego volverá nuevamente al principio.
    if (lives <= 0) {
        level = 0;
        lives = 3;
    }

    //cuando el jugador choque contra una bomba, se debe volver a la posición de inicio, para ello voy a indicarle a playerPosition volverá a ser undefined, como cuando lo declare como variable.
    //de esta manera el segundo if(!playerPosition.x && !playerPosition.y) dentro de startGame() va a validar que ambos ejes tienen valores undefined por lo que volverá a posicionar al jugador al principio del nivel, sin tener que recargar la pagina.
    playerPosition.x = undefined;
    playerPosition.y = undefined;
    startGame();
}