import globals from "./globals.js";
import { State } from "./constants.js";

export default function update()
{
    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case State.LOADING:
            console.log("Loading assets...");
            break;

        case State.PLAYING:
            // playGame();
            break;

        default:
            console.error("Error: Game State invalid");
    }
}


function playGame()
{
    //... ANTERIor

    //Sacamos en pantalla las coordenadas del ratón 
    globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;
}