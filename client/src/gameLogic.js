import globals from "./globals.js";
import { State } from "./constants.js";
import { initCardInfo, initCardLinks } from "./initialize.js";

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
            // console.log("Colocolo")
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
    console.log("Actualiza");
   
    //Sacamos en pantalla las coordenadas del ratón


    //Sacamos en pantalla las coordenadas del ratón 
    // globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;

    
    globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;


}

function loading ()
{
    if(globals.get_checks < 2){
        initCardInfo();
        initCardLinks();
    }

    // if(globals.get_checks === 2)
    // console.log("Get loaded succesfully");

    if (globals.action.enter && globals.get_checks === 2)
    {   
        globals.gameState           = State.PLAYING; 
        globals.action.enter        = false;
    }
}