import {btnStartDown, btnStartOver, btnStartOut} from "./events.js";
import globals from "./globals.js";
import {CardState} from "./constants.js";
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

    addOneOfEach();

}

function addOneOfEach(){

    for(let i = 0; i < globals.fakeCardInfo.lenght -2; i++){
                insertCard(i);
    }
}

function insertCard(i){

    switch(globals.fakeCardInfo[i]){

        case "unit":
        const unitCard = new UnitCard(globals.fakeCardInfo[i].)
        globals.cards.push(unitCard);
        break;

        case "instaeffect":
        const instaCard = new SuddenCard()
        globals.cards.push(instaCard);
        break;

        case "permaeffect":
        const permaCard = new PermaCard()
        globals.cards.push(permaCard);
        break;

        case "climate":
        const climateCard = new ClimateCard();
        globals.cards.push(climateCard);
        break;

        case "token":
        const tokenCard = new Card();
        globals.cards.push(tokenCard);
        break;


    }
    
}