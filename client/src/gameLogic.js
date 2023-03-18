import globals from "./globals.js";
import { State } from "./constants.js";
import { createExpertDeck, initCardInfo, initCardLinks, loadAssets } from "./initialize.js";

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
        createExpertDeck();
        console.log(globals.cards.length);
    //   displayDeck();
    }

    //... ANTERIOR

   
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

    // console.log(globals.img_url);
    if(globals.get_checks === 2){
        loadAssets();
        globals.get_checks++;
    }


    // console.log("assets cargados: " + globals.assetsLoaded)
    // console.log("Get loaded succesfully");

    if (globals.assetsLoaded === globals.img_url.length && globals.get_checks === 3)
    {   
        globals.gameState           = State.PLAYING; 
        globals.action.enter        = false;
    }
}