import globals from "./globals.js";
import { State } from "./constants.js";

export default function update()
{
    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case State.LOADING:
            console.log("Loading assets...");
            loading();
            break;
        
        case State.LOG_IN:
            // playGame();
            break;

        case State.ADMIN_MENU:
            // playGame();
            break;

        case State.PLAYER_MENU:
            // playGame();
            break;

        case State.LOAD_GAME:
            // playGame();
            break;

        case State.PLAYING:
            playGame();
            break;

        case State.STATS:
            // playGame();
            break;
        
        case State.ROUND_END:
            // playGame();
            break;

        case State.GAME_END:
            // playGame();
            break;        

        default:
            console.error("Error: Game State invalid");
    }
}

function displayDeck()
{
    
}


function playGame()
{
    if (globals.action.enter)
    {   
    //   displayDeck();
    }

    //... ANTERIOR

    //Sacamos en pantalla las coordenadas del ratón 
    // globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;
}

function loading ()
{
    if (globals.action.enter)
    {   
        globals.gameState           = State.PLAYING; 
        globals.action.enter        = false;
    }
}