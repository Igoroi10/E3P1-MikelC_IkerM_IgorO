import globals from "./globals.js";
import { initGame } from "./initialize.js";

import { Key, State } from "./constants.js";

import { gameLoop } from "./game.js";
import { checkStates } from "./gameLogic.js";


//Creacion de Evento para el raton

export function btnStartDown ()
{
    // console.log("OK");

    // //Ocultamos el boton de START
    // globals.buttonStart.style.visibility = "hidden";

    // document.getElementById('divCanvas').style.display = "block";

    // console.log("OK");

    //Ocultamos el boton de Start
    globals.buttonStart.style.visibility = "Hidden";
    globals.buttonAdmin.style.visibility = "Hidden";
    globals.buttonPlayer.style.visibility = "Hidden";

    document.getElementById('divCanvas').style.display = "block";
    document.getElementById('sectionLogIn').style.display = "none";
    document.getElementById('sectionPlay').style.display = "none";
    document.getElementById('playerMenuScreen').style.display = "none";
    // checkStates();

    requestAnimationFrame(gameLoop);
}

//Boton de Start a Over
export function btnStartOver ()
{
    //cambiamos el texto 
    // console.log("entraa");
    document.getElementById("btnStart").innerHTML = "OVER";
    document.getElementById('sectionLogIn').style.display = "none";
    // document.getElementById('sectionPlay').style.display = "none";

}

export function btnStartOut ()
{
    //Recuperamos tento original 
    document.getElementById("btnStart").innerHTML = "START";
    document.getElementById('sectionLogIn').style.display = "none";
    // document.getElementById('sectionPlay').style.display = "none";
}

export function btnStartAdmin()
{
    // console.log("entra en adminbtn");
    globals.gameState = State.ADMIN_MENU
    globals.buttonStart.style.visibility = "Hidden";
    globals.buttonAdmin.style.visibility = "Hidden";
    globals.buttonPlayer.style.visibility = "Hidden";
    document.getElementById('adminMenuScreen').style.display = "block";
    document.getElementById('sectionLogIn').style.display = "none";
    

    // checkStates();
    

}

function createList()
{
    const usersList = document.querySelector('ul');     // Guardamos en una Variable la lista que queremos seleccionar
    const users = globals.fakeUsersArray;               // Le damos los valores (En nuestro caso sera un Fake Array para hacer Pruebas)

    //Creacion de la Lista - Automatizada 
    for(let i = 0; i < users.length; i++)
    {
        const li = document.createElement('li');        // Creamos Una linea
        li.textContent = users[i];                      // Asignamos cada valor del array a la linea correspondiente del ciclo
        usersList.appendChild(li);                      // Introducimos dicho valor en formato HTML con appendChild para visualizarlo 
    }
}

export function btnStartPlayer()
{
    console.log("entra en btnPlayer");
    // globals.buttonStart.style.visibility = "Hidden";
    globals.buttonAdmin.style.visibility = "Hidden";
    globals.buttonPlayer.style.visibility = "Hidden";

    document.getElementById('playerMenuScreen').style.display = "block";
    document.getElementById('sectionLogIn').style.display = "none";

    createList();
}

export function btnStartTurn()
{
    console.log("Boton Turno Pulsado");
}

export function btnEndRound()
{
    console.log("Boton Round Pulsado");
}

export function canvasMousedownHandler()
{
    globals.action.mousePressed = true;
}

export function canvasMouseupHandler(event)
{
    globals.action.mousePressed = false;
}

export function canvasMousemoveHandler(event)
{
    //Find the mouse's X and Y positions on the canvas
    
    globals.mouse.x = event.pageX - globals.canvas.offsetLeft;
    globals.mouse.y = event.pageY - globals.canvas.offsetTop;
    
    // console.log("Mouse xPos: " + globals.mouse.x);
    // console.log("Mouse yPos: " + globals.mouse.y);
}

export function keydownHandler(event)
{
    globals.asciiCode = event.keyCode;
    // console.log("Ascii code: " + globals.asciiCode);

    switch (event.keyCode)
    {
        case Key.ENTER:
            // console.log("Entra enter");
            globals.action.enter    = true;
            break;

        //TECLA "D"
        case Key.DECK:
            // console.log("Entra en D");
            globals.action.d        = true;
            break;

        //TECLA "C"
        case Key.CARD:
            // console.log("Entra en C");
            globals.action.c        = true;
            break;

        //TECLA "E"
        case Key.EXAMINE:
            // console.log("Entra en C");
            globals.action.e        = true;
            break;

        
    }

}

export function keyupHandler(event)
{
    globals.asciiCode = -1;

    switch (event.keyCode)
    {
        case Key.ENTER:
            // console.log("Sale enter");
            globals.action.enter    = false;
            break;

        //TECLA "D"
        case Key.DECK:
            // console.log("Sale en D");
            globals.action.d        = false;
            break;

        case Key.CARD:
            // console.log("Sale en C");
            globals.action.c        = false;
            break;

        case Key.EXAMINE:
            globals.action.e        = false;
            break;        
    }

}