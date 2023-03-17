import {btnStartDown, btnStartOver, btnStartOut, canvasMousedownHandler, canvasMousemoveHandler, canvasMouseupHandler} from "./events.js";
import globals from "./globals.js";
import {  State, Languages, CardState, CardCategory, Rarity, Effect, Type, CardQuantity, GameMode, FPS, Card_img_quantity} from "./constants.js";
import render from "./gameRender.js";
import {Card, UnitCard, SuddenCard, PermaCard, ClimateCard} from "./Card.js";
import FakeCard from "./FakeCard.js";

import { GameZones } from "./GameZones.js";
import { Assets } from "./Assets.js";
import { keydownHandler, keyupHandler } from "./events.js";
import ImageSet from "./ImageSet.js";


window.onload = init;

function init()
{
    globals.buttonStart = document.getElementById('btnStart');
    globals.buttonAdd = document.getElementById('btnAdd');

    //Get a reference to the canvas
    globals.canvas = document.getElementById('gameScreen');
    
    // document.getElementById('divCanvas').style.display = "none";

    //Context
    globals.ctx = globals.canvas.getContext('2d');

    //Inicializamos listeners
    globals.buttonStart.addEventListener("mousedown",   btnStartDown,   false);
    globals.buttonStart.addEventListener("mouseover",   btnStartOver,   false);
    globals.buttonStart.addEventListener("mouseout",    btnStartOut,    false);

    globals.buttonAdd.addEventListener("mousedown", btnAddDown, false);

}

function initHTMLelements()
{
    //Falta crear la global
    globals.buttonStart     = document.getElementById('btnStart');

    //Get A reference to the canvas 
    globals.canvas = document.getElementById('gameScreen');

    document.getElementById('divCanvas').style.display = "none";

    //Context
    globals.ctx = globals.canvas.getContext('2d');

    //Inicializamos listeners
    globals.buttonStart.addEventListener("mousedown", btnStartDown, false);
    globals.buttonStart.addEventListener("mouseover", btnStartOver, false);
    globals.buttonStart.addEventListener("moseout", btnStartOut, false);
}

export function initGame(data)
{
    //Creamos las cartas
    createCards(data);

    //Dibuja las cartas
    render();
}

function createCards(data)
{
    let card;

    //Reseteamos las cartas
    globals.cards = [];

    for (let i = 0; i < data.length; ++i)
    {
        card = new Card(
            0,
            0,
            data[i].isbn,
            data[i].title,
            data[i].year,
            data[i].author,
            data[i].category
        )

        globals.cards.push(card);
    }
    //Posicionamos la cartas en la pantalla
    setCardPosition();

}

function setCardPosition()
{
    //Posición incial
     let xPos = 20;
     let yPos = 10;

     for (let i = 0; i < globals.cards.length; ++i)
     {
        globals.cards[i].xInit = xPos;
        globals.cards[i].yInit = yPos;

        globals.cards[i].xPos = xPos;
        globals.cards[i].yPos = yPos;

        xPos += CARD_SIZE + 20;

        if (i % 6 === 5)
        {
            yPos += 200;
            xPos =  10;

        }

     }

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
    // ... ANTERIOR!!

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
    for (let i = 0; i < globals.img_url; i++)
    {
        const img = globals.img_url[i]

        if (i < Card_img_quantity.UNIT_CARD )
        {
            globals.assets.front_img.push(img);
        }
        else if (i < Card_img_quantity.EFFECT_CARDS)
        {
            globals.assets.effect.push(img);
        }
        else if (i < Card_img_quantity.VALUE_CARDS)
        {
            globals.assets.card_value.push(img);
        }
        else if (i < Card_img_quantity.CATEGORY_CARDS)
        {
            globals.assets.card_category.push(img)
        }
        else if (i < Card_img_quantity.TYPE_CARDS)
        {
            globals.assets.card_type.push(img);
        }
        else if ( i < Card_img_quantity.FRAME_CARDS)
        {
            globals.assets.card_frame.push(img);
        }
        else
        {
            globals.assets.card_reverse.push(img);
        }
    }

}

function fake_loadASsets ()
{
    //Variable que guardara informacion de la Clase Image
    // let tileSet;

    tileSet = new Image();
    tileSet.addEventListener("load", loadHandler, false);
    tileSet.src = "./images/bricks.png"; //Ojo que la ruta es relativa al HTML, no al JS
    globals.assets.card_category.push(tileSet);
    globals.assetsToLoad.push(tileSet);

    


    //Reverso de La carta
    const card_Reverse      = "./images/Images_for_fake/card_Reverse.png";
    globals.images_routesLinks.push(card_Reverse);
    globals.assetsToLoad.push(card_Reverse);
    globals.assets.card_reverse.push(0);

    //Frame de la carta
    const card_frame        = "./client/images/Images_for_fake/card_frame.png" 
    const card_frame_small  = "./client/images/Images_for_fake/card_frame_small.png"  
    globals.images_routesLinks.push(card_frame, card_frame_small);
    globals.assets.card_frame.push(0, 1);
    globals.assetsToLoad.push(card_frame, card_frame_small);
    
    //Type - Zelaia
    const firts_field       =  "./client/images/Images_for_fake/Type/first_field.png";
    const second_field      =  "./client/images/Images_for_fake/Type/second_field.png";
    const third_field       =  "./client/images/Images_for_fake/Type/third.png";
    globals.images_routesLinks.push(firts_field, second_field, third_field);
    globals.assets.card_type.push(0, 1, 2);
    globals.assetsToLoad.push(firts_field, second_field, third_field );

    //Category - Clima, Permanente o Inmediato 
    const climatology       = "client/images/Images_for_fake/Category/Clima.png";
    const permanent         = "client/images/Images_for_fake/Category/Permanente.png";
    const inmediate         = "client/images/Images_for_fake/Category/Inmediato.png";
    globals.images_routesLinks.push(climatology, permanent, inmediate);
    globals.assets.card_category.push(0, 1, 2);
    globals.assetsToLoad.push(card_Reverse);

    //Values
    const value0        = "./client/images/Images_for_fake/Values/Valor_0.png";
    const value1        = "./client/images/Images_for_fake/Values/Valor_1.png";
    const value2        = "./client/images/Images_for_fake/Values/Valor_2.png";
    const value3        = "./client/images/Images_for_fake/Values/Valor_3.png";
    const value4        = "./client/images/Images_for_fake/Values/Valor_4.png";
    const value5        = "./client/images/Images_for_fake/Values/Valor_5.png";
    const value6        = "./client/images/Images_for_fake/Values/Valor_6.png";
    const value7        = "./client/images/Images_for_fake/Values/Valor_7.png";
    const value8        = "./client/images/Images_for_fake/Values/Valor_8.png";
    const value9        = "./client/images/Images_for_fake/Values/Valor_9.png";
    const value10        = "./client/images/Images_for_fake/Values/Valor_10.png";
    globals.images_routesLinks.push(value0, value1, value2, value3, value4, value5, value6, value7, value8, value9, value10);
    globals.assets.card_value.push(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
    globals.assetsToLoad.push(card_Reverse);

    //Effects
    const bitting_Frost         = "./client/images/Images_for_fake/Effects/Bitting_Frost.png";
    const Clear_Weather         = "./client/images/Images_for_fake/Effects/Clear_Weather.png";
    const Commanders_horn       = "./client/images/Images_for_fake/Effects/Commanders_horn.png";
    const Decoy                 = "./client/images/Images_for_fake/Effects/Decoy.png";
    const Impenetrable_fog      = "./client/images/Images_for_fake/Effects/Impenetrable_fog.png";
    const Medic                 = "./client/images/Images_for_fake/Effects/Medic.png";
    const Morale_boost          = "./client/images/Images_for_fake/Effects/Morale_boost.png";
    const Muster                = "./client/images/Images_for_fake/Effects/Muster.png";
    const Scorch                = "./client/images/Images_for_fake/Effects/Scorch.png";
    const Spy                   = "./client/images/Images_for_fake/Effects/Spy.png";
    const Tight_bond            = "./client/images/Images_for_fake/Effects/Tight_bond.png";
    const Torrential_Rain       = "./client/images/Images_for_fake/Effects/Torrential_Rain.png";
    globals.images_routesLinks.push(bitting_Frost, Clear_Weather, Commanders_horn, Decoy, Impenetrable_fog, Medic, Morale_boost, Muster, Scorch, Spy, Tight_bond, Torrential_Rain);
    globals.assetsToLoad.push(card_Reverse);

    //Imagenes de Fondo
    const bitting_frost_img     = "./client/images/Images_for_fake/Cards_images/bitting_frost.png";
    const commanders_horn_img   = "./client/images/Images_for_fake/Cards_images/Commanders_Horn.png";
    const zarate_img            = "./client/images/Images_for_fake/Cards_images/zarate.png";
    const coin                  = "./client/images/Images_for_fake/Cards_images/coin.png";
    globals.images_routesLinks.push(bitting_frost_img, commanders_horn_img, zarate_img, coin);
    globals.assetsToLoad.push(card_Reverse);

    //Carga de Todas las imagenes
}

function loadHandler()
{
    console.log("colooooocolooo");
    
    globals.assetsLoaded++; 
    console.log ("Assets loaded: " + globals.assetsLoaded);
    console.log ("Assets to load: " + globals.assetsToLoad.length);

    
    //Una vez se han cargado todos los activos pasamos
    if(globals.assetsLoaded === globals.assetsToLoad.length)
    {
        //remove the load event listener
        for (let i = 0; i < globals.assets.length; i++)
        {
            globals.assets[i].removeEventListener("load", loadHandler, false);
        }

        console.log("Assets finished loading");

        //Start the game
        globals.gameState = State.LOADING;
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
    addPermaCards(expertMode);
    addInstaCards(expertMode);
    addClimateCards();

    cardsNeeded -= globals.cards.length;

    addUnitCards(cardsNeeded)
    

}

function addOneOfEach(){
 
    for(let i = 0; i < globals.fakeCardInfo.length; i++){
                insertCard(i);
    }
}

function insertCard(i){

    //FUncion de imageSet que tengan la anchura y altura carta grande - La paso a loadCardImages 
    CardSize();
    //Toquens medida Especial
    // Generar un fondo en el CSS


    switch(globals.fakeCardInfo[i].category){

        case "unit":
        const unitCard = new UnitCard(globals.fakeCardInfo[i].frontImg, globals.fakeCardInfo[i].backImg, globals.fakeCardInfo[i].frameImg, globals.fakeCardInfo[i].cardName, 
                                      CardState.DECK, true, globals.fakeCardInfo[i].value, globals.fakeCardInfo[i].description, globals.fakeCardInfo[i].effect, globals.fakeCardInfo[i].rarity,
                                      globals.fakeCardInfo[i].type);
        globals.cards.push(unitCard);
        break;

        case "instaeffect":
        const instaCard = new SuddenCard(globals.fakeCardInfo[i].frontImg, globals.fakeCardInfo[i].backImg, globals.fakeCardInfo[i].frameImg, globals.fakeCardInfo[i].cardName, 
                                         CardState.DECK, true, globals.fakeCardInfo[i].description, globals.fakeCardInfo[i].effect);
        globals.cards.push(instaCard);
        break;

        case "permaeffect":
        const permaCard = new PermaCard(globals.fakeCardInfo[i].frontImg, globals.fakeCardInfo[i].backImg, globals.fakeCardInfo[i].frameImg, globals.fakeCardInfo[i].cardName, 
                                        CardState.DECK, true, globals.fakeCardInfo[i].description, globals.fakeCardInfo[i].effect);
        globals.cards.push(permaCard);
        break;

        case "climate":
        const climateCard = new ClimateCard(globals.fakeCardInfo[i].frontImg, globals.fakeCardInfo[i].backImg, globals.fakeCardInfo[i].frameImg, globals.fakeCardInfo[i].cardName, 
                                            CardState.DECK, true, globals.fakeCardInfo[i].description, globals.fakeCardInfo[i].effect);
        globals.cards.push(climateCard);
        break;

        case "token":
        
        const tokenCard = new Card(globals.fakeCardInfo[i].frontImg, globals.fakeCardInfo[i].backImg, globals.fakeCardInfo[i].frameImg, globals.fakeCardInfo[i].cardName, 
                                   CardState.DECK, false);
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
        globals.fakeCardInfo.push(ZarateCard);
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
        globals.fakeCardInfo.push(Climatology);
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
        globals.fakeCardInfo.push(PermaEffect);
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

function addClimateCards(){
    for(let i = 0; i < CardQuantity.EXPERT_CLIMATE; i++){
        randomChoice = Math.floor(Math.random() * (4 + 1));
        let checks;

        for(let l = 0; 0 < globals.cards.length; l++){
            if(globals.cards[l].category === CardCategory.CLIMATE){
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
        randomChoice = Math.floor(Math.random() * (2 + 1));
        let checks;

        for(let l = 0; 0 < globals.cards.length; l++){
            if(globals.cards[l].category === CardCategory.PERMAEFFECT){
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
        randomChoice = Math.floor(Math.random() * (3 + 1));
        let checks;

        for(let l = 0; 0 < globals.cards.length; l++){
            if(globals.cards[l].category === CardCategory.INSTAEFFECT){
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
        chanceNumber = Math.random();
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
    for(i = 0; i < globals.cards.length; i++){
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
    for(i = 0; i < globals.cards.length; i++){
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
    for(i = 0; i < globals.cards.length; i++){
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

// Tamaño de la mesa
function tableSize()
{
    const xPos = 0;
    const yPos = 0;
    const xSize = 0;
    const ySize = 0;
    
    const tableSize = new GameZones (xPos, yPos, xSize, ySize);

}

// ==========================================
//                  GEt
// ==========================================

function initCardInfo()
{
    console.log("Txocolo");
    const url = "http://localhost/JavaScript/E3P1/server/routes/getAllCards.php";
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
    console.log("Txocolo");
    const url = "http://localhost/JavaScript/E3P1/server/routes/getAllLinks.php";
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


function initTableSlots(){
    initPlayerSlots();
    initCommonSlots();
}

function initPlayerSlots(){
    initDecks();
    initHands();
    initFields();
    initDiscards();
}

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
    initCardLinks
}
