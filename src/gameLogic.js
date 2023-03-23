import globals from "./globals.js";
import { State } from "./constants.js";
import { createExpertDeck, initCardInfo, initCardLinks, loadAssets } from "./initialize.js";
import {detectCollisionBetweenMouseAndCards } from "./collision.js";

export default function update()
{
    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case State.LOADING:
            console.log("Loading assets...");
            loading();
            break;
        

        case State.PLAYING:
            // console.log("Colocolo")
            playGame();
            break;


        default:
            console.error("Error: Game State invalid");
    }
}

function playGame()
{



    if (globals.action.enter)
    {   
        for(let i = 0; i < globals.cards.length; i++){
            console.log(globals.cards[i]);
        }

        // for(let i = 0; i < globals.cardInfo.length; i++){
        //     console.log(globals.cardInfo[i].kategoria);
        // }
    //   displayDeck();
    }

    //... ANTERIOR

   
    //Sacamos en pantalla las coordenadas del ratón


    //Sacamos en pantalla las coordenadas del ratón 
    // globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;

    
    globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;

    detectCollisionBetweenMouseAndCards();

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


    console.log("assets cargados: " + globals.assetsLoaded)
    console.log("Get loaded succesfully");
    console.log("checks: "+globals.get_checks);

    if (globals.assetsLoaded === globals.img_url.length && globals.get_checks === 3)
    {   
        createExpertDeck();
        console.log(globals.cards.length);
        globals.gameState           = State.PLAYER_MENU; 
        globals.action.enter        = false;
    }
}

function checkStates(){
   //Change what the game is doing based on the game state
   switch(globals.gameState)
   {
       case State.LOADING:
           initialLoad();
           makeThisScreenVisible(State.LOADING);
           break;

       case State.LOG_IN:
            makeThisScreenVisible(State.LOG_IN);
           break;

       case State.ADMIN_MENU:
            makeThisScreenVisible(State.ADMIN_MENU);
           break;

       case State.PLAYER_MENU:
            makeThisScreenVisible(State.PLAYER_MENU);
           break;

       case State.LOAD_GAME:
            initGameLoad();
           break;

       case State.PLAYING:
           // console.log("Colocolo")
           //playGame();
           break;

       case State.STATS:
            makeThisScreenVisible(State.STATS);
           break;

       case State.ROUND_END:
            makeThisScreenVisible(State.ROUND_END);
           break;

       case State.GAME_END:
            makeThisScreenVisible(State.GAME_END);
           break;        

       default:
           console.error("Error: Game State invalid");
   }
}

function makeThisScreenVisible(screen){

}


export {
    checkStates,
}