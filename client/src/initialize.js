import {btnStartDown, btnStartOver, btnStartOut} from "./events.js";
import globals from "./globals.js";
import {CardCategory, CardQuantity, CardState} from "./constants.js";
import render from "./gameRender.js";
import {Card, UnitCard, SuddenCard, PermaCard, ClimateCard} from "./Card.js";

window.onload = init;

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


function createExpertDeck(){

    let cardsNeeded = 80;
    addOneOfEach();
    addPermaCards();
    addInstaCards();
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

function addPermaCards(){
    for(let i = 0; i < CardQuantity.EXPERT_PERMA; i++){
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


function addInstaCards(){
    for(let i = 0; i < CardQuantity.EXPERT_INSTA; i++){
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



export {
    createExpertDeck
}