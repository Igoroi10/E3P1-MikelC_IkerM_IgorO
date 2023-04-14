import globals from "./globals.js";
import { State, CardState, SlotIdentificators, Effect, GameMode, Player1_map_pos, Player0_map_pos, Turn, Common_map_pos, Type, CardCategory} from "./constants.js";
import { createExpertDeck, createNormalDeck, initSlots, initCardInfo, initCardLinks, loadAssets } from "./initialize.js";
import {detectCollisionBetweenMouseAndCards } from "./collision.js"; 
import { selectEnemy, createList} from "./events.js";
import { Card } from "./Card.js";
import { renderCard } from "./gameRender.js";

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
    // console.log(globals.cards);

    updateTurn();

    updateSlots();
    
    updateCards();

    updateSelectedCard();

    detectCollisionBetweenMouseAndSlots();

    placeCard();

    updateTokenPlacement();
    // updateLives();
    updateGameOver();

    updateActions();

    // checkEndRound();



    if(globals.action.d){
        // REPARTIR A LA MANO - Un jugador
        

        // console.log(globals.cards.length);
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
            if(globals.otherSelected)
            {
                card.state = card.previousState;
            }

            else if (globals.decoy)
            {
                for(let i = 0; i < globals.player[globals.turnState].length; i++){

                    if(globals.player[globals.turnState].state = selected)
                        checkIfSlotAvailable(Effect.DECOY, card, globals.turnState)
                }
                   
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


function discardCards()
{
    console.log("entra en funcion discardCards");
    for(let i = 0; i < 2; i++)
    {
        for(let k = 0; k < globals.player[i].length; k++)
        {
            if(globals.player[i][k].state === CardState.DISCARD)
            {
                console.log("ENTRA EN EL IF");

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
    checkIfSlotAvailable(Effect.SPY, card, globals.turnState)
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
            
            for(let k = 0; k < 2; k++){
                let spyChecks = 0;
                let handIdentificatorSpy;
    
                if(playerNum === 0)
                    handIdentificatorSpy = SlotIdentificator.PLAYER0_HAND;
                else
                    handIdentificatorSpy = SlotIdentificator.PLAYER1_HAND;
    
                for(let i = 0; i < globals.slots.length; i++){
                    if(globals.player[playerNum][i].slotIdentificator === handIdentificatorSpy)
                    spyChecks++  
                }
            
                if(spyChecks < 12){
    
                    for(let l = 0; l < globals.slots.length; l++){
                        if(globals.slots[l].placed_cards !== -1 && globals.slots[l].slotIdentificator === handIdentificatorSpy){
    
                            card.xPos = globals.slots[i].xPos;
                            card.yPos = globals.slots[i].yPos;
                            card.state = CardState.HAND;
                            card.showBack = false;
                        }
                    }
                }
                     
            }
            let spyChecks = 0;
            let handIdentificatorSpy;

            if(playerNum === 0)
                handIdentificatorSpy = SlotIdentificator.PLAYER0_HAND;
            else
                handIdentificatorSpy = SlotIdentificator.PLAYER1_HAND;

            for(let i = 0; i < globals.slots.length; i++){
                if(globals.player[playerNum][i].slotIdentificator === handIdentificatorSpy)
                spyChecks++  
            }
        
            if(spyChecks < 12){

                for(let l = 0; l < globals.slots.length; l++){
                    if(globals.slots[l].placed_cards !== -1 && globals.slots[l].slotIdentificator === handIdentificatorSpy){

                        card.xPos = globals.slots[i].xPos;
                        card.yPos = globals.slots[i].yPos;
                        card.state = CardState.HAND;
                        card.showBack = false;
                    }
                }
            }
                
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

                for(let l = 0; l < globals.slots.length; l++){
                    if(globals.slots[l].placed_cards !== -1 && globals.slots[l].slotIdentificator === handIdentificator){

                        card.xPos = globals.slots[i].xPos;
                        card.yPos = globals.slots[i].yPos;
                        card.state = CardState.HAND;
                        card.showBack = false;
                    }
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
        // console.log("no logged")
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

function startingTokensDeal()
{
    
    for(let i = 0; i < globals.tokens.length; i++){
        if(i === 1)
        {
            globals.tokens[i].xPos  = Common_map_pos.PLAYER1_LIVE1_XPOS;
            globals.tokens[i].yPos  = Common_map_pos.PLAYER1_LIVE_YPOS;
            globals.playerTokens[0].push(globals.tokens[i]); //Array que almacena las cartas para el player 1
        }
        else if(i === 2)
        {
            globals.tokens[i].xPos  = Common_map_pos.PLAYER1_LIVE2_XPOS;
            globals.tokens[i].yPos  = Common_map_pos.PLAYER1_LIVE_YPOS;
            globals.playerTokens[0].push(globals.tokens[i]); //Array que almacena las cartas para el player 2
        }
        else if(i === 3)
        {
            globals.tokens[i].xPos  = Common_map_pos.PLAYER0_LIVE1_XPOS;
            globals.tokens[i].yPos  = Common_map_pos.PLAYER0_LIVE1_YPOS;
            globals.playerTokens[1].push(globals.tokens[i]); //Array que almacena las cartas para el player 2
        }
        else if(i === 4)
        {
            globals.tokens[i].xPos  = Common_map_pos.PLAYER0_LIVE2_XPOS;
            globals.tokens[i].yPos  = Common_map_pos.PLAYER0_LIVE1_YPOS;
            globals.playerTokens[1].push(globals.tokens[i]); //Array que almacena las cartas para el player 2
        }
        else
        {
            globals.tokens[i].xPos = Common_map_pos.PLAYER1_TURN_TOKEN_XPOS;
            globals.tokens[i].yPos = 0;
        }
    }
 
}

function updateTokenPlacement()
{
    for(let i = 0; i < globals.tokens.length; i++)
    {
        // console.log(globals.turnState);
        if(globals.turnState === Turn.PLAYER2)
        {
            globals.tokens[0].yPos = Common_map_pos.PLAYER1_TURN_TOKEN_YPOS;
        }
        else if(globals.turnState === Turn.PLAYER1)
        {
            globals.tokens[0].yPos = Common_map_pos.PLAYER0_TURN_TOKEN_YPOS;
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

function updateSlots(slot, card)
{
    // Mire a ver si slot esta vacio o no
    // Asignarle el id de la carta en el globlas.cards la "i"
    // Y asignarle a la carta el identificador de ese slot
    
    // console.log(globals.cards[0].slotIdentificator)

    for (let i = 0; i < globals.cards.length; i++)
    {
        for (let j = 0; j < globals.slots.length; j++)
        {
            if (globals.cards[i].xPos === globals.slots[j].xPos && globals.cards[i].yPos === globals.slots[j].yPos )
            {
                globals.cards[i].slotIdentificator = globals.slots[j].slotIdentificator;
                globals.slots[j].placed_cards = i;
            }

            else
            {
                globals.cards[i].slotIdentificator = -1
                globals.slots[j].placed_cards = -1;
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
    let cardsToDraw = 20;
    let Player1HandxPos =  Player0_map_pos.PLAYER0_CARDS_IN_HAND1_XPOS;
    let Player0HandxPos =  Player1_map_pos.PLAYER1_CARDS_IN_HAND1_XPOS;

    let player1HandyPos = Player0_map_pos.PLAYER0_CARDS_IN_HAND_YPOS;
    let player0HandyPos = Player1_map_pos.PLAYER1_CARDS_IN_HAND_YPOS;

    for(let i = 0; i < cardsToDraw; i++)
    {

        if(i % 2 === 0)
        {
            globals.player[0][i].xPos       = Player0HandxPos;
            globals.player[0][i].yPos       = Player0_map_pos.PLAYER0_CARDS_IN_HAND_YPOS;
            globals.player[0][i].showBack   = false;
            globals.player[0][i].state      = CardState.HAND
            globals.slots[i].xPos           = Player0HandxPos;
            globals.slots[i].yPos           = player0HandyPos;
            Player0HandxPos += 75;


            // globals.cards[i].showBack = false;

            // console.log(globals.cards[i].xPos);
            
        }

        else
        {
            // console.log("entra player 1");

            globals.player[1][i].xPos       = Player1HandxPos;
            globals.player[1][i].yPos       = Player1_map_pos.PLAYER1_CARDS_IN_HAND_YPOS;
            globals.player[1][i].showBack   = false;
            globals.player[1][i].state      = CardState.HAND
            globals.slots[i].xPos           = Player1HandxPos;
            globals.slots[i].yPos           = player1HandyPos;

            Player1HandxPos += 75;
            
        }

        
       
    }
}

function updateTurn()
{
    // console.log("entra en update");

    let player1 = 0;
    let player2 = 1;

    if (globals.turnState === Turn.PLAYER1)
    {  
        console.log("turno player1")
        // console.log("Entra en Turno Player 1");
        cardsHide(player2); // Ocultamos las cartas del jugador anterior

        cardsInHand(player1);
        
    }

    else if (globals.turnState === Turn.PLAYER2)
    {
        console.log("Entra en Turno Player 2");
        cardsHide(player1); // Ocultamos las cartas del jugador anterior

        cardsInHand(player2);
    }

    else
        console.log("No es turno de ninguno de los dos");
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
        // console.log("Entra en for de hide")
        let card = globals.player[playerNum][i];
        if(card.state === CardState.HAND){
            // console.log("Entra en if de hide")
            card.showBack = true;
        }

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

                    // console.log(globals.selectedCardId_Click);
                break;
            }
            else
            {
                globals.mouseSelectedCard = false; 
                globals.selectedCardId_Click = -1;
            }
            

            // globals.action.mousePressed = false;
        }
    }
    

}

function detectCollisionBetweenMouseAndSlots()
{
    // console.log("Entra en funcion Colision Slots")
    // console.log(globals.action.mousePressed);
    if (true)
    {
        // console.log("Entra en if Slots")
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

                    // console.log("Slot: " + globals.selectedSlotId);
                    // console.log("Slot: " + slot.slotIdentificator);
                break;
            }
            else
            {
                globals.mouseSelectedSlot = false; 
                globals.selectedSlotId = -1;
            }
            

            // globals.action.mousePressed = false;
        }
    }
    

}

function placeCard()
{
    // console.log(globals.cards[globals.selectedCardId_Click]);
    if(globals.selectedCardId_Click != -1 && globals.selectedSlotId != -1)
    {
        const selectedCard      = globals.cards[globals.selectedCardId_Click];
        const selectedSlotId    = globals.slots[globals.selectedSlotId]; 
        const slotIdentificator = globals.slots[globals.selectedSlotId].slotIdentificator;
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
        if (globals.turnState === Turn.PLAYER2)
        {
            // ==============
            //     UNITS
            // ==============

            //BUFFS PLAYER 1
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

            //FIELDS PLAYER 1
            else if (slotIdentificator === SlotIdentificators.PLAYER1_F1 || slotIdentificator === SlotIdentificators.PLAYER1_F2 || slotIdentificator === SlotIdentificators.PLAYER1_F3)
            {
                if(selectedCard.categoryId === CardCategory.UNIT)
                {
                    // METER IF DE TIPO CARTA:
                    // CUEPRO A CUERPO
                    if (selectedCard.type === Type.PHYSICAL && slotIdentificator === SlotIdentificators.PLAYER1_F3)
                    {
                        selectedCard.xPos = selectedSlotId.xPos;
                        selectedCard.yPos = selectedSlotId.yPos;
                        // selectedCard.state = CardState.GAME;
                        globals.checkPlaced = true;
                    }

                    // DISTANCIA 
                    else if(selectedCard.type === Type.DISTANCE  && slotIdentificator === SlotIdentificators.PLAYER1_F2)
                    {
                        selectedCard.xPos = selectedSlotId.xPos;
                        selectedCard.yPos = selectedSlotId.yPos;
                        // selectedCard.state = CardState.GAME;
                        globals.checkPlaced = true;
                    }
                    // ASEDIO
                    else if (selectedCard.type === Type.SIEGE  && slotIdentificator === SlotIdentificators.PLAYER1_F1)
                    {
                        selectedCard.xPos = selectedSlotId.xPos;
                        selectedCard.yPos = selectedSlotId.yPos;
                        // selectedCard.state = CardState.GAME;
                        globals.checkPlaced = true;
                    }

                    
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

            //FIELDS PLAYER 2
            else if (slotIdentificator === SlotIdentificators.PLAYER0_F1 || slotIdentificator === SlotIdentificators.PLAYER0_F2 || slotIdentificator === SlotIdentificators.PLAYER0_F3)
            {
                if(selectedCard.categoryId === CardCategory.UNIT)
                {
                    // METER IF DE TIPO CARTA:
                     // CUEPRO A CUERPO
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
            }        
        }
        
        // console.log(selectedCard);
        if(globals.action.mousePressed && globals.checkPlaced)
        {
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

function updateGameOver()
{
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

function updateActions()
{
    // globals.Action Sera el estado que tendra un update constante para saber de quien es el turno en todo momento
    // Cuando sea el turno correspondiente de alguno de los dos jugadores en algun turno en concreto se sumara a una globla actionPlayer ++ - Esta lo que hara sera
    // Permitir que solo se puedan hacer dos actionPlayer es decir: si ActionPlayer >= 2 se resetea ese action Player y se pasa al siguiente turno:  
    
    // CHECK DE CAMBIO AUTOMATICO DE TURNO
    if(globals.actionsCounter.player1 >= 2)
    {
        console.log("Entra en cambio de turno PLayer1 a Player2");
        globals.turnState = Turn.PLAYER2;
        globals.actionsCounter.player1 = 0;

    }
    else if (globals.actionsCounter.player2 >= 2)
    {
        console.log("Entra en cambio de turno PLayer2 a Player1");
        globals.turnState = Turn.PLAYER1;
        globals.actionsCounter.player1 = 0;
    }


    if (globals.turnState === Turn.PLAYER1)
    {
        // console.log("entra if Player1")
        globals.actionsCounter.player2 = 0;
        if(globals.placedCard && !globals.action.mousePressed)
        {
            console.log("Entra en if de funcion UpdateActions")
            globals.actionsCounter.player1 ++;
            console.log("Acccion: " + globals.actionsCounter.player1 + " Player 1");
            globals.placedCard = false;
        }
    }

    if(globals.turnState === Turn.PLAYER2)
    {
        globals.actionsCounter.player1 = 0;
        if(globals.placedCard && !globals.action.mousePressed)
        {
            globals.actionsCounter.player2 ++;
            console.log("Acccion: " + globals.actionsCounter.player2 + " Player 2");
            globals.placedCard = false;
        }
        
    }

    else if (globals.turnState === Turn.NO_TURN)
    {
        console.log("NO TURN");
        globals.actionsCounter.player1 = 0;
        globals.actionsCounter.player2 = 0;
    }
}


function updateLives()
{
    if(globals.actionsCounter.player1 > 0)
    {
        let liveNum = globals.actionsCounter.player1 -1;
        globals.playerTokens[1][liveNum].showBack = true;
        console.log(globals.actionsCounter.player1);
        console.log(globals.playerTokens[1][liveNum]);
        renderCard(globals.playerTokens[1][liveNum]);
    }
    else if(globals.actionsCounter.player2 > 0)
    {
        let liveNum = globals.actionsCounter.player2 -1;
        globals.playerTokens[0][liveNum].showBack = true;
        console.log(globals.actionsCounter.player1);
        console.log(globals.playerTokens[0][liveNum]);
        renderCard(globals.playerTokens[0][liveNum]);
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
}