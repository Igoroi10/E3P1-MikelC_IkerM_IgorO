import globals from "./globals.js";
import { initEvents, initFakeCards, initHTMLelements, initVars, loadAssets, initCardInfo, initCardLinks, initSlots, getAllUsers } from "./initialize.js";
import {update, localStorageCheck} from "./gameLogic.js";
import { render } from "./gameRender.js";
import { State } from "./constants.js";


////////////////////////////////////////////////////////////////////////////////////////
// GAME INIT
////////////////////////////////////////////////////////////////////////////////////////

window.onload = init;

function init()
{
    localStorageCheck();

    initHTMLelements();

    loadAssets();

    initEvents();

    initSlots();

    initVars();

    // initEvents();

    //Funcion de Obejtos
    initFakeCards();

    initCardInfo();

    getAllUsers();
}


////////////////////////////////////////////////////////////////////////////////////////
// GAME INIT
////////////////////////////////////////////////////////////////////////////////////////


function gameLoop(timeStamp)
{
    // console.log("gameloop");
    //Keep requesting new frames

    //Tiempo real de ciclo de ejecución 
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000;

    //Tiempo anterior de ciclo de ejecución
    globals.previousCycleMilliseconds = timeStamp;

    //Variable que corrige el tiempo de frame debido a retrasos con respecto al tiempo objetivo (frameTimeObj)
    globals.deltaTime += elapsedCycleSeconds;
    // console.log(globals.deltaTime);

    if(globals.deltaTime >= globals.frameTimeObj)
    {
        // console.log("entra en gameLoop if");
        //Update the game logic. gameLogic.js
        update();

        //Perform the drawing operation gameRender.js
        render();

        //Corregimos los excesos de tiempo
        globals.deltaTime -= globals.frameTimeObj;
        console.log("Turno Jugador: " + globals.turnState);
    }

    if(globals.gameState === State.PLAYING)
    {
        requestAnimationFrame(gameLoop);
    }

    else
        cancelAnimationFrame(gameLoop);

}


export 
{
    gameLoop
}