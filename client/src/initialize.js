import {btnStartDown, btnStartOver, btnStartOut, btnStartAdmin, btnStartPlayer,canvasMousedownHandler, canvasMousemoveHandler, canvasMouseupHandler, keydownHandler, keyupHandler} from "./events.js";
import globals from "./globals.js";
import {  State, Languages, CardState, CardCategory, Rarity, Effect, Type, CardQuantity, CardSizes, GameMode, FPS, Card_img_quantity} from "./constants.js";
import render from "./gameRender.js";
import {Card, UnitCard, SuddenCard, PermaCard, ClimateCard} from "./Card.js";
import FakeCard from "./FakeCard.js";
import { GameZones } from "./GameZones.js";
import { Assets } from "./Assets.js";
import ImageSet from "./ImageSet.js";
import { Player1_map_pos, Player2_map_pos, Common_map_pos } from "./constants.js";


window.onload = init;

function init()
{
    globals.buttonStart  = document.getElementById('btnStart');
    globals.buttonAdmin  = document.getElementById('btnAdmin');
    globals.buttonPlayer = document.getElementById('btnPlayer');
    globals.buttonAdd    = document.getElementById('btnAdd');

    //Get a reference to the canvas
    globals.canvas = document.getElementById('gameScreen');
    
    // document.getElementById('divCanvas').style.display = "none";

    //Context
    globals.ctx = globals.canvas.getContext('2d');

    //Inicializamos listeners
    globals.buttonStart.addEventListener("mousedown",   btnStartDown,   false);
    globals.buttonStart.addEventListener("mouseover",   btnStartOver,   false);
    globals.buttonStart.addEventListener("mouseout",    btnStartOut,    false);

    //Inicializamos el boton del admin
    globals.buttonAdmin.addEventListener("mousedown",   btnStartAdmin,   false);
    globals.buttonPlayer.addEventListener("mousedown",  btnStartPlayer, false);

    globals.buttonAdd.addEventListener("mousedown", btnAddDown, false);

    globals.btnLogin.addEventListener("mousedown", logInHandler, false);


    //Elementos
    globals.btnLogin        = document.getElementById('btnLogin'); 
    globals.inputName       = document.getElementById('id_name');
    globals.inputLastName   = document.getElementById('id_last_name');
    globals.lblSessionUser  = document.getElementById('lblSessionUser');
    globals.lblError        = document.getElementById('lblError');
    globals.sectionLogIn    = document.getElementById('sectionLogIn');
    globals.sectionPlay     = document.getElementById('sectionPlay');

    //Mostramos la pantalla de Log In
    globals.sectionLogIn.style.display  = "block";
    globals.sectionPlay.style.display   = "none";
}

function initHTMLelements()
{
    //Falta crear la global
    globals.buttonStart     = document.getElementById('btnStart');
    globals.buttonAdmin     = document.getElementById('btnAdmin');
    globals.buttonPlayer    = document.getElementById('btnPlayer');

    //Get A reference to the canvas 
    globals.canvas = document.getElementById('gameScreen');

    document.getElementById('divCanvas').style.display = "none";

    //Context
    globals.ctx = globals.canvas.getContext('2d');

    //Inicializamos listeners
    globals.buttonStart.addEventListener("mousedown",   btnStartDown, false);
    globals.buttonStart.addEventListener("mouseover",   btnStartOver,   false);
    globals.buttonStart.addEventListener("moseout",     btnStartOut,    false);
    globals.buttonAdmin.addEventListener("mousedown",   btnStartAdmin,  false);
    globals.buttonPlayer.addEventListener("mousedown",   btnStartPlayer,  false);

}

export function initGame(data)
{
    //Creamos las cartas
    createCards(data);

    //Dibuja las cartas
    render();
}




function initVars()
{
    //Inicializamos las variables de gestión de tiempo
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS; //Frame time in seconds

    //Inicializamos el estado del juego
    globals.gameState = State.LOADING;

    //Inicializamos los estados de las acciones
    globals.action = {
        mousePressed: false
    };

    //Inicializamos el objeto mouse
    globals.mouse = {
        x: -1,
        y: -1
    }
}

function initEvents()
{

    //Add the keyboard event listeners
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    //Add the event listeners
    globals.canvas.addEventListener("mouseup",   canvasMouseupHandler, false);
    globals.canvas.addEventListener("mousedown", canvasMousedownHandler, false);
    globals.canvas.addEventListener("mousemove", canvasMousemoveHandler, false);
}

//===========================================
//                  ASSETS
//===========================================

function loadAssets()
{
    // console.log("entra en loadAssets");

    loadCardImages();

//  gameState = STATE.PLAYING;   
}

function loadCardImages(){

    // console.log("entra en load card images");

    for (let i = 0; i < globals.img_url.length; i++)
    {
        

        let cardImg;

        const url ="."+globals.img_url[i].URL;

        if (i < Card_img_quantity.UNIT_CARD )
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.front_img.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else if (i < Card_img_quantity.EFFECT_CARDS)
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_effect.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else if (i < Card_img_quantity.VALUE_CARDS)
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_value.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else if (i < Card_img_quantity.CATEGORY_CARDS)
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_category.push(cardImg)
            globals.assetsToLoad.push(cardImg);

        }
        else if (i < Card_img_quantity.TYPE_CARDS)
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_type.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else if ( i < Card_img_quantity.FRAME_CARDS)
        {   
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_frame.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_reverse.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }

        console.log("fin de carga de imagenes");
    }


}



function loadHandler()
{
    
    globals.assetsLoaded++; 
    console.log ("Assets loaded: " + globals.assetsLoaded);
    console.log ("Assets to load: " + globals.assetsToLoad.length);

    
    //Una vez se han cargado todos los activos pasamos
    if(globals.assetsLoaded === globals.assetsToLoad.length)
    {
        //remove the load event listener
        for (let i = 0; i < globals.assets.front_img.length; i++)
        {
            globals.assets.front_img[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_frame.length; i++)
        {
            globals.assets.card_frame[i].removeEventListener("load", loadHandler, false);
        }

        
        for (let i = 0; i < globals.assets.card_reverse.length; i++)
        {
            globals.assets.card_reverse[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_category.length; i++)
        {
            globals.assets.card_category[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_type.length; i++)
        {
            globals.assets.card_type[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_effect.length; i++)
        {
            globals.assets.card_effect[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_value.length; i++)
        {
            globals.assets.card_value[i].removeEventListener("load", loadHandler, false);
        }


        console.log("Assets finished loading");


    }
}

function logInHandler(event)
{
    console.log("Send Button Pressed");

    //Send data
    const objectToSend = {
        name: globals.inputName.value,
        lastName: globals.inputLastName.value
    }

    const dataToSend = 'name=' + objectToSend.name + '&lastName=' + objectToSend.lastName;

    console.log(dataToSend);

    //Ruta relativa al fichero que hace la petición (verifyUser.php)
    const url = "./server/routes/verifyUser.php";
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function()
    {
        if (this.readyState == 4)
        {
            if(this.status == 200)
            {
                if(this.responseText != null)
                {
                    console.log(this.responseText);
                    const userData = JSON.parse(this.responseText);
                    console.log(userData);

                    manageLogin(userData);
                }
                else
                    alert("Comunication error: No data received");
            }
            else
                alert( "Comunication error: " + this.statusText);
        }
    }

    request.responseType = "text";
    request.send(dataToSend);
}

function manageLogin(userData)
{
    if (userData.name !== "" && userData.lastName !== "")
    {
        //Usuario logueado

        //ACtivamos el menú de play y ocultamos el de logIn
        globals.sectionLogIn.style.display  = "none";
        globals.sectionPlay.style.display   = "block";

        //No hay mesajes de eror
        lblError.innerHTML = "";
    }

    else
    {
        if(userData.error !== "")
        {
            //Mostramos el mensaje de error
            globals.lblError.innerHTML = userData.error;
        }
    }

    //Pintamos el texto logIN
    updateUserText(userData);
}

function updateUserText(user)
{
    if (user.name !== "" && user.lastName!== "")
    {
        globals.lblSessionUser.innerHTML = "Logged in as: " + user.name + " " + user.lastName;
    }

    else
    {
        globals.lblSessionUser.innerHTML = "";
    }

}


function createNormalDeck(){
    let cardsNeeded = 50;
    const normalMode = GameMode.NORMAL_MODE;
    addPermaCards(normalMode);
    addInstaCards(normalMode);

    cardsNeeded -= globals.cards.length;

    addUnitCards(cardsNeeded,normalMode);
}


function createExpertDeck(){

    let cardsNeeded = 80;
    const expertMode = GameMode.EXPERT_MODE;
    addOneOfEach();
    // addPermaCards(expertMode);
    // addInstaCards(expertMode);
    // addClimateCards();

    cardsNeeded -= globals.cards.length;

    addUnitCards(cardsNeeded);
    

}

function addOneOfEach(){
 
    for(let i = 0; i < globals.cardInfo.length; i++){
                insertCard(i);
    }
}

function insertCard(i){

    //FUncion de imageSet que tengan la anchura y altura carta grande - La paso a loadCardImages 
    CardSize();
    //Toquens medida Especial
    // Generar un fondo en el CSS

    const imageSet = new ImageSet(CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT);


    switch(globals.cardInfo[i].kategoria){

        case "unit":
        const unitCard = new UnitCard(globals.cardInfo[i].irudia, globals.cardInfo[i].izena, CardState.DECK, false, imageSet,
                                      globals.cardInfo[i].balioa, globals.cardInfo[i].deskripzioa, globals.cardInfo[i].description, globals.cardInfo[i].efektua,
                                      globals.cardInfo[i].urritasun_karta, globals.cardInfo[i].mota);
        globals.cards.push(unitCard);
        break;

        case "instaeffect":
        const instaCard = new SuddenCard(globals.cardInfo[i].irudia,  globals.cardInfo[i].izena, CardState.DECK, false, imageSet, globals.cardInfo[i].deskripzioa, globals.cardInfo[i].description, globals.cardInfo[i].efektua);
        globals.cards.push(instaCard);
        break;

        case "permaeffect":
        const permaCard = new PermaCard(globals.cardInfo[i].irudia, globals.cardInfo[i].izena, CardState.DECK, false, imageSet, globals.cardInfo[i].deskripzioa, globals.cardInfo[i].description, globals.cardInfo[i].efektua);
        globals.cards.push(permaCard);
        break;

        case "climate":
        const climateCard = new ClimateCard(globals.cardInfo[i].irudia, globals.cardInfo[i].cardName, 
                                            CardState.DECK, false, imageSet, globals.cardInfo[i].description, globals.cardInfo[i].efektua);
        globals.cards.push(climateCard);
        break;

        case "token":
        
        const tokenCard = new Card(globals.cardInfo[i].irudia,  globals.cardInfo[i].izena, CardState.DECK, false, imageSet);
        globals.tokens.push(tokenCard);
        break;

        default:
            console.error("Incorrect card category");



    }
    
}

function CardSize(card)
{
    // xSize, ySize
    const xSize     = 0;
    const ySize     = 0;

    const cardImageSet = new ImageSet(xSize, ySize,)
}






function addClimateCards(){
    for(let i = 0; i < CardQuantity.EXPERT_CLIMATE; i++){
        let randomChoice = Math.floor(Math.random() * (4 + 1));
        let checks;

        for(let l = 0; 0 < globals.cards.length; l++){
            if(globals.cards[l].categoryId === CardCategory.CLIMATE){
                checks++;

                if(checks === randomChoice){
                    insertCard(l);
                    l = globals.cards.length;
                }    
            }
        }
    }
}

function addPermaCards(mode){

    let cardsToDraw;
    if(mode === GameMode.EXPERT_MODE)
        cardsToDraw = CardQuantity.EXPERT_PERMA;
    else
        cardsToDraw = CardQuantity.NORMAL_PERMA;

    for(let i = 0; i < cardsToDraw; i++){
        let randomChoice = Math.floor(Math.random() * (2 + 1));
        let checks;

        for(let l = 0; 0 < globals.cards.length; l++){

            console.log(globals.cards[l].categoryId);
            if(globals.cards[l].categoryId === CardCategory.PERMAEFFECT){
                checks++;
                
                if(checks === randomChoice){
                    insertCard(l);
                    l = globals.cards.length;
                }    
            }
        }
    }
}


function addInstaCards(mode){
    let cardsToDraw;
    if(mode === GameMode.EXPERT_MODE)
        cardsToDraw = CardQuantity.EXPERT_INSTA;
    else
        cardsToDraw = CardQuantity.NORMAL_INSTA;

    for(let i = 0; i < cardsToDraw; i++){
        let randomChoice = Math.floor(Math.random() * (3 + 1));
        let checks;

        for(let l = 0; 0 < globals.cards.length; l++){
            if(globals.cards[l].categoryId === CardCategory.INSTAEFFECT){
                checks++;
                
                if(checks === randomChoice){
                    insertCard(l);
                    l = globals.cards.length;
                }    
            }
        }
    }
}


function addUnitCards(cardsLeft){

    for(let i = 0; i < cardsLeft; i++){
        let chanceNumber = Math.random();
        if(chanceNumber < 0.10)
            addUltraRareCard();
        else if(chanceNumber < 0.40)
            AddRareCard();
        else
            AddCommonCard();
    }
}

function addUltraRareCard(){
    let ultraRareQuantity = 5;
    let randomChoice = Math.floor(Math.random() * (ultraRareQuantity + 1));
    let checks = 0;
    for(let i = 0; i < globals.cards.length; i++){
        if(globals.cards[i].rarity === Rarity.ULTRA_RARE){
            checks++;
            if(checks === randomChoice){
                insertCard(i);
            }
        }
    }

}

function AddRareCard(){
    let rareQuantity = 8;
    let randomChoice = Math.floor(Math.random() * (rareQuantity + 1));
    let checks = 0;
    for(let i = 0; i < globals.cards.length; i++){
        if(globals.cards[i].rarity === Rarity.RARE){
            checks++;
            if(checks === randomChoice){
                insertCard(i);
            }
        }
    }
}

function AddCommonCard(){
    let commonQuantity = 25;
    let randomChoice = Math.floor(Math.random() * (commonQuantity + 1));
    let checks = 0;
    for(let i = 0; i < globals.cards.length; i++){
        if(globals.cards[i].rarity === Rarity.COMMON){
            checks++;
            if(checks === randomChoice){
                insertCard(i);
            }
        }
    }

}

function initFakeCards ()
{
    fakeCardCreation_1;
    fakeCardCreation_2;
    fakeCardCreation_3;
    fakeCardCreation_4;
}



// ============================================================================================
//                                      ZONAS DE JUEGO
// ============================================================================================

//La funcion Slots sera la funcion que llame a todos las funciones donde estaran los slots donde se coloquen todas las cartas
function initSlots()
{
    //GENERAL
    // tableSize();             // Tamaño de Toda la Mesa de juego      - NOT NECESSARY
    climatologyZone();          // Slots de Cartas de Clima             - DONE
    buffPlayer1();              // Buffs del Player 1 (3 secciones)     - DONE
    buffPlayer2();              // Buffs del Player 2 (3 secciones)     - DONE

    //PLAYER 1
    slotDiscardP1();            // Slots de Descartes del Jugador 1     - DONE
    handPlayer1();              // Mano del Jugador 1 (12 Slots)        - DONE
    tableSection_Player1();     // Seccion de juego de todas las cartas del Player 1 (3 Secciones, 10 slots cada una)   - DONE
    deckPlayer1();              // Mazo del Jugador 1                   - 

    //PLAYER 2
    slotDiscardP2();            // Slots de Descartes del Jugador 2     - DONE
    handPlayer2();              // Mano del Jugador 2 (12 Slots)        - DONE
    tableSection_Player2();     // Seccion de juego de todas las cartas del Player 2 (3 Secciones, 10 slots cada una)   - 
    deckPlayer2();              // Mazo del jugador 2                   - 
}

// Tamaño de la mesa
function tableSize()
{
    const xPos = 200;
    const yPos = 200;
    const xSize = 300;
    const ySize = 300;
    
    const tableSize = new GameZones (xPos, yPos, xSize, ySize);
    globals.slots.push(tableSize);

}


function slotDiscardP1 ()
{
    const xPos      = Player1_map_pos.PLAYER1_DISSCARD_XPOS;
    const yPos      = Player1_map_pos.PLAYER1_DISSCARD_YPOS;
    const xSize     = 90;
    const ySize     = 100;

    const slotDiscardP1 = new GameZones(xPos, yPos, xSize, ySize);
    globals.slots.push(slotDiscardP1);
    //Se hara un push a un array globals de Slots para almacenar todos los slots y despues renderizarlos
}

function slotDiscardP2 ()
{
    const xPos      = Player2_map_pos.PLAYER2_DISSCARD_XPOS;
    const yPos      = Player2_map_pos.PLAYER2_DISSCARD_YPOS;
    const xSize     = 90;
    const ySize     = 100;

    const slotDiscardP2 = new GameZones(xPos, yPos, xSize, ySize);
    globals.slots.push(slotDiscardP2);
}

function climatologyZone ()
{
    const xPos1     = Common_map_pos.CLIMATE_BOX_1_XPOS;
    const xPos2     = Common_map_pos.CLIMATE_BOX_2_XPOS;

    const yPos      = Common_map_pos.CLIMATE_BOX_YPOS;
    const xSize     = 140;
    const ySize     = 120;

    const slotClimatology1 = new GameZones(xPos1, yPos, xSize, ySize);
    const slotClimatology2 = new GameZones(xPos2, yPos, xSize, ySize);
    globals.slots.push(slotClimatology1, slotClimatology2);
}

function handPlayer1 ()
{ 
    const yPos      = Player1_map_pos.PLAYER1_CARDS_IN_HAND_YPOS;
    const xSize     = 75;
    const ySize     = 90;

    let xPos = Player1_map_pos.PLAYER1_CARDS_IN_HAND1_XPOS;

    for (let i = 0; i < 12; i++)
    {
        const handSlots = new GameZones(xPos, yPos, xSize, ySize)
        globals.slots.push(handSlots);
        xPos += 75;
    }

}

function handPlayer2 ()
{
    const yPos      = Player2_map_pos.PLAYER2_CARDS_IN_HAND_YPOS;
    const xSize     = 75;
    const ySize     = 90;

    let xPos = Player2_map_pos.PLAYER2_CARDS_IN_HAND1_XPOS;

    for (let i = 0; i < 12; i++)
    {
        const handSlots = new GameZones(xPos, yPos, xSize, ySize)
        globals.slots.push(handSlots);
        xPos += 75;
    }
}

function buffPlayer1 ()
{
     // 3 Secciones 
     const xPos      = Player1_map_pos.PLAYER1_BUFF1_XPOS;

     const yPos1     = Player1_map_pos.PLAYER1_BUFF1_YPOS;
     const yPos2     = Player1_map_pos.PLAYER1_BUFF2_YPOS;
     const yPos3     = Player1_map_pos.PLAYER1_BUFF3_YPOS;
 
     const xSize     = 100;
     const ySize     = 90;
 
     const slot_1_BuffPlayer1 = new GameZones(xPos, yPos1, xSize, ySize);
     const slot_2_BuffPlayer1 = new GameZones(xPos, yPos2, xSize, ySize);
     const slot_3_BuffPlayer1 = new GameZones(xPos, yPos3, xSize, ySize);
 
     globals.slots.push(slot_1_BuffPlayer1, slot_2_BuffPlayer1, slot_3_BuffPlayer1);
}

function buffPlayer2 ()
{
    // 3 Secciones 
    const xPos      = Player2_map_pos.PLAYER2_BUFF1_XPOS;

    const yPos1     = Player2_map_pos.PLAYER2_BUFF1_YPOS;
    const yPos2     = Player2_map_pos.PLAYER2_BUFF2_YPOS;
    const yPos3     = Player2_map_pos.PLAYER2_BUFF3_YPOS;

    const xSize     = 100;
    const ySize     = 90;

    const slot_1_BuffPlayer2 = new GameZones(xPos, yPos1, xSize, ySize);
    const slot_2_BuffPlayer2 = new GameZones(xPos, yPos2, xSize, ySize);
    const slot_3_BuffPlayer2 = new GameZones(xPos, yPos3, xSize, ySize);

    globals.slots.push(slot_1_BuffPlayer2, slot_2_BuffPlayer2, slot_3_BuffPlayer2);
}

function tableSection_Player1()
{
    // 3 Secciones - Fisico, Distancia, Asedio
    // 8 Slots 
    
    let yPos        = Player1_map_pos.PLAYER1_TABLE_SECTION1_YPOS;
    let xPos        = Player1_map_pos.PLAYER1_TABLE_SECTION1_XPOS;
    const xSize     = 87.5;
    const ySize     = 90;
    
    for (let i = 0; i < 3; i++)
    {
        

        for (let j = 0; j < 8; j++)
        {
            const slotsTable_Player1 = new GameZones(xPos, yPos, xSize, ySize);
            globals.slots.push(slotsTable_Player1);
            xPos  += xSize;

        }
        
        yPos += 10 + ySize;
        xPos = Player1_map_pos.PLAYER1_TABLE_SECTION1_XPOS;
    }
    
}

function tableSection_Player2()
{
   // 3 Secciones - Fisico, Distancia, Asedio
    // 8 Slots 
    
    let yPos        = Player2_map_pos.PLAYER2_TABLE_SECTION1_YPOS;
    let xPos        = Player2_map_pos.PLAYER2_TABLE_SECTION1_XPOS;
    const xSize     = 87.5;
    const ySize     = 90;
    
    for (let i = 0; i < 3; i++)
    {
        

        for (let j = 0; j < 8; j++)
        {
            const slotsTable_Player2 = new GameZones(xPos, yPos, xSize, ySize);
            globals.slots.push(slotsTable_Player2);
            xPos  += xSize;

        }
        
        yPos -= 10 + ySize;
        xPos = Player1_map_pos.PLAYER1_TABLE_SECTION1_XPOS;
    }
}

function deckPlayer1()
{
    const xPos      = Player1_map_pos.PLAYER1_DECK_XPOS;
    const yPos      = Player1_map_pos.PLAYER1_DECK_YPOS;
    const xSize     = 90;
    const ySize     = 100;

    const deckSlot = new GameZones(xPos, yPos, xSize, ySize);
    globals.slots.push(deckSlot);
}

function deckPlayer2()
{
    const xPos      = Player2_map_pos.PLAYER2_DECK_XPOS;
    const yPos      = Player2_map_pos.PLAYER2_DECK_YPOS;
    const xSize     = 90;
    const ySize     = 100;

    const deckSlot = new GameZones(xPos, yPos, xSize, ySize);
    globals.slots.push(deckSlot);
}


// ==========================================
//                  GET
// ==========================================

function initCardInfo()
{

    const url = "http://localhost/mythClash/server/routes/getAllCards.php";
    const request = new XMLHttpRequest();

    request.onreadystatechange = function()
    {
        // console.log("entra");
        if (this.readyState == 4)
        {
            if(this.status == 200)
            {
                // console.log("entra");
                // console.log (this.responseText);
                if (this.responseText != null)
                {
                    
                    // console.log("Entra");
                    const resultJSON = JSON.parse(this.responseText);
                    globals.get_checks++;
                    
                    //Guardamos los datos del resultJSON
                    globals.cardInfo = resultJSON;
                    
                    //Iniciamos los datos del juego
                    // initGame(resultJSON);

                    console.log(globals.cardInfo);
                    // console.log("this.responetext" + this.responseText);

                }
                else  
                    alert("Comunication error: No data received");
            }
            else 
                alert ( "Communication error: " + this.statusText);
        }
    }

    request.open ('GET', url, true);
    request.responseType = "text";
    request.send();
}

function initCardLinks()
{

    const url = "http://localhost/mythClash/server/routes/getAllLinks.php";
    const request = new XMLHttpRequest();

    request.onreadystatechange = function()
    {
        // console.log("entra");
        if (this.readyState == 4)
        {
            if(this.status == 200)
            {
                // console.log("entra");
                // console.log (this.responseText);
                if (this.responseText != null)
                {
                    
                    // console.log("Entra");
                    const resultJSON = JSON.parse(this.responseText);
                    globals.get_checks++;
                    
                    //Guardamos los datos del resultJSON
                    globals.img_url = resultJSON;
                    
                    //Iniciamos los datos del juego
                    // initGame(resultJSON);

                    console.log(globals.img_url);
                    // console.log("this.responetext" + this.responseText);

                }
                else  
                    alert("Comunication error: No data received");
            }
            else 
                alert ( "Communication error: " + this.statusText);
        }
    }

    request.open ('GET', url, true);
    request.responseType = "text";
    request.send();
}



// ==================================================
//               CREATION OF FAKE CARDS
// ==================================================

// Inicializamos unas cartas fake para meter al array de objetos

function fakeCardCreation_1() // Zarate
{
    const frontImg      = client/images/Images_for_fake/Zarate.png;                      // ./images/Ruta de la imagen de frente
    const backImg       = client/images/Images_for_fake/Back_Image.png;                      // ./images/Ruta la imagen de atras
    const frameImg      = client/images/Images_for_fake/Card_Template.png;                      // ./images/Ruta del frame correspondiente
    const cardName      = "Zarateee";               // Nombre de la Carta
    const cardCategory  = "unit";                   // Asignamos el Estado/Categoria de la Carta 
    const state         = CardState.DECK;           // Estado de la carta 
    const value         = 7;                        // Valor de la carta
    const description   = "Zarate The villiain";    // Descripcion de la carta
    const effect        = Effect.SCORCH_INMUNE;     // Effecto que tendra la categoria 
    const rarity        = Rarity.ULTRA_RARE;        // Rareza de la carta
    const type          = Type.DISTANCE;            // Tipo de la carta
    const showBack      = false;                    // Boolean que Enseña el dorso de la carta


    // frontImg, backImg, frameImg, cardName, CardCategory, state, showBack
    const ZarateCard = new FakeCard (frontImg, backImg, frameImg, cardName, cardCategory, state, value, description, effect, rarity, type, showBack);

    for (let i = 0; i <= 5; i++)
    {
        globals.cardInfo.push(ZarateCard);
    }

    // globals.cards.push(Zarate);
}

function fakeCardCreation_2() //Climatology Card
{
    const frontImg      = client/images/Images_for_fake/bitting_frost.png;                      // ./images/Ruta de la imagen de frente
    const backImg       = client/images/Images_for_fake/Back_Image.png;                      // ./images/Ruta la imagen de atras
    const frameImg      = client/images/Images_for_fake/Card_Template.png;                      // ./images/Ruta del frame correspondiente
    const cardName      = "Bitting Frost";          // Nombre de la Carta
    const cardCategory  = "climate";                // Asignamos el Estado/Categoria de la Carta 
    const state         = CardState.DECK;           // Estado de la carta 
    const value         = 0;                        // Valor de la carta

    const description   = "Sets the strength of all Close Combat cards to 1 for both players.";    // Descripcion de la carta
    
    const effect        = null;                     // Effecto que tendra la categoria 
    const rarity        = null;                     // Rareza de la carta
    const type          = null;                     // Tipo de la carta
    const showBack      = false;                    // Boolean que Enseña el dorso de la carta


    // frontImg, backImg, frameImg, cardName, CardCategory, state, showBack
    const Climatology = new FakeCard (frontImg, backImg, frameImg, cardName, cardCategory, state, value, description, effect, rarity, type, showBack);
    
    for (let i = 0; i <= 5; i++)
    {
        globals.cardInfo.push(Climatology);
    }

    // globals.cards.push(Climatology);
}

function fakeCardCreation_3() //PermaEffect Card
{
    const frontImg      = client/images/Images_for_fake/Commanders_Horn.png;                 // ./images/Ruta de la imagen de frente
    const backImg       = client/images/Images_for_fake/Back_Image.png;                      // ./images/Ruta la imagen de atras
    const frameImg      = client/images/Images_for_fake/Card_Template.png;                   // ./images/Ruta del frame correspondiente
    const cardName      = "Commander's Horn";       // Nombre de la Carta
    const cardCategory  = "Effect";                 // Asignamos el Estado/Categoria de la Carta 
    const state         = CardState.DECK;           // Estado de la carta 
    const value         = 0;                        // Valor de la carta

    const description   = "Doubles the strength of all unit cards in that row. Limited to 1 per row.";    // Descripcion de la carta
    
    const effect        = Effect.COMMANDERS_HORN;   // Effecto que tendra
    const rarity        = null;                     // Rareza de la carta
    const type          = null;                     // Tipo de la carta
    const showBack      = false;                    // Boolean que Enseña el dorso de la carta


    // frontImg, backImg, frameImg, cardName, CardCategory, state, showBack
    const PermaEffect = new FakeCard (frontImg, backImg, frameImg, cardName, cardCategory, state, value, description, effect, rarity, type, showBack);

    for (let i = 0; i <= 5; i++)
    {
        globals.cardInfo.push(PermaEffect);
    }

    // globals.cards.push(PermaEffect);
}

function fakeCardCreation_4() //Token card
{
    const frontImg      = client/images/Images_for_fake/Coin.png;                      // ./images/Ruta de la imagen de frente
    const backImg       = client/images/Images_for_fake/Back_Image.png;                      // ./images/Ruta la imagen de atras
    const frameImg      = client/images/Images_for_fake/Card_Template.png;                      // ./images/Ruta del frame correspondiente
    const cardName      = "Coin";          // Nombre de la Carta
    const cardCategory  = "Token";                // Asignamos el Estado/Categoria de la Carta 
    const state         = CardState.DECK;           // Estado de la carta 
    const value         = 0;                        // Valor de la carta

    const description   = "Sets the strength of all Close Combat cards to 1 for both players.";    // Descripcion de la carta
    
    const effect        = null;                     // Effecto que tendra
    const rarity        = null;                     // Rareza de la carta
    const type          = null;                     // Tipo de la carta
    const showBack      = false;                    // Boolean que Enseña el dorso de la carta


    // frontImg, backImg, frameImg, cardName, CardCategory, state, showBack
    const Token = new FakeCard (frontImg, backImg, frameImg, cardName, cardCategory, state, value, description, effect, rarity, type, showBack);

    for (let i = 0; i <= 5; i++)
    {
        globals.tokens.push(Token);
    }
    // globals.cards.push(Token);
}


// ==================================================
//               CREATION OF FAKE CARDS
// ==================================================




function initCommonSlots(){
    initClimateSlot();
    initBuffSlots();
}


export {
    createExpertDeck,
    createNormalDeck,
    initHTMLelements,
    initVars,
    initEvents,
    initFakeCards,
    loadAssets,
    initCardInfo,
    initCardLinks,
    initSlots,
}
