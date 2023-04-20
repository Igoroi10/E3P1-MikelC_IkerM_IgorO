import globals from "./globals.js";
import { State, CardState, SlotIdentificators, Effect, GameMode, Player0_map_pos, Player1_map_pos, Turn, Common_map_pos, Type, CardCategory} from "./constants.js";
import { createExpertDeck, createNormalDeck, initSlots, initCardInfo, initCardLinks, loadAssets, initTimers } from "./initialize.js";
import {detectCollisionBetweenMouseAndCards, detectCollisionBetweenMouseAndSlots, detectCollisionBetweenMouseAndCards_Click } from "./collision.js"; 
import { selectEnemy, createList,  checkIfRoundPass} from "./events.js";
import { Card } from "./Card.js";

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

    // console.log(globals.cards);

    updateTurn();
    
    updateCards();

    updateLevelTime(); 

    detectCollisionBetweenMouseAndSlots();

    detectCollisionBetweenMouseAndCards();

    detectCollisionBetweenMouseAndCards_Click();

    

    // console.log(globals.cards[globals.selectedCardId_Click]);
    // console.log(globals.cards[globals.selectedCardId_Click]);
    //Cuando se seleccionma la carta del campo, esta en game pero sigue seleccionada, es decir su estado no cambia a SELECTED pero hace sus funciones - CORREGIR

    // console.log(globals.selectedCardId_Click)

    // console.log("Turno player: " + globals.turnState);
    // console.log(globals.checkRoundPlayer1) // 
    checkIfRoundPass();
    


    updateTokenPlacement();
    updatePoints();
    // updateLives();
    updateEndRound();
    updateGameOver();

   

    // checkEndRound();
    



    if(globals.action.d){
        let check = 1;
        for(let i = 0; i <  globals.slots.length; i++){
            if(globals.slots[i].slotIdentificator === SlotIdentificators.PLAYER0_HAND || globals.slots[i].slotIdentificator === SlotIdentificators.PLAYER1_HAND){
                console.log("carta en mano nº" + check);
                check++
                console.log(globals.slots[i])
            }
        }
        console.log("FIN DE SLOT IDENTIFICATOR")
    }

    //Funcion que comprueba cosntantemente si un slot esta vacio o no
    // updateSlots(globals.slots);

   
    //Sacamos en pantalla las coordenadas del ratón


    //Sacamos en pantalla las coordenadas del ratón 
    // globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;

    
    globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;

    

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

        case State.GAME_START:
            // GENERAR EL MAZO 
            createNormalDeck();

            // LLAMAR A LA FUNION STARTING DEAL y CAMBIAMOS EL ESTADO DEL JUEGO
            startingDeal(GameMode.NORMAL_MODE);
            distributeHandCards();
            startingTokensDeal();
            
            globals.gameState = State.PLAYING;
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

// =========================
//      UPDATE CARD
// =========================

function updateCards(){

    for(let i = 0; i < globals.cards.length; i++){
        const card = globals.cards[i];
        updateCard(card);
    }
}

function updateCard(card) // Puede ser una global de estado o una constante
{
    switch (card.state)  // Estado de la carta
    {
        case CardState.DECK:
            if(globals.draw)                        // Boleana globl que indica el estado de la carta
            {
                CardState.HAND;  
                card.previousState = CardState.DECK;                        // Cambiamos el Estado
            }
            else;

            break;


        case CardState.HAND:
            if(globals.double_click)
            {
                CardState.DOUBLE_CLICK;
                card.previousState = CardState.HAND;      
            }

            else if(globals.detectCollisionBetweenMouseAndCards && !globals.selected)
            {
                CardState.HOVER;
                card.previousState = CardState.HAND;      
            }

            else if (globals.discard)
            {
                CardState.DISCARD;
                card.previousState = CardState.HAND;    
            }
            else;

            break;


        case CardState.DOUBLE_CLICK:
            //gestion de doble click - Entra a todos los estados excepto HOVER


            break;


        case CardState.SELECTED:
            // console.log("entra a selected")
            // console.log(globals.cards[globals.selectedCardId_Click]);
            placeCard();
            
            if(globals.otherSelected)
            {
                card.state = card.previousState;
            }

            else if (globals.double_click)
            {
                CardState.DOUBLE_CLICK;
            }

            else if (globals.medic)
            {
                CardState.GAME;
            }
            
            else if(globals.placedCard){ 
                // console.log("Entra en el if para ejecutar el efecto")
                // globals.placedCard = false;
                // console.log("carta enviada a efecto")
                // console.log(card.state);
                // console.log("State Antes: " + card.state);
                card.state = CardState.GAME;
                decoyEffectActivation();
                checkCardEffect(card);
                // console.log("State Despues " + card.state);
                
                
            }
            break;


        case CardState.HOVER:
            if(!globals.detectCollisionBetweenMouseAndCards)
            {
                card.state = card.previousState;
            }

            else if (globals.action.click)
            {
                // card.state = CardState.SELECTED;
            }

            else if (globals.double_click)
            {
                card.state = CardState.DOUBLE_CLICK;
            }
            else;

            break;


        case CardState.GAME:
            if (globals.checkBothPlayerRound)
            {
                CardState.DISCARD;
            }

            else if (globals.scorch)
            {
                CardState.DISCARD;
            }

            else if(globals.decoy)
            {
                CardState.SELECTED;
            }



            else;

            break;


        case CardState.DISCARD:
            card.showBack = true;
            if (globals.medic && globals.action.click)
            {
                CardState.SELECTED;
            }

            else if(globals.double_click)
            {
                CardState.DOUBLE_CLICK;
                card.previousState = card.state;
            }
            else{
                discardCards();
            }

            break;


        default:
            console.log("ERROR");

    }
}


function discardCards()
{
    // console.log("entra en funcion discardCards");
    for(let i = 0; i < 2; i++)
    {
        for(let k = 0; k < globals.player[i].length; k++)
        {
            if(globals.player[i][k].state === CardState.DISCARD)
            {
                // console.log("ENTRA EN EL IF");

                if(i === 0)
                {
                    globals.player[i][k].xPos = Player0_map_pos.PLAYER0_DISCARD_XPOS;
                    globals.player[i][k].yPos = Player0_map_pos.PLAYER0_DISCARD_YPOS;
                }

                else 
                {   
                    globals.player[i][k].xPos = Player1_map_pos.PLAYER1_DISCARD_XPOS;
                    globals.player[i][k].yPos = Player1_map_pos.PLAYER1_DISCARD_YPOS;
                }
            }
        }
    }
}
// =========================
//     END OF UPDATE CARD
// =========================



// =========================
//      EFFECTS
// =========================

function checkCardEffect(card){

    // console.log("entra en placed card")
    updateActions(card);
    switch(card.effect){
        case Effect.MEDIC:
            medicEffect(card);
            break;
        case Effect.MORALE_BOOST:
            //efecto de puntuación
            break;
        case Effect.MUSTER:
            musterEffect(card)
            break;
        case Effect.SPY:
            spyEffect(card)
            break;
        case Effect.TIGHT_BOND:
            //efecto de puntuación
            break;
        case Effect.COMMANDERS_HORN:
            //efecto de puntuación
            break;
        case Effect.DECOY:
           //decoyEffect()
            break;
        case Effect.SCORCH:
            scorchEffect(card);
            break;
    //Estos a implementar en modo experto
        case Effect.BITTING_FROST:
            break;
        case Effect.CLEAR_WEATHER:
            break;
        case Effect.IMPENETRABLE_FOG:
            break;
        case Effect.TORRENTIAL_RAIN:
            break;
        case Effect.SCORCH_INMUNE:
            break;
                                                            
        
    }

}

function scorchEffect(card){
    console.log("entra en el efecto scorch");
    const typeToScorch = card.type;
    const fieldID      = card.slotIdentificators;
    let valueToScorch = -1;

    for(let i = 0; i < globals.cards.length; i++){
        let cardToCompare = globals.cards[i];
        if(cardToCompare.type === typeToScorch && cardToCompare.slotIdentificators !== fieldID && cardToCompare.state === CardState.GAME){
            if(cardToCompare.value > valueToScorch)
                valueToScorch = cardToCompare.value;
        }
    }

    for(let i = 0; i < globals.cards.length; i++){
        let cardToCompare = globals.cards[i];
        if(cardToCompare.value === valueToScorch && cardToCompare.slotIdentificators !== fieldID  && cardToCompare.state === CardState.GAME){
            cardToCompare.state = CardState.DISCARD;
        }
    }

    if(card.categoryId !== CardCategory.UNIT)
        card.state = CardState.DISCARD;

}

function medicEffect(card){
    const typeToMedic = card.type;
    let playerNum;
    let valueToMedic = -1;


    if(card.slotIdentificators < SlotIdentificators.PLAYER1_F1)

        playerNum = 0;
    else
        playerNum = 1;

    const playerArray = globals.player[playerNum];

    for(let i = 0; i < playerArray.length; i++){
        let cardToCompare = playerArray[i];

        if(cardToCompare.type === typeToMedic && cardToCompare.state === CardState.DISCARD){
            if(cardToCompare.value > valueToMedic)
                valueToMedic = cardToCompare.value;
        }
    }

    for(let i = 0; i < playerArray.length; i++){
        let cardToCompare = playerArray[i];
        if(cardToCompare.value === valueToMedic && cardToCompare.state === CardState.DISCARD){

            cardToCompare.slotIdentificator = card.slotIdentificator;
            checkIfSlotAvailable(Effect.MEDIC, cardToCompare, playerNum);

            i = playerArray.length;
        }
    }

}

function decoyEffectActivation(){
    // globals.decoyAvailable 
    // global booleana de actibavavaacion de decoyAvailaable que permita hacer todo lo demas, si esta en false desactibvarlo y pasar de turno
    
    checkIfDecoyAvailable();
    
    if (globals.decoyAvailable)
    {
        const playerArray = globals.player[globals.turnState];
        let checks = 0;
        let handIdentificator;

        if(globals.turnState === 0)
            handIdentificator = SlotIdentificators.PLAYER0_HAND;
        
        else
            handIdentificator = SlotIdentificators.PLAYER1_HAND;

        for(let i = 0; i < playerArray.length; i++){
            if(playerArray[i].slotIdentificator === handIdentificator)
                checks++  
        }
        
        if(checks < 12){
            for(let i = 0; i < playerArray.length; i++)
            {
                globals.decoy = true;
            }
        }
    }

    else
    {
        console.log("entra en el else de decoyEffectActivation");
        globals.actionsCounter++;
    }
}

function checkIfDecoyAvailable ()
{
    let decoyID; 

    if(globals.turnState === 0)
    {
        decoyID = SlotIdentificators.PLAYER0_DECOY;
    }
    else
    {
        decoyID = SlotIdentificators.PLAYER1_DECOY;
    }


    for(let i = 0; i < globals.cards.length; i++)
    {
        if (globals.cards[i].slotIdentificator === decoyID && globals.cards[i].showBack === false)
            globals.decoyAvailable = true;
    }
}

function decoyEffectResult(card){

    const playerArray = globals.player[globals.turnState];

    for(let i = 0; i < playerArray.length; i++){
        if(card.state === CardState.GAME && globals.decoy){
            checkIfSlotAvailable(Effect.DECOY, card, globals.turnState)
            globals.decoy = false;
        }
    }



    
}


function spyEffect(card){
    checkIfSlotAvailable(Effect.SPY, card, globals.turnState)
}

function musterEffect(card){
    let nameToSearch = "";
    let playerNum;
    // console.log("carta a principio de muster");
    // console.log(card)
    if(card.slotIdentificators < SlotIdentificators.PLAYER1_F1)
        playerNum = 0;
    else
        playerNum = 1;

    
    switch (card.cardName){
        case "Akerbeltz":
            nameToSearch = "Akerbeltz_morro";
            break;
        case "Sorgina":
            nameToSearch = "Sorginak";
            break;
    }

    for(let i = 0; i < globals.player[playerNum].length; i++){
        let searchingCard = globals.player[playerNum][i];
        // console.log("card name: " + card.cardName);
        // console.log("search name: " + searchingCard.cardName);

        if(searchingCard.cardName === card.cardName || searchingCard.cardName === nameToSearch){
            console.log(" entra en el if de nombres iguales");
            if(searchingCard.state !== CardState.GAME || searchingCard.state !== CardState.DISCARD ){
                searchingCard.slotIdentificator = card.slotIdentificator;
                checkIfSlotAvailable(Effect.MUSTER, searchingCard, playerNum)
            }
        }
    }

}


function checkIfSlotAvailable(effect, card, playerNum){
    switch(effect){
        case Effect.MEDIC:
            let medicChecks = 0;
            for(let i = 0; i < globals.cards.length; i++){
                if(globals.cards[i].slotIdentificator === card.slotIdentificator)
                    medicChecks++  
            }

            if(medicChecks < 8){
                for(let i = 0; i < globals.player[playerNum].length; i++){
                    if(globals.player[playerNum][i].cardName === card.cardName && globals.player[playerNum][i].state === CardState.DISCARD){
                        for(let l = 0; l < globals.slots.length; l++){

                            if(globals.slots[l].placed_cards === -1 && globals.slots[l].slotIdentificator === card.slotIdentificator ){
                                
                                globals.player[playerNum][i].xPos = globals.slots[l].xPos;
                                globals.player[playerNum][i].yPos = globals.slots[l].yPos;
                                globals.player[playerNum][i].state = CardState.GAME;
                                globals.player[playerNum][i].showBack = false;
                            }
                        }

                    }
                }
            }

            break;

        case Effect.MUSTER:
            let effectChecks = 0;
            for(let i = 0; i < globals.cards.length; i++){
                if(i === 0)
                if(globals.cards[i].slotIdentificator === card.slotIdentificator)
                effectChecks++  
            }

            if(effectChecks < 8){
                for(let i = 0; i < globals.player[playerNum].length; i++){
                    if(globals.player[playerNum][i].cardName === card.cardName && globals.player[playerNum][i].state !== CardState.GAME && globals.player[playerNum][i].state !== CardState.DISCARD){
                        for(let l = 0; l < globals.slots.length; l++){
                            if(globals.slots[l].placed_cards === -1 && globals.slots[l].slotIdentificator === card.slotIdentificator){
                                globals.player[playerNum][i].xPos = globals.slots[l].xPos;
                                globals.player[playerNum][i].yPos = globals.slots[l].yPos;
                                globals.player[playerNum][i].state = CardState.GAME;
                                globals.player[playerNum][i].showBack = false;
                                l = globals.slots.length;
                            }
                        }

                    }
                }
            }
            break;
        case Effect.SPY:
   
            for(let k = 0; k < 2; k++){
                let spyChecks = 0;
                let handIdentificatorSpy;
    
                if(playerNum === 0)
                    handIdentificatorSpy = SlotIdentificators.PLAYER0_HAND;
                else
                    handIdentificatorSpy = SlotIdentificators.PLAYER1_HAND;
    
                for(let i = 0; i < globals.cards.length; i++){
                    if(globals.cards[i].slotIdentificator === handIdentificatorSpy)
                    spyChecks++  
                }
            
                if(spyChecks < 12){
                    console.log("entra en spy checks")
                    for(let i = 0; i < globals.player[playerNum].length; i++){
                        if(globals.player[playerNum][i].state === CardState.DECK){
                            console.log("Entra en el if de carta de deck")
                            // console.log("Turno: " + globals.turnState)
                            // console.log("PlayerNum: " + playerNum);
                            for(let l = 0; l < globals.slots.length; l++){
                                if(globals.slots[l].placed_cards === -1 && globals.slots[l].slotIdentificator === handIdentificatorSpy){
                                    // console.log(globals.slots[l].yPos);
                                    console.log(playerNum);
                                    console.log(globals.player[playerNum][i])
                                    globals.player[playerNum][i].xPos = globals.slots[l].xPos;
                                    globals.player[playerNum][i].yPos = globals.slots[l].yPos;
                                    globals.player[playerNum][i].state = CardState.HAND;
                                    globals.player[playerNum][i].showBack = false;
                                    globals.player[playerNum][i].slotIdentificator = globals.slots[l].slotIdentificator;
                                    globals.slots[l].placed_cards++;
                                    console.log("Coloca una carta de spy")
                                    l = globals.slots.length;
                                    i = globals.cards.length;


                                }
                            }
                        }

                    }

                }
                     
            }

                
            break;
        case Effect.DECOY:
            let decoyChecks = 0;
            let handIdentificatorDecoy;
            let decoyID;

            if(playerNum === 0)
            {
                handIdentificatorDecoy = SlotIdentificators.PLAYER0_HAND;
                decoyID = SlotIdentificators.PLAYER0_DECOY;
            }
            else
            {
                handIdentificatorDecoy = SlotIdentificators.PLAYER1_HAND;
                decoyID = SlotIdentificators.PLAYER1_DECOY;
            }
            

            for(let i = 0; i < globals.cards.length; i++){
                if(globals.cards[i].slotIdentificator === handIdentificatorDecoy)
                decoyChecks++  
            }
        
            if(decoyChecks < 12){

                for(let l = 0; l < globals.slots.length; l++)
                {
                    if(globals.slots[l].placed_cards === -1 && globals.slots[l].slotIdentificator === handIdentificatorDecoy){

                        card.xPos = globals.slots[l].xPos;
                        card.yPos = globals.slots[l].yPos;
                        card.state = CardState.HAND;
                        card.showBack = false;
                    }
                }

                for(let i = 0; i < globals.cards.length; i++){
                    console.log("entra en for de dar vuelta al decoy");
                    if(globals.cards[i].slotIdentificator === decoyID && globals.cards[i].showBack === false)
                    {
                        console.log("Da la vuelta a una carta");
                        globals.cards[i].showBack = true;
                        i = globals.cards.length;
                    }
                }
            }
            globals.actionsCounter++;
            globals.decoy = false;
            break;
    }
}


// =========================
//      END OF EFFECTS
// =========================


// =========================
//      START OF POINT CALCULATION AT THE END OF THE ROUND
// =========================


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



    let points = 0;
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
    let moraleBoost1 = 0;
    let moraleBoost2 = 0;
    let moraleBoost3 = 0;
    let tightBondArray = [];

    // tightBondValueAdd(tightBondArray, player)

    if(player === 0){

        buff1   = SlotIdentificators.PLAYER0_B1;
        buff2   = SlotIdentificators.PLAYER0_B2;
        buff3   = SlotIdentificators.PLAYER0_B3;
        field1  = SlotIdentificators.PLAYER0_F1;
        field2  = SlotIdentificators.PLAYER0_F2;
        field3  = SlotIdentificators.PLAYER0_F3;
    }

    else{

        buff1   = SlotIdentificators.PLAYER1_B1;
        buff2   = SlotIdentificators.PLAYER1_B2;
        buff3   = SlotIdentificators.PLAYER1_B3;
        field1  = SlotIdentificators.PLAYER1_F1;
        field2  = SlotIdentificators.PLAYER1_F2;
        field3  = SlotIdentificators.PLAYER1_F3;
    }

    //Efectos climate (a implementar en un futuro para el modo expert)

    //Comprobaciones de los buffos + puntos
    for(let i = 0; i < globals.cards.length; i++){
        let cardValue = 0;
        
        if(globals.cards[i].categoryId === CardCategory.UNIT)
        {
            cardValue = parseInt(globals.cards[i].value);
            // console.log("entra en el parse")
        }

        switch(globals.cards[i].slotIdentificator){
            case buff1:
                // console.log("entra en el case buff1");
                if(globals.cards[i].effect === Effect.COMMANDERS_HORN)
                {
                    // console.log("entra en el if1 commanders");
                    buffValue1 = 2; 
                }   
                if(globals.cards[i].effect === Effect.MORALE_BOOST){
                    // console.log("entra en el if1 morale_boost");
                    moraleBoost1++;
                }
            break;

            case buff2:
                // console.log("entra en el case buff2");
                if(globals.cards[i].effect === Effect.COMMANDERS_HORN)
                {
                    // console.log("entra en el ifcase2 commanders");
                    buffValue2 = 2;   
                }
                 
                if(globals.cards[i].effect === Effect.MORALE_BOOST){
                    // console.log("entra en el ifcas2 morale_boost");
                    moraleBoost2++;
                }
            break;
            case buff3:
                // console.log("entra en el case buff3");
                if(globals.cards[i].effect === Effect.COMMANDERS_HORN)
                {
                    // console.log("entra en el ifcase3 commanders");
                    buffValue3 = 2;  
                }
                  
                if(globals.cards[i].effect === Effect.MORALE_BOOST){
                    // console.log("entra en el ifcase3 morale_boost");
                    moraleBoost3++;
                }
            break;

        }


        if(globals.cards[i].categoryId === CardCategory.UNIT)
        {
            // console.log(cardValue);
            if(globals.cards[i].slotIdentificator === field1){
                // console.log("entra en el primer calcul");
                points += (buffValue1 * (cardValue + moraleBoost1));
            }
    
            else if(globals.cards[i].slotIdentificator === field2){
                // console.log("entra en el 2 calcul");
                points += (buffValue2 * (cardValue + moraleBoost2));
            }
    
            else if(globals.cards[i].slotIdentificator === field3){
                points += (buffValue3 * (cardValue + moraleBoost3));
            }
        }
    }
    // console.log("moraleBoost3: " + moraleBoost3);
    // console.log("moraleBoost2: " + moraleBoost2);
    // console.log("moraleBoost1: " + moraleBoost1);
    //tighBondValueDecrease()
    // console.log(points);

    // tighBondValueDecrease(tightBondArray, player)
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
        // createPointersToken(PointersArray, 100);
    }

    for(let i = 0; i < tens; i++){
        // createPointersToken(PointersArray, 10);
    }

    for(let i = 0; i < units; i++){
        // createPointersToken(PointersArray, 1);
    }
}

function createPointersToken(array, number){

    const imageSet = new ImageSet(CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT);
    let ind;

    switch(number){
        case 100:
            ind = 36;
            const tokenCard = new Card(globals.cardInfo[ind].irudia,  globals.cardInfo[index].izena, CardState.DECK, false, imageSet);
            array.hundreds.push(tokenCard);
            break;
        case 10:
            ind = 35;
            const tokenCard2 = new Card(globals.cardInfo[ind].irudia,  globals.cardInfo[index].izena, CardState.DECK, false, imageSet);
            array.tens.push(tokenCard2);
            break;
        case 1:
            ind = 34;
            const tokenCard3 = new Card(globals.cardInfo[ind].irudia,  globals.cardInfo[index].izena, CardState.DECK, false, imageSet);
            array.units.push(tokenCard3);
            break;
    }
    
    
}

function tightBondValueAdd(array, playerNum){

    let field1;
    let field2;
    let field3;
    const playerArray = globals.player[playerNum];

    if(playerNum === 0){
        field1  = SlotIdentificators.PLAYER0_F1;
        field2  = SlotIdentificators.PLAYER0_F2;
        field3  = SlotIdentificators.PLAYER0_F3;
    }

    else{
        field1  = SlotIdentificators.PLAYER1_F1;
        field2  = SlotIdentificators.PLAYER1_F2;
        field3  = SlotIdentificators.PLAYER1_F3;
    }



    for(let f = 0; f < 3; f++){
        let fieldToCompare;

        if(f === 0)
            fieldToCompare = field1;
        else if(f === 1)
            fieldToCompare = field2;
        else   
            fieldToCompare = field3;
        
        for(let i = 0; i < playerArray.length; i++){
            if(playerArray[i].slotIdentificator === fieldToCompare){

                for(let l = i+1; l < playerArray.length; l++){

                    if(playerArray[i].cardName === playerArray[l].cardName && playerArray.effect === Effect.TIGHT_BOND){

                        playerArray[i].value *= 2;
                        playerArray[l].value *= 2;
                        array.push(playerArray[i])
                    }
                }
            }
        }
        
        
    }
}

function tighBondValueDecrease(array, playerNum){

    for(let i = 0; i < globals.player[playerNum].length; i++){

        for(let l = 0; l < array.length; l++){

            if(globals.player[playerNum][i].cardName === array[l].cardName){

                globals.player[playerNum][i].value /= 2;
            }
        }
    }
}

// =========================
//      START OF POINT CALCULATION AT THE END OF THE ROUND
// =========================

// =========================
//      START OF LOCAL STORAGE
// =========================

function localStorageCheck(){

    if(localStorage.getItem("logged") === null){
        // console.log("no logged")
        globals.gameState = State.LOG_IN;
    }

    else{
        if(localStorage.getItem("rol") === "admin"){
            // console.log("logged as admin")
            globals.hostPlayerInfo.izena_abizena = localStorage.getItem('izena_abizena');
            globals.gameState = State.ADMIN_MENU;
        }

        else{
            // console.log("logged as player")
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
// =========================
//      END OF LOCAL STORAGE
// =========================

// =========================
//      START OF CARD DISTRIBUTION
// =========================
function startingDeal(mode){
    let cardsToDraw
    if(mode === GameMode.NORMAL_MODE){
        cardsToDraw = 60;
        //globals.cards.splice(cardsToDraw);
    }

    else
        cardsToDraw = 80;

    dealDecoys();

    shuffleDeck(globals.cards)

    for(let i = 0; i < cardsToDraw; i++){
        if(i % 2 === 0 && globals.cards[i].cardName !== "Decoy"){
            globals.cards[i].xPos  = Player0_map_pos.PLAYER0_DECK_XPOS;
            globals.cards[i].yPos  = Player0_map_pos.PLAYER0_DECK_YPOS;
            globals.player[0].push(globals.cards[i]); //Array que almacena las cartas para el player host
        }

        else if(globals.cards[i].cardName !== "Decoy")
        {
            globals.cards[i].xPos  = Player1_map_pos.PLAYER1_DECK_XPOS;
            globals.cards[i].yPos  = Player1_map_pos.PLAYER1_DECK_YPOS;
            globals.player[1].push(globals.cards[i]); //Array que almacena las cartas para el player guest
        }
            
    }



    shuffleDeck(globals.player[0]);
    shuffleDeck(globals.player[1]);



}

function startingTokensDeal()
{
    
    for(let i = 0; i < globals.tokens.length; i++){
        if(i === 1)
        {
            globals.tokens[i].xPos  = Common_map_pos.PLAYER0_LIVE1_XPOS;
            globals.tokens[i].yPos  = Common_map_pos.PLAYER0_LIVE_YPOS;
            globals.playerTokens[0].push(globals.tokens[i]); //Array que almacena las cartas para el player 1
        }
        else if(i === 2)
        {
            globals.tokens[i].xPos  = Common_map_pos.PLAYER0_LIVE2_XPOS;
            globals.tokens[i].yPos  = Common_map_pos.PLAYER0_LIVE_YPOS;
            globals.playerTokens[0].push(globals.tokens[i]); //Array que almacena las cartas para el player 2
        }
        else if(i === 3)
        {
            globals.tokens[i].xPos  = Common_map_pos.PLAYER1_LIVE1_XPOS;
            globals.tokens[i].yPos  = Common_map_pos.PLAYER1_LIVE1_YPOS;
            globals.playerTokens[1].push(globals.tokens[i]); //Array que almacena las cartas para el player 2
        }
        else if(i === 4)
        {
            globals.tokens[i].xPos  = Common_map_pos.PLAYER1_LIVE2_XPOS;
            globals.tokens[i].yPos  = Common_map_pos.PLAYER1_LIVE1_YPOS;
            globals.playerTokens[1].push(globals.tokens[i]); //Array que almacena las cartas para el player 2
        }
        else
        {
            globals.tokens[i].xPos = Common_map_pos.PLAYER0_TURN_TOKEN_XPOS;
            globals.tokens[i].yPos = 0;
        }
    }
 
}

function updateTokenPlacement()
{
    for(let i = 0; i < globals.tokens.length; i++)
    {
        // console.log(globals.turnState);
        if(globals.turnState === Turn.PLAYER1)
        {
            globals.tokens[0].yPos = Common_map_pos.PLAYER0_TURN_TOKEN_YPOS;
        }
        else if(globals.turnState === Turn.PLAYER0)
        {
            globals.tokens[0].yPos = Common_map_pos.PLAYER1_TURN_TOKEN_YPOS;
        }
    }
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

function dealDecoys(){

    for(let i = 0; i < globals.cards.length; i++){
        let card = globals.cards[i];
        let identificator;

        if(card.effect === Effect.DECOY){
            if(i % 2 === 0)
                identificator = SlotIdentificators.PLAYER0_DECOY;
            
            else
                identificator = SlotIdentificators.PLAYER1_DECOY;

            for(let l = 0; l < globals.slots.length; l++){
                if(globals.slots[l].slotIdentificator === identificator && globals.slots[l].placed_cards === -1){
                    card.xPos = globals.slots[l].xPos
                    card.yPos = globals.slots[l].yPos
                    card.slotIdentificator = identificator;
                    card.showBack = false;
                }

                updateSlots();
            }
        }

    }
}

// =========================
//      END OF CARD DISTRIBUTION
// =========================
function updateSlots()
{
    // Mire a ver si slot esta vacio o no
    // Asignarle el id de la carta en el globlas.cards la "i"
    // Y asignarle a la carta el identificador de ese slot
    
    // console.log(globals.cards[0].slotIdentificator)
    for(let j = 0; j < globals.slots.length; j++){
        globals.slots[j].placed_cards = -1;
    }


    for (let i = 0; i < globals.cards.length; i++)
    {
        for (let j = 0; j < globals.slots.length; j++)
        {

            if (globals.cards[i].xPos === globals.slots[j].xPos && globals.cards[i].yPos === globals.slots[j].yPos )
            {
                globals.cards[i].slotIdentificator = globals.slots[j].slotIdentificator;
                globals.slots[j].placed_cards = i;
            }
        }

    }


}

function distributeHandCards()
{
    // console.log("Entra en Distribute");
    createDistribution();
}

function createDistribution()
{
    for(let k = 0; k < 2; k++){
        let handIdentificatorDeal;
        
        if(k === 0)
            handIdentificatorDeal = SlotIdentificators.PLAYER0_HAND
        else
            handIdentificatorDeal = SlotIdentificators.PLAYER1_HAND

        for(let h = 0; h < 10; h++){

            for(let i = 0; i < globals.player[k].length; i++){

                if(globals.player[k][i].state === CardState.DECK){
    
                    for(let l = 0; l < globals.slots.length; l++){
                        if(globals.slots[l].placed_cards === -1 && globals.slots[l].slotIdentificator === handIdentificatorDeal){
                            globals.player[k][i].xPos = globals.slots[l].xPos;
                            globals.player[k][i].yPos = globals.slots[l].yPos;
                            globals.player[k][i].state = CardState.HAND;
                            globals.player[k][i].showBack = true;
                            globals.slots[l].placed_cards++;
                            l = globals.slots.length;
                            i = globals.player[k].length;
    
                        }
                    }
                }
            }
        }
        
    }

    updateSlots();

}

function updateTurn()
{
    // console.log("Turno player: " + globals.turnState);
    // console.log(globals.selectedCardId_Click);


    //Check de turnos
    if(globals.turnState === 1 && globals.actionsCounter >= 2)
    {
        globals.turnState = Turn.PLAYER0 //Cambiamos de Player despues de las dos acciones
        globals.actionsCounter = 0;
    }

    else if(globals.turnState === 0 && globals.actionsCounter >= 2)
    {
        globals.turnState = Turn.PLAYER1 //Cambiamos de Player despues de las dos acciones
        globals.actionsCounter = 0;
    }

    // if(globals.actionsCounter.player0 >= 2)
    // {
    //     // console.log("Entra en cambio de turno PLayer1 a Player2");
    //     globals.turnState = Turn.PLAYER1;
    //     globals.actionsCounter.player0 = 0;

    // }
    // else if (globals.actionsCounter.player1 >= 2)
    // {

    //     // console.log("Entra en cambio de turno PLayer2 a Player1");
    //     globals.turnState = Turn.PLAYER0;
    //     globals.actionsCounter.player0 = 0;

    // }

    

    if (globals.turnState === Turn.PLAYER0)
    {  
        // console.log("turno player1")
        // console.log("Entra en Turno Player 0");
        cardsHide(Turn.PLAYER1); // Ocultamos las cartas del jugador anterior

        cardsInHand(Turn.PLAYER0);
        
    }

    else if (globals.turnState === Turn.PLAYER1)
    {
        // console.log("Entra en Turno Player 1");
        cardsHide(Turn.PLAYER0); // Ocultamos las cartas del jugador anterior

        cardsInHand(Turn.PLAYER1);
    }

    updateButtonTurn();
    // else
        // console.log("No es turno de ninguno de los dos");
        // FALTA BOLEANA GLOBAL PARA TERMINAR EL CHECK DE RONDAS - Para acabar la partida
}

function cardsInHand(playerNum)
{   
    // console.log("Entra en cardsInHand")
    for (let i = 0; i < globals.player[playerNum].length; i++)
    {
        // console.log("Entra en for de hand")
        let card = globals.player[playerNum][i];
        if(card.state === CardState.HAND){
            // console.log("Entra en if de hand")
            card.showBack = false;
        }

    }
}

function cardsHide(playerNum)
{
    // console.log("Entra en cardsHide")
    for (let i = 0; i < globals.player[playerNum].length; i++)
    {
        // console.log(globals.player[playerNum][globals.selectedCardId_Click] )
        // console.log("Entra en for de hide")
        let card = globals.player[playerNum][i];
        if(card.state === CardState.HAND){
            // console.log("Entra en if de hide")
            card.showBack = true;
        }

    }
}

function updateSelectedCard(card)
{
    // console.log("entra en updateSelected");
    if (globals.mouseSelectedCard && globals.cards[globals.selectedCardId_Click].state !== CardState.GAME && globals.cards[globals.selectedCardId_Click].state !== CardState.DISCARD)
    {
        // console.log("entra en el if dee update card")
        if(globals.selectedCardId_Click !== -1)
        {
            // console.log("Entra en if upodateSelectedCard");
            card.previousState      = card.state
            card.state              = CardState.SELECTED;
            globals.placedCard      = false;
            // globals.selectedCardId_Click = -1;
        }

        else
        {
            //console.log("entra en el else");
            // globals.selectedCardId_Click = -1;
            // globals.cards[i].state = globals.cards[i].previousState;

        }
     
    }

}



function placeCard()
{
    // console.log(globals.cards[globals.selectedCardId_Click]);
    // console.log("click: " + globals.selectedCardId_Click)
    // console.log("cardId: " + globals.selectedSlotId);

    //Como es undefined el global.selectedSlotID  === -1 hasta que seleciona el identificador de slots, peta. Ya que en el array como no existe la posicion -1 peta.
    if (globals.selectedSlotId !== -1 )
    {
        // console.log(globals.slots[globals.selectedSlotId].placed_cards);
    
        //Comprobacion para saber si existe un hueco o no en dicho slot
        if (globals.slots[globals.selectedSlotId].placed_cards === -1)
        {
            // console.log("Entra en el segundo if");
            if(globals.selectedCardId_Click !== -1 && globals.selectedSlotId !== -1)
            {

                // console.log("Entra placed card");
                const selectedCard      = globals.cards[globals.selectedCardId_Click];
                const selectedSlotId    = globals.slots[globals.selectedSlotId]; 
                const slotIdentificator = globals.slots[globals.selectedSlotId].slotIdentificator;
                // console.log(selectedCard);
                // console.log("Entrra en Place Card Slot: " + slotIdentificator);
                // ==============
                //     CLIMATE
                // ==============
                
                if ( slotIdentificator === SlotIdentificators.CLIMATE_FIELD)
                {   
                    if(selectedCard.categoryId === CardCategory.CLIMATE)
                    {
                        // console.log("Entra en doble if");
                        selectedCard.xPos = selectedSlotId.xPos;
                        selectedCard.yPos = selectedSlotId.yPos;
                        // selectedCard.state = CardState.GAME;
                        globals.checkPlaced = true;
                    }
                    
                }
                
                // PLAYER 1
                if (globals.turnState === Turn.PLAYER0)
                {
                    // ==============
                    //     UNITS
                    // ==============

                    //BUFFS PLAYER 1
                    if (slotIdentificator === SlotIdentificators.PLAYER0_B1 || slotIdentificator === SlotIdentificators.PLAYER0_B2 || slotIdentificator === SlotIdentificators.PLAYER0_B3)
                    {
                        if(selectedCard.categoryId === CardCategory.PERMAEFFECT)
                        {
                            selectedCard.xPos = selectedSlotId.xPos;
                            selectedCard.yPos = selectedSlotId.yPos;
                            // selectedCard.state = CardState.GAME;
                            globals.checkPlaced = true;
                        }
                    }
                    
                    if(selectedCard.effect === Effect.SPY) {
                        if (selectedCard.type === Type.PHYSICAL && slotIdentificator === SlotIdentificators.PLAYER1_F3)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                //  selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }
        
                            // DISTANCIA 
                            else if(selectedCard.type === Type.DISTANCE  && slotIdentificator === SlotIdentificators.PLAYER1_F2)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                //  selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }
                            // ASEDIO
                            else if (selectedCard.type === Type.SIEGE  && slotIdentificator === SlotIdentificators.PLAYER1_F1)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                //  selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;

                            }
                    }
                    
                    //FIELDS PLAYER 1
                    else if (slotIdentificator === SlotIdentificators.PLAYER0_F1 || slotIdentificator === SlotIdentificators.PLAYER0_F2 || slotIdentificator === SlotIdentificators.PLAYER0_F3)
                    {
                        if(selectedCard.categoryId === CardCategory.UNIT || selectedCard.categoryId === CardCategory.INSTAEFFECT)
                        {
                            // METER IF DE TIPO CARTA:
                            // CUEPRO A CUERPO
                            // console.log(selectedCard.frontImg);
                            if(selectedCard.cardName === 'Scorch')
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                //  selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }
                            else if (selectedCard.type === Type.PHYSICAL && slotIdentificator === SlotIdentificators.PLAYER0_F3)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                // selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }

                            // DISTANCIA 
                            else if(selectedCard.type === Type.DISTANCE  && slotIdentificator === SlotIdentificators.PLAYER0_F2)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                // selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }
                            // ASEDIO
                            else if (selectedCard.type === Type.SIEGE  && slotIdentificator === SlotIdentificators.PLAYER0_F1)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                // selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }

                            // console.log(selectedCard);
                        }
                    }   

                }

                //PLAYER 2
                else if (globals.turnState === Turn.PLAYER1)
                {
                    // ==============
                    //     UNITS
                    // ==============

                    //BUFFS PLAYER 2
                    if (slotIdentificator === SlotIdentificators.PLAYER1_B1 || slotIdentificator === SlotIdentificators.PLAYER1_B2 || slotIdentificator === SlotIdentificators.PLAYER1_B3)
                    {
                        if(selectedCard.categoryId === CardCategory.PERMAEFFECT)
                        {
                            selectedCard.xPos = selectedSlotId.xPos;
                            selectedCard.yPos = selectedSlotId.yPos;
                            // selectedCard.state = CardState.GAME;
                            globals.checkPlaced = true;
                        }
                    }

                    if(selectedCard.effect === Effect.SPY) {
                        if (selectedCard.type === Type.PHYSICAL && slotIdentificator === SlotIdentificators.PLAYER0_F3)
                        {
                            selectedCard.xPos = selectedSlotId.xPos;
                            selectedCard.yPos = selectedSlotId.yPos;
                            //  selectedCard.state = CardState.GAME;
                            globals.checkPlaced = true;
                        }

                        // DISTANCIA 
                        else if(selectedCard.type === Type.DISTANCE  && slotIdentificator === SlotIdentificators.PLAYER0_F2)
                        {
                            selectedCard.xPos = selectedSlotId.xPos;
                            selectedCard.yPos = selectedSlotId.yPos;
                            //  selectedCard.state = CardState.GAME;
                            globals.checkPlaced = true;
                        }
                        // ASEDIO
                        else if (selectedCard.type === Type.SIEGE  && slotIdentificator === SlotIdentificators.PLAYER0_F1)
                        {
                            selectedCard.xPos = selectedSlotId.xPos;
                            selectedCard.yPos = selectedSlotId.yPos;
                            //  selectedCard.state = CardState.GAME;
                            globals.checkPlaced = true;

                        }
                    }

                    //FIELDS PLAYER 2
                    else if (slotIdentificator === SlotIdentificators.PLAYER1_F1 || slotIdentificator === SlotIdentificators.PLAYER1_F2 || slotIdentificator === SlotIdentificators.PLAYER1_F3)
                    {
                        if(selectedCard.categoryId === CardCategory.UNIT || selectedCard.categoryId === CardCategory.INSTAEFFECT)
                        {
                            // METER IF DE TIPO CARTA:
                            // CUEPRO A CUERPO
                            if(selectedCard.cardName === 'Scorch')
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                //  selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }
                            else if (selectedCard.type === Type.PHYSICAL && slotIdentificator === SlotIdentificators.PLAYER1_F3)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                //  selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }
        
                            // DISTANCIA 
                            else if(selectedCard.type === Type.DISTANCE  && slotIdentificator === SlotIdentificators.PLAYER1_F2)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                //  selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;
                            }
                            // ASEDIO
                            else if (selectedCard.type === Type.SIEGE  && slotIdentificator === SlotIdentificators.PLAYER1_F1)
                            {
                                selectedCard.xPos = selectedSlotId.xPos;
                                selectedCard.yPos = selectedSlotId.yPos;
                                //  selectedCard.state = CardState.GAME;
                                globals.checkPlaced = true;

                            }
                            
                        }
                    }      

                }
            // console.log(selectedCard);
                if(globals.action.mousePressed && globals.checkPlaced)
                {
                    //console.log("Carta colocada");

                    // globals.mouseSelectedSlot = false;
                    // console.log("entra en el if del ");
                    // globals.mouseNotSelected = true;

                    globals.selectedCardId_Click    = -1 
                    globals.selectedSlotId          = -1
                    globals.placedCard              = true;
                    globals.checkPlaced             = false;
                    
                }
            }
        }

    }
}
// =========================
//      START OF END ROUND AND GAME OVER UPDATES
// =========================
function updateButtonTurn()
{
    // console.log(globals.actionsCounter);
    if(globals.actionsCounter === 0)
    {
        document.getElementById('btnTurn').style.display = "none";
    }
    else
    document.getElementById('btnTurn').style.display = "block";
}

function updateGameOver()
{
    // console.log("player 1:  " + globals.checkRoundPlayer1);
    // console.log("player 2:  " + globals.checkRoundPlayer2);
    // console.log(globals.checkBothPlayerRound);
    // console.log(Turn.NO_TURN);  
    // console.log(globals.turnState);
    if(globals.playerTokens[0][0].showBack && globals.playerTokens[0][1].showBack)
    {
        globals.winner = globals.selectedEnemy;
        globals.checkIfLives0 = true;
    }
    else if(globals.playerTokens[1][0].showBack && globals.playerTokens[1][1].showBack)
    {
        globals.winner = localStorage.getItem('izen_abizena');
        globals.checkIfLives0 = true;
    }
}

function updateEndRound()
{

    //Player1Points invitado
    //Player1Points host
    if(globals.turnState === Turn.NO_TURN)
    {
        // let liveNum1 = 0;
        // let liveNum2 = 0;
        if(globals.player1Points > globals.player2Points)
        {
            globals.playerTokens[1][globals.player1LivesDeleted].showBack = true;
            globals.roundWinner = localStorage.getItem('izen_abizena');
            console.log("entra en player1 gana");
            globals.player1LivesDeleted++;
        }
        else if(globals.player1Points < globals.player2Points)
        {
            
            globals.playerTokens[0][globals.player2LivesDeleted].showBack = true;
            globals.roundWinner = globals.selectedEnemy;
            console.log("entra en player2 gana");
            globals.player2LivesDeleted++;
        }
        else
        {
            console.log("han empatado");
            globals.playerTokens[1][globals.player1LivesDeleted].showBack = true;
            globals.playerTokens[0][globals.player2LivesDeleted].showBack = true;
            globals.roundWinner = localStorage.getItem('izen_abizena');
            globals.player1LivesDeleted++;
            globals.player2LivesDeleted++;
        } 

        for(let i = 0; i < globals.cards.length; i++)
        {
            if(globals.cards[i].state === CardState.GAME)
            {
                globals.cards[i].state = CardState.DISCARD;
                globals.cards[i].showBack = true;
            }
        }

        // // console.log(globals.roundWinner);
        if(globals.roundWinner === localStorage.getItem('izen_abizena'))
        {
            globals.checkBothPlayerRound = false;
            globals.checkRoundPlayer1 = false;
            globals.checkRoundPlayer2 = false;
            globals.turnState = Turn.PLAYER0;
        }
    
        else if(globals.roundWinner === globals.selectedEnemy)
        {
            globals.checkBothPlayerRound = false;
            globals.checkRoundPlayer1 = false;
            globals.checkRoundPlayer2 = false;
            globals.turnState = Turn.PLAYER1;
        }
       console.log(globals.checkBothPlayerRound);
        //Empieza la ronda el que ha ganado.

        endRoundDecoyReset();

        dealCards()
    }

    // else if(globals.turnState === Turn.PLAYER1 || globals.turnState === Turn.PLAYER2)
    // console.log(globals.turnState);
}


function updateActions(card)
{
    // globals.Action Sera el estado que tendra un update constante para saber de quien es el turno en todo momento
    // Cuando sea el turno correspondiente de alguno de los dos jugadores en algun turno en concreto se sumara a una globla actionPlayer ++ - Esta lo que hara sera
    // Permitir que solo se puedan hacer dos actionPlayer es decir: si ActionPlayer >= 2 se resetea ese action Player y se pasa al siguiente turno:  
    
    // CHECK DE CAMBIO AUTOMATICO DE TURNO
    // checkIfRoundPass();

    if (globals.turnState === Turn.PLAYER0 && !globals.checkRoundPlayer1 )
    {
        // console.log("entra if Player1")
        // console.log(card.state);

        // console.log(globals.placedCard);
        // globals.actionsCounter.player1 = 0;
        if(globals.placedCard && globals.action.mousePressed)
        {
            // console.log("Entra en if de funcion UpdateActions")
            // globals.actionsCounter ++;
            globals.timerActivate = true;
            // console.log("Acccion: " + globals.actionsCounter.player0 + " Player 0");
            globals.placedCard = false;
        }
    }

    if(globals.turnState === Turn.PLAYER1 && !globals.checkRoundPlayer2)
    {
        // globals.actionsCounter.player0 = 0;
        if(globals.placedCard && globals.action.mousePressed)
        {
            // globals.actionsCounter ++;
            globals.timerActivate = true;
            // console.log("Acccion: " + globals.actionsCounter.player1 + " Player 1");
            globals.placedCard = false;
        }
        
    }

    else if (globals.turnState === Turn.NO_TURN)
    {
        console.log("NO TURN");
        globals.actionsCounter = 0;
    }

    updateSlots();
}

function updateLives()
{
    // console.log(globals.actionsCounter.player0);
    if(globals.actionsCounter.player0 > 0)
    {
        console.log("entra en if1");
        let liveNum = 0;
        globals.playerTokens[1][0].showBack = true;
        globals.playerTokens[1][1].showBack = true;
        liveNum++;
    }
    else if(globals.actionsCounter.player1 > 0)
    {
        let liveNum = globals.actionsCounter.player1 - 1;
        globals.playerTokens[0][0].showBack = true;
        globals.playerTokens[0][1].showBack = true;
    }
}

function endRoundDecoyReset(){

    for(let i = 0; i < 2; i++){
        for(let j = 0; j < globals.player[i].length; j++){
            if(globals.player[i].effect === Effect.DECOY && globals.player[i].showBack === true){
                globals.player[i].showBack = false;
                j = globals.player[i].length;
            }
        }
    }
}

function dealCards(){
    for(let k = 0; k < 2; k++){
        let handIdentificatorDeal;
        
        if(k === 0)
            handIdentificatorDeal = SlotIdentificators.PLAYER0_HAND
        else
            handIdentificatorDeal = SlotIdentificators.PLAYER1_HAND

        for(let h = 0; h < 2; h++){

            for(let i = 0; i < globals.player[k].length; i++){

                if(globals.player[k][i].state === CardState.DECK){
    
                    for(let l = 0; l < globals.slots.length; l++){
                        if(globals.slots[l].placed_cards === -1 && globals.slots[l].slotIdentificator === handIdentificatorDeal){
                            globals.player[k][i].xPos = globals.slots[l].xPos;
                            globals.player[k][i].yPos = globals.slots[l].yPos;
                            globals.player[k][i].state = CardState.HAND;
                            globals.player[k][i].showBack = true;
                            globals.slots[l].placed_cards++;
                            l = globals.slots.length;
                            i = globals.player[k].length;
    
                        }
                    }
                }
            }
        }
        
    }

    updateSlots();
}
// =========================
//     END OF END ROUND AND GAME OVER UPDATES
// =========================

function updateLevelTime()
{
    if(globals.timerActivate)
    {
        globals.levelTime.timeChangeCounter += globals.deltaTime *2;
    
        if (globals.levelTime.timeChangeCounter > globals.levelTime.timeChangeValue)
        {
            console.log("entra en updateLevelTime");
            globals.levelTime.value++;

            //Reseteamos timeChangeCounter
            globals.levelTime.timeChangeCounter = 0; 
        }
    }
   
    if( globals.levelTime.value >= 1)
    {
        globals.actionsCounter++;
        globals.levelTime.value     = 0;
        globals.timerActivate       = false;

    }
}

export {
    update,
    checkStates,
    localStorageCheck,
    localStorageUpdate,
    logOut,
    createExpertDeck,
    startingDeal,
    distributeHandCards,
    detectCollisionBetweenMouseAndSlots,
    placeCard,
    discardCards,
    updateSelectedCard,
    decoyEffectResult,
}