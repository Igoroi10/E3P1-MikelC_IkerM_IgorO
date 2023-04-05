import globals from "./globals.js";
import { State, SlotIdentificators, Effect, GameMode} from "./constants.js";
import { createExpertDeck, initCardInfo, initCardLinks, loadAssets } from "./initialize.js";
import {detectCollisionBetweenMouseAndCards } from "./collision.js";
import { selectEnemy, createList} from "./events.js";

function update()
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
        
        // for(let i = 0; i < globals.cards.length; i++){
        //     console.log(globals.cards[i]);
        // }

        // for(let i = 0; i < globals.cardInfo.length; i++){
        //     console.log(globals.cardInfo[i].kategoria);
        // }
    //   displayDeck();
    }

    if(globals.action.d){
        startingDeal(GameMode.NORMAL_MODE);
        console.log(globals.cards.length);
        console.log(globals.tableSlots.player1);
        console.log(globals.tableSlots.player2);

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
            visibleDiv = "logInScreen";
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




    document.getElementById("logInScreen").style.display            = "none";
    document.getElementById("playerMenuScreen").style.display       = "none";
    document.getElementById("adminMenuScreen").style.display        = "none";
    document.getElementById("divCanvas").style.display              = "none";

    document.getElementById(visibleDiv).style.display    = "block";

}


function updatePoints(){
    const player1 = 0;
    const player2 = 1;

    let player1Points;
    let player2Points;

    player1Points = calculatePoints(player1);
    player2Points = calculatePoints(player2);

    globals.player1Points = player1Points;
    globals.player2Points = player2Points;

    createPointers(player1Points, player1);
    createPointers(player2Points, player2);
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

    return points;
}

function createPointers(points, player){
    let PointersArray;
    let pointsLeft = points;
    let hundreds;
    let tens;
    let units;

    if(player === 0){
        PointersArray = globals.player1PointTokens;
    }

    else
        PointersArray = globals.player2PointTokens;
    
    
    hundreds = pointsLeft/100;

    pointsLeft = pointsLeft%100;

    tens = pointsLeft/10;

    pointsLeft = pointsLeft%10;

    units = pointsLeft;

    for(let i = 0; i < hundreds; i++){
        createPointersToken(PointersArray, 100);
    }

    for(let i = 0; i < tens; i++){
        createPointersToken(PointersArray, 10);
    }

    for(let i = 0; i < units; i++){
        createPointersToken(PointersArray, 1);
    }
}

function createPointersToken(array, number){

    const imageSet = new ImageSet(CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT);
    let ind;

    switch(number){
        case 100:
            ind = 36;
            const tokenCard = new Card(globals.cardInfo[index].irudia,  globals.cardInfo[index].izena, CardState.DECK, false, imageSet);
            array.hundreds.push(tokenCard);
            break;
        case 10:
            ind = 35;
            const tokenCard2 = new Card(globals.cardInfo[index].irudia,  globals.cardInfo[index].izena, CardState.DECK, false, imageSet);
            array.tens.push(tokenCard2);
            break;
        case 1:
            ind = 34;
            const tokenCard3 = new Card(globals.cardInfo[index].irudia,  globals.cardInfo[index].izena, CardState.DECK, false, imageSet);
            array.units.push(tokenCard3);
            break;
    }
    
    
}

function localStorageCheck(){

    if(localStorage.getItem("logged") === null){
        console.log("no logged")
        globals.gameState = State.LOG_IN;
    }

    else{
        if(localStorage.getItem("rol") === "admin"){
            console.log("logged as admin")
            globals.hostPlayerInfo.izena_abizena = localStorage.getItem('izena_abizena');
            globals.gameState = State.ADMIN_MENU;
        }

        else{
            console.log("logged as player")
            globals.gameState = State.PLAYER_MENU;
            globals.hostPlayerInfo.izena_abizena = localStorage.getItem('izena_abizena');
            selectEnemy();
        }
    }

    checkStates();
}

function localStorageUpdate(){
    localStorage.setItem('logged', 'true');
    localStorage.setItem('rol', globals.hostPlayerInfo.rol);
    localStorage.setItem('emaila', globals.hostPlayerInfo.emaila);
    localStorage.setItem('izen_abizena', globals.hostPlayerInfo.izena_abizena)
}

function logOut(){
    localStorage.clear();
    globals.gameState = State.LOG_IN;
    checkStates(); 

}

function startingDeal(mode){
    let cardsToDraw
    if(mode === GameMode.NORMAL_MODE){
        cardsToDraw = 60;
    }

    else
        cardsToDraw = 80;

    shuffleDeck(globals.cards)

    for(let i = 0; i < cardsToDraw; i++){
        if(i % 2 === 0){
            globals.tableSlots.player1.push(globals.cards[i]);
        }

        else
            globals.tableSlots.player2.push(globals.cards[i]);
    }

    shuffleDeck(globals.tableSlots.player1);
    shuffleDeck(globals.tableSlots.player2);

}

function shuffleDeck(deck){

    let currentIndex = deck.length;
    let randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [deck[currentIndex], deck[randomIndex]] = [
        deck[randomIndex], deck[currentIndex]];
    }

}

export {
    update,
    checkStates,
    localStorageCheck,
    localStorageUpdate,
    logOut,
}