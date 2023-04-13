import globals from "./globals.js";
import { State, CardState, SlotIdentificators, Effect, GameMode, Player1_map_pos, Player0_map_pos, Turn} from "./constants.js";
import { createExpertDeck, createNormalDeck, initSlots, initCardInfo, initCardLinks, loadAssets } from "./initialize.js";
import {detectCollisionBetweenMouseAndCards } from "./collision.js";
import { selectEnemy, createList} from "./events.js";
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
    // console.log("Turno: " + globals.turnState);

    updateTurn();

    //updateSlots();
    
    updateCards();
    updateSelectedCard();

    detectCollisionBetweenMouseAndSlots();
    placeCard();

    // checkEndRound();



    if(globals.action.d){
        // REPARTIR A LA MANO - Un jugador
        

        console.log(globals.cards.length);
        // console.log(globals.player[0]);
        // console.log(globals.player[1]);

    }

    //Funcion que comprueba cosntantemente si un slot esta vacio o no
    // updateSlots(globals.slots);

   
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

        case State.GAME_START:
            // GENERAR EL MAZO 
            createNormalDeck();

            // LLAMAR A LA FUNION STARTING DEAL y CAMBIAMOS EL ESTADO DEL JUEGO
            startingDeal(GameMode.NORMAL_MODE);
            distributeHandCards();
            
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
            if(globals.otherSelected)
            {
                card.state = card.previousState;
            }

            else if (globals.decoy)
            {
                checkIfSlotAvailable(Effect.DECOY, card, globals.turnState)
                CardState.HAND;
            }
            else if (globals.double_click)
            {
                CardState.DOUBLE_CLICK;
            }

            else if (globals.medic)
            {
                CardState.GAME;
            }
            //CASO DE COLOCAR AL PRINCIPIO Y REALIZAR EFECTO
            else if(globals.action.clickSlot){ 
                checkCardEffect(card);
            }


            break;


        case CardState.HOVER:
            if(!globals.detectCollisionBetweenMouseAndCards)
            {
                card.state = card.previousState;
            }

            else if (globals.action.click)
            {
                card.state = CardState.SELECTED;
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

            else if(globals.inmediateEffect && globals.effectFinished)
            {
                CardState.DISCARD;
            }
            else;

            break;


        case CardState.DISCARD:
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


function discardCards(){
    for(let i = 0; i < 2; i++){
        for(let l = 0; l < globals.player[i].length; l++){
            if(globals.player[i][l].state === CardState.DISCARD){
                if(i === 0){
                    globals.player[i][l].xPos = Player0_map_pos
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
            decoyEffect(card)
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
    const typeToScorch = card.type;
    const fieldID      = card.slotIdentificators;
    let valueToScorch = -1;

    for(let i = 0; i < globals.cards.length; i++){
        let cardToCompare = globals.cards[i];
        if(cardToCompare.type === typeToScorch && cardToCompare.SlotIdentificators !== fieldID && cardToCompare.state === CardState.GAME){
            if(cardToCompare.value > valueToScorch)
                valueToScorch = cardToCompare.value;
        }
    }

    for(let i = 0; i < globals.cards.length; i++){
        let cardToCompare = globals.cards[i];
        if(cardToCompare.value === valueToScorch && cardToCompare.SlotIdentificators !== fieldID  && cardToCompare.state === CardState.GAME){
            cardToCompare.state = CardState.DISCARD;
        }
    }

    
    card.state = CardState.DISCARD;

}

function medicEffect(card){
    const typeToMedic = card.type;
    let playerNum;
    let valueToMedic = -1;


    if(card.slotIdentificators < SlotIdentificators.PLAYER0_F1)

        playerNum = 0;
    else
        playerNum = 1;

    const playerarray = globals.player[playerNum];

    for(let i = 0; i < playerarray.length; i++){
        let cardToCompare = playerarray[i];

        if(cardToCompare.type === typeToMedic && cardToCompare.state === CardState.DISCARD){
            if(cardToCompare.value > valueToMedic)
                valueToScorch = cardToCompare.value;
        }
    }

    for(let i = 0; i < playerarray.length; i++){
        let cardToCompare = playerarray[i];
        if(cardToCompare.value === valueToMedic && cardToCompare.state === CardState.DISCARD){

            cardToCompare.slotIdentificator = card.slotIdentificator;
            checkIfSlotAvailable(Effect.MEDIC, cardToCompare, playerNum);

            i = playerarray.length;
        }
    }

}

function decoyEffect(card){
    globals.decoy = true;

    card.state = CardState.DISCARD;

}

function spyEffect(card){

}

function musterEffect(card){
    let nameToSearch = "";
    let playerNum;

    if(card.slotIdentificators < SlotIdentificators.PLAYER0_F1)
        playerNum = 0;
    else
        playerNum = 1;

    
    switch (card.name){
        case "Akerbeltz":
            nameToSearch = "Akerbeltz_morroi";
            break;
        case "Sorgina":
            nameToSearch = "Sorginak";
            break;
    }

    for(let i = 0; i < globals.player[playerNum].length; i++){
        let searchingCard = globals.player[playerNum][i];

        if(searchingCard.name === card.name || searchingCard.name === nameToSearch){

            if(searchingCard.state === CardState.DECK){
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
            for(let i = 0; i < globals.slots.length; i++){
                if(globals.player[playerNum][i].SlotIdentificator === card.slotIdentificator)
                    medicChecks++  
            }

            if(medicChecks < 8){
                for(let i = 0; i < globals.player[playerNum].length; i++){
                    if(globals.player[playerNum][i].name === card.name && globals.player[playerNum][i].state === CardState.DISCARD){
                        for(let l = 0; l < globals.slots.length; l++){
                            if(globals.slots[l].placed_cards !== -1 && globals.slots[l].slotIdentificator){

                                card.xPos = globals.slots[i].xPos;
                                card.yPos = globals.slots[i].yPos;
                                card.state = CardState.GAME;
                                card.showBack = false;
                            }
                        }

                    }
                }
            }

            break;

        case Effect.MUSTER:
            let effectChecks = 0;
            for(let i = 0; i < globals.slots.length; i++){
                if(globals.player[playerNum][i].SlotIdentificator === card.slotIdentificator)
                effectChecks++  
            }

            if(effectChecks < 8){
                for(let i = 0; i < globals.player[playerNum].length; i++){
                    if(globals.player[playerNum][i].name === card.name && globals.player[playerNum][i].state === CardState.DISCARD){
                        for(let l = 0; l < globals.slots.length; l++){
                            if(globals.slots[l].placed_cards !== -1 && globals.slots[l].slotIdentificator === card.slotIdentificator){

                                card.xPos = globals.slots[i].xPos;
                                card.yPos = globals.slots[i].yPos;
                                card.state = CardState.GAME;
                                card.showBack = false;
                            }
                        }

                    }
                }
            }
            break;
        case Effect.SPY:
            break;
        case Effect.DECOY:
            let decoyChecks = 0;
            let handIdentificator;

            if(playerNum === 0)
                handIdentificator = SlotIdentificator.PLAYER0_HAND;
            else
            handIdentificator = SlotIdentificator.PLAYER1_HAND;

            for(let i = 0; i < globals.slots.length; i++){
                if(globals.player[playerNum][i].slotIdentificator === handIdentificator)
                decoyChecks++  
            }
        
            if(decoyChecks < 12){

                if(globals.slots[l].placed_cards !== -1 && globals.slots[l].slotIdentificator === handIdentificator){

                    card.xPos = globals.slots[i].xPos;
                    card.yPos = globals.slots[i].yPos;
                    card.state = CardState.HAND;
                    card.showBack = false;
                }
            }
            break;
    }
}
// =========================
//      END OF EFFECTS
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

        buff1   = SlotIdentificators.PLAYER0_B1;
        buff2   = SlotIdentificators.PLAYER0_B2;
        buff3   = SlotIdentificators.PLAYER0_B3;
        field1  = SlotIdentificators.PLAYER0_F1;
        field2  = SlotIdentificators.PLAYER0_F2;
        field3  = SlotIdentificators.PLAYER0_F3;
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
        //globals.cards.splice(cardsToDraw);
    }

    else
        cardsToDraw = 80;

    shuffleDeck(globals.cards)

    for(let i = 0; i < cardsToDraw; i++){
        if(i % 2 === 0){
            globals.cards[i].xPos  = Player0_map_pos.PLAYER0_DECK_XPOS;
            globals.cards[i].yPos  = Player0_map_pos.PLAYER0_DECK_YPOS;
            globals.player[0].push(globals.cards[i]); //Array que almacena las cartas para el player 1
        }

        else
        {
            globals.cards[i].xPos  = Player1_map_pos.PLAYER1_DECK_XPOS;
            globals.cards[i].yPos  = Player1_map_pos.PLAYER1_DECK_YPOS;
            globals.player[1].push(globals.cards[i]); //Array que almacena las cartas para el player 2
        }
            
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

function updateSlots(slot, card)
{

}

function distributeHandCards()
{
    // console.log("Entra en Distribute");
    createDistribution();
}

function createDistribution()
{
    let cardsToDraw = 20;
    let Player2HandxPos =  Player0_map_pos.PLAYER0_CARDS_IN_HAND1_XPOS;
    let Player1HandxPos =  Player1_map_pos.PLAYER1_CARDS_IN_HAND1_XPOS;

    for(let i = 0; i < cardsToDraw; i++)
    {
        if(i % 2 === 0){
            // console.log("entra player 2");
            // console.log("Player 2 xPos : " + Player2HandxPos);
            // console.log(globals.cards[i].xPos);

            globals.cards[i].xPos  = Player2HandxPos;
            globals.cards[i].yPos  = Player0_map_pos.PLAYER0_CARDS_IN_HAND_YPOS;
            globals.player[0].push(globals.cards[i]); 
            Player2HandxPos += 80;

            // globals.cards[i].showBack = false;

            // console.log(globals.cards[i].xPos);
            
        }

        else
        {
            // console.log("entra player 1");
            globals.cards[i].xPos  = Player1HandxPos;
            globals.cards[i].yPos  = Player1_map_pos.PLAYER1_CARDS_IN_HAND_YPOS;
            globals.player[1].push(globals.cards[i]);
            Player1HandxPos += 80;
        }

        
       
    }
}

function updateTurn()
{
    let player1 = 0;
    let player2 = 1;

    if (globals.turnState === Turn.PLAYER1)
    {
        // console.log("Entra en Turno Player 1");
        cardsHide(player2); // Ocultamos las cartas del jugador anterior

        cardsInHand(player1);
        
    }

    else if (globals.turnState === Turn.PLAYER2)
    {
        // console.log("Entra en Turno Player 2");
        cardsHide(player1); // Ocultamos las cartas del jugador anterior

        cardsInHand(player2);
    }

    else
        console.log("No es turno de ninguno de los dos");
}

function cardsInHand(j)
{   
    // console.log("Entra en cardsInHandP1");
    let cardsInHand = 10; // FALTA UNA GLOBAL QUE SE ACTUALIZE PARA SABER LAS CARTAS DE LA MANO CONSTANTEMENTE

    for (let i = 0; i < cardsInHand; i++)
    {
        // console.log(globals.player[0][i].showBack);
        globals.player[j][i].showBack = false;
    }
}

function cardsHide(j)
{
    let cardsInHand = 10; // FALTA UNA GLOBAL QUE SE ACTUALIZE PARA SABER LAS CARTAS DE LA MANO CONSTANTEMENTE

    for (let i = 0; i < cardsInHand; i++)
    {
        // console.log(globals.player[0][i].showBack);
        globals.player[j][i].showBack = true;
    }
}

function updateSelectedCard()
{
    if (globals.action.mousePressed)
    {
        for(let i = 0; i < globals.cards.length; ++i)
        {
            const card = globals.cards[i];
            const xSize = 80;
            const ySize = 100;
        
            if(globals.mouse.x < (card.xPos + xSize) && globals.mouse.x >= card.xPos && globals.mouse.y < (card.yPos + ySize) && globals.mouse.y > card.yPos)
            {
                // console.log("Entra if");
                globals.mouseSelectedCard = true;
                
                if(globals.selectedCardId_Click === -1)
                    globals.selectedCardId_Click = i;
                else
                    globals.selectedCardId_Click = -1;

                    console.log(globals.selectedCardId_Click);
                break;
            }
            else
            {
                globals.mouseSelectedCard = false; 
                globals.selectedCardId_Click = -1;
            }
            

            globals.action.mousePressed = false;
        }
    }
    

}

function detectCollisionBetweenMouseAndSlots()
{
    // console.log("Entra en funcion Colision Slots")
    // console.log(globals.action.mousePressed);
    if (true)
    {
        console.log("Entra en if Slots")
        for(let i = 0; i < globals.slots.length; ++i)
        {
            const slot = globals.slots[i];
            const xSize = 80;
            const ySize = 100;
        
            if(globals.mouse.x < (slot.xPos + xSize) && globals.mouse.x >= slot.xPos && globals.mouse.y < (slot.yPos + ySize) && globals.mouse.y > slot.yPos)
            {
                // console.log("Entra if");
                globals.mouseSelectedSlot = true;
                
                if(globals.selectedSlotId === -1)
                    globals.selectedSlotId = i;
                else
                    globals.selectedSlotId = -1;

                    console.log("Slot: " + globals.selectedSlotId);
                break;
            }
            else
            {
                globals.mouseSelectedSlot = false; 
                globals.selectedSlotId = -1;
            }
            

            globals.action.mousePressed = false;
        }
    }
    

}

function placeCard()
{
    if(globals.selectedCardId_Click != -1 && globals.selectedSlotId != -1 )
    {
        const selectedCard      = globals.cards[globals.selectedCardId_Click];
        const selectedSlotId    = globals.slots[globals.selectedSlotId]; 
        selectedCard.xPos = selectedSlotId.xPos;
        selectedCard.yPos = selectedSlotId.yPos;
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
}