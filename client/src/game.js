import globals from "./globals.js";
import {initEvents, initFakeCards, initHTMLelements, initVars} from "./initialize.js";
import update from "./gameLogic.js";
import { render } from "./gameRender.js";


////////////////////////////////////////////////////////////////////////////////////////
// GAME INIT
////////////////////////////////////////////////////////////////////////////////////////

window.onload = init;

function init()
{
    initHTMLelements();

    initVars();

    initEvents();

    //Funcion de Obejtos
    initFakeCards();

    window.requestAnimationFrame(gameLoop);
}


////////////////////////////////////////////////////////////////////////////////////////
// GAME INIT
////////////////////////////////////////////////////////////////////////////////////////


function gameLoop(timeStamp)
{
    //Keep requesting new frames
    window.requestAnimationFrame(gameLoop, globals.canvas);

    //Tiempo real de ciclo de ejecución 
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000;

    //Tiempo anterior de ciclo de ejecución
    globals.previousCycleMilliseconds = timeStamp;

    //Variable que corrige el tiempo de frame debido a retrasos con respecto al tiempo objetivo (frameTimeObj)
    globals.deltaTime += elapsedCycleSeconds;

    if(globals.deltaTime >= globals.frameTimeObj)
    {
        //Update the game logic. gameLogic.js
        update();

        //Perform the drawing operation gameRender.js
        render();

        //Corregimos los excesos de tiempo
        globals.deltaTime -= globalThis.frameTimeObj;
    }


}

