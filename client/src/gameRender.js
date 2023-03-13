import globals from "./globals.js";
import { State } from "./constants.js";

//Funcion que renderiza los graficos

export function render()
{
    globals.ctx.clearRect(0,0,globals.canvas.width, globals.canvas.height);
    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case State.LOADING:
            //Draw loading spinner
            break;

        case State.PLAYING:
            drawGame();
            break;

        default:
            console.error("Error: Game State invaldi");
    }
}

function drawGame()
{
    //... A completar
}


function renderMap ()
{
    
}