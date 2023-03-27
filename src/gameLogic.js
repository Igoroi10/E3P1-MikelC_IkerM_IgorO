import globals from "./globals.js";
import { State, SlotIdentificators, Effect } from "./constants.js";
import { createExpertDeck, initCardInfo, initCardLinks, loadAssets } from "./initialize.js";
import {detectCollisionBetweenMouseAndCards } from "./collision.js";

export default function update()
{
    //Change what the game is doing based on the game state
    switch(globals.gameState)
    {
        case State.LOADING:
            // console.log("Loading assets...");
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
        createExpertDeck();
        
        for(let i = 0; i < globals.cards.length; i++){
            console.log(globals.cards[i]);
        }

        // for(let i = 0; i < globals.cardInfo.length; i++){
        //     console.log(globals.cardInfo[i].kategoria);
        // }
    //   displayDeck();
    }

    if(globals.action.d){
        console.log(globals.cards.length);
    }

    //... ANTERIOR

   
    //Sacamos en pantalla las coordenadas del ratón


    //Sacamos en pantalla las coordenadas del ratón 
    // globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;

    
    globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;

    detectCollisionBetweenMouseAndCards();

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
    let visibleDiv;
    switch(screen){
        case State.LOG_IN:
            visibleDiv = "container";
            break;

        case State.PLAYER_MENU:
            visibleDiv = "playerMenuScreen";
            break;
        
        case State.ADMIN_MENU:
            visibleDiv = "adminMenuScreen";
            break;

        case State.PLAYING:
            visibleDiv = "divCanvas";
            break;
    }

    const logInDiv      = document.getElementById("sectionLogIn");
    const playerMenu    = document.getElementById("playerMenuScreen");
    const adminMenu     = document.getElementById("adminMenuScreen");
    const playingScreen = document.getElementById("divCanvas");
    
    logInDiv.style.display      = "none";
    playerMenu.style.display    = "none";
    adminMenu.style.display     = "none";
    playingScreen.style.display = "none";

    visibleDiv.style.display    = "block";

}


function updatePoints(){
    const player1 = 0;
    const player2 = 1;

    let player1Points;
    let player2Points;

    player1Points = calculatePoints(player1);
    player2Points = calculatePoints(player2);
}

function calculatePoints(player){

    let points;
    let climate = SlotIdentificators.CLIMATE_FIELD; // Para el modo expert en un futuro
    let buff1;
    let buff2;
    let buff3;
    let field1;
    let field2;
    let field3;
    let buffValue1 = 1;
    let buffValue2 = 1;
    let buffValue3 = 1;
    

    if(player === 0){

        buff1   = SlotIdentificators.PLAYER1_B1;
        buff2   = SlotIdentificators.PLAYER1_B2;
        buff3   = SlotIdentificators.PLAYER1_B3;
        field1  = SlotIdentificators.PLAYER1_F1;
        field2  = SlotIdentificators.PLAYER1_F2;
        field3  = SlotIdentificators.PLAYER1_F3;
    }

    else{

        buff1   = SlotIdentificators.PLAYER2_B1;
        buff2   = SlotIdentificators.PLAYER2_B2;
        buff3   = SlotIdentificators.PLAYER2_B3;
        field1  = SlotIdentificators.PLAYER2_F1;
        field2  = SlotIdentificators.PLAYER2_F2;
        field3  = SlotIdentificators.PLAYER2_F3;
    }

    //Efectos climate (a implementar en un futuro para el modo expert)

    //Comprobaciones de los buffos + puntos
    for(let i = 0; i < globals.cards.length; i++){

        if(globals.cards[i].slotID === buff1){

            if(globals.cards[i].effect === Effect.COMMANDERS_HORN)
                buffValue1 = 2;
            else
                buffValue1 = 0.5;           
        }

        else if(globals.cards[i].slotID === buff3){

            if(globals.cards[i].effect === Effect.COMMANDERS_HORN)
                buffValue2 = 2;
            else
                buffValue2 = 0.5;           
        } 

        else if(globals.cards[i].slotID === buff2){
            
            if(globals.cards[i].effect === Effect.COMMANDERS_HORN)
                buffValue3 = 2;
            else
                buffValue3 = 0.5;           
        }
        
        if(globals.cards[i].slotID === field1){
            points += (buffValue1 * globals.cards[i].value);
        }

        else if(globals.cards[i].slotID === field2){
            points += (buffValue2 * globals.cards[i].value);
        }

        else if(globals.cards[i].slotID === field3){
            points += (buffValue3 * globals.cards[i].value);
        }
    }

    
}

export {
    checkStates,
}