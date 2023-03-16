import {btnStartDown, btnStartOver, btnStartOut, canvasMousedownHandler, canvasMousemoveHandler, canvasMouseupHandler} from "./events.js";
import globals from "./globals.js";
import {  State, Languages, CardState, CardCategory, Effect, Type, GameMode, Rarity, FPS} from "./constants.js";
import {  State, Languages, CardState, CardCategory, Rarity, Effect, Type, CardQuantity, GameMode, FPS} from "./constants.js";
import render from "./gameRender.js";
import {Card, UnitCard, SuddenCard, PermaCard, ClimateCard} from "./Card.js";
import FakeCard from "./FakeCard.js";

import { keydownHandler, keyupHandler } from "./events.js";

import { GameZones } from "./GameZones.js";

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

export function initGame()
{
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
    // ... ANTERIOR!!

    //Add the keyboard event listeners
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    //Add the event listeners
    globals.canvas.addEventListener("mouseup",   canvasMouseupHandler, false);
    globals.canvas.addEventListener("mousedown", canvasMousedownHandler, false);
    globals.canvas.addEventListener("mousemove", canvasMousemoveHandler, false);
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
    const Zarate = new FakeCard (frontImg, backImg, frameImg, cardName, cardCategory, state, value, description, effect, rarity, type, showBack);

    for (let i = 0; i <= 5; i++)
    {
        globals.fakeCardInfo.push(Zarate);
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


export {
    createExpertDeck,
    createNormalDeck,
    initHTMLelements,
    initVars,
    initEvents,
    initFakeCards,
}
