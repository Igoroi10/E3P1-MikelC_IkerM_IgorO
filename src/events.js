import globals from "./globals.js";
import { initGame } from "./initialize.js";

import { Key, State, Turn } from "./constants.js";

import { gameLoop } from "./game.js";
import { checkStates, localStorageUpdate, logOut } from "./gameLogic.js";
import { renderBigCard } from "./gameRender.js";


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
    globals.gameState = State.PLAYING;
    // document.getElementById('sectionPlay').style.display = "none";

}

export function btnStartOut ()
{
    //Recuperamos tento original 
    document.getElementById("btnStart").innerHTML = "START";
    document.getElementById('sectionLogIn').style.display = "none";
    // document.getElementById('sectionPlay').style.display = "none";
}

export function btnLogOut ()
{
    console.log("Entra en logOut");
    logOut();
    checkStates();
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
    const usersList = document.querySelector('select');     // Guardamos en una Variable la lista que queremos seleccionar
    const users = globals.all_users;                        // Le damos los valores (En nuestro caso sera un Fake Array para hacer Pruebas)

    //Creacion de la Lista - Automatizada 
    for(let i = 0; i < users.length; i++)
    {
        if(users[i]['emaila'] !== globals.hostPlayerInfo.emaila){

            const li = document.createElement('option');            // Creamos Una linea
            li.textContent = users[i]['izen_abizena'];                      // Asignamos cada valor del array a la linea correspondiente del ciclo
            usersList.appendChild(li);                      // Introducimos dicho valor en formato HTML con appendChild para visualizarlo 
        }

    }
}

function selectEnemy()
{
    let select = document.getElementById('selectUserList');
    select.addEventListener('change', function(){
    let selectedOption = this.options[select.selectedIndex];
    globals.selectedEnemy = selectedOption.text;
    console.log(globals.selectedEnemy);
  });
  
}

export function btnStartPlayer()
{
    console.log("entra en btnPlayer");
    // globals.buttonStart.style.visibility = "Hidden";
    globals.buttonAdmin.style.visibility = "Hidden";
    globals.buttonPlayer.style.visibility = "Hidden";

    document.getElementById('playerMenuScreen').style.display = "block";
    document.getElementById('sectionLogIn').style.display = "none";


}

//Boton Que Pasa de turno
export function btnStartTurn()
{
    // console.log("Boton Turno Pulsado");

    //Ahora Una vez pulsado el boton de turno deberemos de hacer un check para saber quien lo ha puslado y si le corresponde poder jugar en ese turno o no

    checkIfTurnPass();

    checkIfRoundPass();

}

//Boton para terminar la ronda
export function btnEndRound()
{
    // console.log("Boton Round Pulsado");
    
    checkRoundState();
    
    checkIfRoundPass();
}


function checkIfTurnPass ()
{
    //CHECK DEL PLAYER 1
    if (globals.turnState === Turn.PLAYER1)
    {
        // console.log("Turno del Jugador 1");
        globals.turnState = Turn.PLAYER2;
    }

    //CHECK DEL PLAYER 2
    else if (globals.turnState === Turn.PLAYER2)
    {
        // console.log("Turno del Jugador 2");
        globals.turnState = Turn.PLAYER1;
    }

    //Le asignamos el estado de NO_TURN para que no pueda serguir jugando
    else
    {
        globals.turnState = Turn.NO_TURN;
    }

}

function checkIfRoundPass()
{
    //Si uno o ninguno de los jugadores a Pasado la Ronda 
   if(!globals.checkBothPlayerRound)
   {
    //Deberemos de ver quien si alguno de los dos a pasado la Ronda o no 

    //Si el Player a Pasado la Ronda
    if (globals.checkRoundPlayer1)
    {
        console.log("Player 1 no puede jugar - PASO DE RONDA");
        globals.turnState = Turn.PLAYER2;
    }

    //Si el Segundo Player a pasado la ronda
    if (globals.checkRoundPlayer2)
    {
        console.log("Player 2 no puede jugar - PASO DE RONDA");
        globals.turnState = Turn.PLAYER1;
    }

     //Si ninguno a pasado la Ronda
     else if (globals.checkRoundPlayer1 && !globals.checkRoundPlayer2)
     {
        console.log("Solo puede jugar el jugador 1");
     }

      else if (!globals.checkRoundPlayer1 && globals.checkRoundPlayer2)
     {
        console.log("Solo puede jugar el jugador 2");
     }

     else
     {
        console.log("Ambos Jugadores Pueden jugar - NINGUNO PASO DE RONDA");
     }

   }

   //Los dos jugadores han pasado la ronda y deberemos de reiniciar el global de Ronda
   else
   {
    console.log("LA RONDA A TERMINADO");
    globals.turnState = Turn.NO_TURN;       // MAS ADELANTE CAMBIARLO - SOLO SE PUEDE JUGAR UNA RONDA
    globals.checkBothPlayerRound = false;

   }
    
}

function checkRoundState()
{
    if (globals.turnState === Turn.PLAYER1)
    {
        console.log("EL JUGADOR 1 TERMINO LA RONDA");
        globals.checkRoundPlayer1 = true;
    }

    if (globals.turnState != Turn.PLAYER1 && globals.turnState === Turn.PLAYER2)
    {
        console.log("EL JUGADOR 2 TERMINO LA RONDA");
        globals.checkRoundPlayer2 = true;
    }

    if (globals.checkRoundPlayer1 && globals.checkRoundPlayer2)
    {
        globals.checkBothPlayerRound = true;
    }

    else
        console.log("ERROR");

}

function canvasDobleClickHandler()
{
    //Meter aqui la accion de la carta grande
    console.log("entra en la funcion canvasDobleClickHandler");
    globals.action.doubleClick = true;
    renderBigCard();
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

export {
    createList,
    selectEnemy,
    canvasDobleClickHandler,
}