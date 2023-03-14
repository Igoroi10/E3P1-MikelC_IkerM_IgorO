import {btnStartDown, btnStartOver, btnStartOut, canvasMousedownHandler, canvasMousemoveHandler, canvasMouseupHandler} from "./events.js";
import globals from "./globals.js";
import {CardCategory, CardQuantity, CardState, GameMode, Rarity} from "./constants.js";
import render from "./gameRender.js";
import {Card, UnitCard, SuddenCard, PermaCard, ClimateCard} from "./Card.js";



function init()
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
    //... ANTERIOR!!

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

    //Add the event listeners
    globals.canvas.addEventListener("mouseup",   canvasMouseupHandler, false);
    globals.canvas.addEventListener("mousedown", canvasMousedownHandler, false);
    globals.canvas.addEventListener("mousemove",canvasMousemoveHandler, false);
}

function createNormalDeck(){
    let cardsNeeded = 50;
    let normalMode = GameMode.NORMAL_MODE;
    addPermaCards(normalMode);
    addInstaCards(normalMode);

    cardsNeeded -= globals.cards.length;

    addUnitCards(cardsNeeded,normalMode);
}


function createExpertDeck(){

    let cardsNeeded = 80;
    let expertMode = GameMode.EXPERT_MODE;
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

    switch(globals.fakeCardInfo[i]){

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

export {
    createExpertDeck,
    createNormalDeck
}