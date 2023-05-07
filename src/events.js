import globals from "./globals.js";
import { createNormalDeck, initGame, postForgotPasswordData, postRegisterData,  } from "./initialize.js";
import { Key, State, Turn, GameMode } from "./constants.js";
import { gameLoop } from "./game.js";
import { renderBigCard } from "./gameRender.js";
import { checkStates, localStorageUpdate, logOut, createExpertDeck, distributeHandCards, startingDeal,  decoyEffectResult , multiMensaje} from "./gameLogic.js";



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
    // globals.buttonAdmin.style.visibility = "Hidden";
    // globals.buttonPlayer.style.visibility = "Hidden";

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
   



    // REPARTIR A LA MANO - Un jugador
    // distributeHandCards();

    
    // CON ESE MAZO LLAMAR A RENDER Y QUE RENDERIZE LAS CARTAS - Esta en el update del drawGame

    
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
    // console.log("Entra en logOut");
    document.getElementById('lblError').innerHTML = ""; 
    logOut();
    // checkStates();
}

function btnSubmitForget()
{
    // console.log("entra en boton submit");
    postForgotPasswordData();

}

function btnSubmitRegister()
{
    // console.log("entra en btnSubmitRegister");
    postRegisterData();
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

function btnEnglishMode()
{
    document.getElementById('lblError').innerHTML = ""; 
    document.getElementById('lblErrorForgot').innerHTML = "";
    document.getElementById('lblErrorRegister').innerHTML = "";
    
    globals.lenguageSelected = 0;
  // console.log("entra en la funcion btnEnglishMode");
    multiMensaje();
}

function btnEuskeraMode()
{
    document.getElementById('lblError').innerHTML = ""; 
    document.getElementById('lblErrorForgot').innerHTML = "";
    document.getElementById('lblErrorRegister').innerHTML = "";

    globals.lenguageSelected = 1;
  // console.log("entra en la funcion btnEnglishMode");
    multiMensaje();
}

function btnForgotPassword()
{
  // console.log("entra en la funcion btnForgotPassword")
    globals.gameState = State.FORGOT_PASSWORD;

    //Limpieza de forgot
    document.getElementById('lblErrorForgot').innerHTML = "";
    globals.inputEmail_Forgot.value             = "";
    globals.inputPassword_Forgot.value          = "";
    globals.inputConfirmPassword_Forgot.value   = "";

    checkStates();
}

function btnRegister()
{
    // console.log("entra en la funcion btnRegister")
    globals.gameState = State.REGISTER;

    //Limpieza de registro
    document.getElementById('lblErrorRegister').innerHTML = "";
    globals.inputNameSurname_Register.value     = "";
    globals.inputEmail_Register.value           = "";
    globals.inputPassword_Register.value        = "";
    globals.inputConfirmPassword_Register.value = "";

    checkStates();
}

function createList()
{

    globals.selectedEnemy = globals.all_users[0].izen_abizena;
    const usersList = document.querySelector('select');     // Guardamos en una Variable la lista que queremos seleccionar
    const users = globals.all_users;                        
    const hostEmail = localStorage.getItem('emaila').toLowerCase();
    const hostName = localStorage.getItem('izen_abizena');
    console.log(usersList);

    if(hostName === globals.all_users[0].izen_abizena)
        globals.selectedEnemy = globals.all_users[1].izen_abizena;

        // console.log(users[1]['emaila']);
      // console.log(hostEmail);
        //Creacion de la Lista - Automatizada 
        for(let i = 0; i < users.length; i++)
        {
          // console.log(users[i]['emaila'])
            if(users[i]['emaila'] !== hostEmail && hostEmail !== null){
                // console.log("entra en el if del emaila logueado = hostEmail");
                const li = document.createElement('option');            // Creamos Una linea
                li.textContent = users[i]['izen_abizena'];              // Asignamos cada valor del array a la linea correspondiente del ciclo
                usersList.appendChild(li);                              // Introducimos dicho valor en formato HTML con appendChild para visualizarlo 
            }

        }
  // console.log(hostName);
    document.getElementById('playerName').innerHTML= '' + hostName;
    document.getElementById('adminName').innerHTML= '' + hostName;

}

function createUserEditList()
{
    for(let i = 0; i < globals.all_users.length; i++)
    {
        const li = document.createElement("ul");
        const buttonEdit = document.createElement("button");
        const buttonDelete = document.createElement("button");
        buttonEdit.setAttribute("id", "buttonEdit" + i);
        buttonDelete.setAttribute("id", "buttonDelete" + i);
        li.textContent = globals.all_users[i]['izen_abizena'] + " ";
        
        buttonEdit.innerHTML = "edit";
        buttonDelete.innerHTML = "delete";

        buttonEdit.style.cssText = 'background-color: green; padding: 5px;';
        buttonDelete.style.cssText = 'background-color: red; padding: 5px;';

        document.querySelector('#editList').appendChild(li);
        li.appendChild(buttonEdit);
        li.appendChild(buttonDelete);

    }
}

function selectEnemy()
{
    let select = document.getElementById('selectUserList');
    select.addEventListener('change', function(){
    let selectedOption = this.options[select.selectedIndex];
    globals.selectedEnemy = selectedOption.text;
  // console.log(globals.selectedEnemy);
  });
  
}

export function btnStartPlayer()
{
  // console.log("entra en btnPlayer");
    // globals.buttonStart.style.visibility = "Hidden";
    globals.buttonAdmin.style.visibility = "Hidden";
    globals.buttonPlayer.style.visibility = "Hidden";

    document.getElementById('playerMenuScreen').style.display = "block";
    document.getElementById('sectionLogIn').style.display = "none";


}

function btnBack()
{
  // console.log("entra en btnBack");
    globals.gameState = State.LOG_IN;
    document.getElementById('lblError').innerHTML = ""; 
    document.getElementById('lblErrorForgot').innerHTML = "";
    document.getElementById('lblErrorRegister').innerHTML = "";
    globals.inputEmail.value             = "";
    globals.inputPassword.value          = "";

    checkStates();
}

//Boton Que Pasa de turno
export function btnStartTurn()
{
    // console.log("Boton Turno Pulsado");

    //Ahora Una vez pulsado el boton de turno deberemos de hacer un check para saber quien lo ha puslado y si le corresponde poder jugar en ese turno o no
    globals.actionsCounter ++;

    if(!globals.checkRoundPlayer1 && !globals.checkRoundPlayer2){
        globals.showTurnChangeScreen = true;
    }

}

//Boton para terminar la ronda
export function btnEndRound()
{
    // console.log("Boton Round Pulsado");
    document.getElementById('btnConfirmEndRound').style.display     = "block";
    document.getElementById('btnDenyEndRound').style.display        = "block";
    

}

export function btnNormalMode()
{
    globals.buttonStart.style.visibility = "Hidden";
    // globals.buttonAdmin.style.visibility = "Hidden";
    // globals.buttonPlayer.style.visibility = "Hidden";

    document.getElementById('divCanvas').style.display = "block";
    document.getElementById('sectionLogIn').style.display = "none";
    document.getElementById('sectionPlay').style.display = "none";
    document.getElementById('playerMenuScreen').style.display = "none";

    document.getElementById("btnStart").innerHTML = "OVER";
    document.getElementById('sectionLogIn').style.display = "none";

    globals.gameState = State.GAME_START;
    globals.gameMode = GameMode.NORMAL_MODE;
    requestAnimationFrame(gameLoop);
    
    checkStates();
}

function btnClose()
{
    console.log("entra en close")
    // document.getElementById('btnLogout').style.display = "none";
    document.getElementById('divCanvas').style.display = "block";
    document.getElementById('controlScreenEN').style.display = "none";
    document.getElementById('controlScreenEUS').style.display = "none";

    checkStates();
}

function btnControls ()
{
    document.getElementById('idiomaButton').style.display = "none";
    if(globals.lenguageSelected === 0)
        document.getElementById('controlScreenEN').style.display = "block";

    else
        document.getElementById('controlScreenEUS').style.display = "block";

    document.getElementById('sectionLogIn').style.display = "none";
    document.getElementById('sectionPlay').style.display = "none";
    document.getElementById('playerMenuScreen').style.display = "none";
    document.getElementById('divCanvas').style.display = "none";
}


function checkIfTurnPass ()
{
    //CHECK DEL PLAYER 1
    actions();
    // console.log(globals.turnState)

    if (globals.turnState === Turn.PLAYER0)
    {
        // console.log("Turno del Jugador 1");
        globals.turnState = Turn.PLAYER1;
    }

    //CHECK DEL PLAYER 2
    if (globals.turnState === Turn.PLAYER1)
    {
        // console.log("Turno del Jugador 2");
        globals.turnState = Turn.PLAYER0;
    }

    //Le asignamos el estado de NO_TURN para que no pueda serguir jugando
    else if(globals.checkBothPlayerRound)
    {
        globals.turnState = Turn.NO_TURN;
    }

}

function btnConfirmRound()
{
    globals.checkIfRoundConfirm = true;

    document.getElementById('btnConfirmEndRound').style.display     = "none";
    document.getElementById('btnDenyEndRound').style.display        = "none";

    checkRoundState();
    
    checkIfRoundPass();

}

function btnDenyRound ()
{
    globals.checkIfRoundConfirm = false;

    document.getElementById('btnConfirmEndRound').style.display     = "none";
    document.getElementById('btnDenyEndRound').style.display        = "none";

    checkRoundState();
    
    checkIfRoundPass();
}

function checkIfRoundPass()
{
    //Si uno o ninguno de los jugadores a Pasado la Ronda 
   if(!globals.checkBothPlayerRound)
   {
        //Deberemos de ver quien si alguno de los dos a pasado la Ronda o no 

        //Si el Player a Pasado la Ronda - HOST
        if (globals.checkRoundPlayer2)
        {
            // console.log("Player 0 no puede jugar - PASO DE RONDA");
            globals.turnState = Turn.PLAYER1;
        }

        //Si el Segundo Player a pasado la ronda
        else if (globals.checkRoundPlayer1)
        {
            // console.log("Player 0 no puede jugar - PASO DE RONDA");
            globals.turnState = Turn.PLAYER0;
        }

        //Si ninguno a pasado la Ronda
        else if (globals.checkRoundPlayer2 && !globals.checkRoundPlayer1)
        {
            // console.log("Solo puede jugar el jugador ");
        }

        else if (!globals.checkRoundPlayer2 && globals.checkRoundPlayer1)
        {
            // console.log("Solo puede jugar el jugador 2");
        }

        else
        {
            // console.log("Ambos Jugadores Pueden jugar - NINGUNO PASO DE RONDA");
        }

   }


   //Los dos jugadores han pasado la ronda y deberemos de reiniciar el global de Ronda
   else
   {
        // console.log("LA RONDA A TERMINADO");
        globals.turnState = Turn.NO_TURN;       // MAS ADELANTE CAMBIARLO - SOLO SE PUEDE JUGAR UNA RONDA
        // globals.checkBothPlayerRound = false;
        // console.log(globals.turnState);
        globals.checkIfRoundConfirm = false;

   }
    
}

function checkRoundState()
{
    console.log("entra en la funcion checkRoundState")
    if (globals.turnState === Turn.PLAYER0 && globals.checkIfRoundConfirm)
    {
      // console.log("EL JUGADOR 1 TERMINO LA RONDA");
        globals.checkRoundPlayer2 = true;
        globals.actionsCounter = 0;
        globals.checkIfRoundConfirm = false;
    }

    if (globals.turnState != Turn.PLAYER0 && globals.turnState === Turn.PLAYER1 && globals.checkIfRoundConfirm)
    {
      // console.log("EL JUGADOR 2 TERMINO LA RONDA");
        globals.checkRoundPlayer1 = true;
        globals.actionsCounter = 0;
        globals.checkIfRoundConfirm = false;
    }

    if (globals.checkRoundPlayer1 && globals.checkRoundPlayer2)
    {
      // console.log("entra en el if de los dos true()()()()()()()");
        globals.checkBothPlayerRound = true;
      // console.log(globals.checkBothPlayerRound);
        globals.checkIfRoundConfirm = false;
    }

    else
      console.log("ERROR");

}

function actions()
{
    // console.log("entra en actions");
    // console.log(globals.turnState);

    // globals.Action Sera el estado que tendra un update constante para saber de quien es el turno en todo momento
    // Cuando sea el turno correspondiente de alguno de los dos jugadores en algun turno en concreto se sumara a una globla actionPlayer ++ - Esta lo que hara sera
    // Permitir que solo se puedan hacer dos actionPlayer es decir: si ActionPlayer >= 2 se resetea ese action Player y se pasa al siguiente turno:  

    if (globals.turnState === Turn.PLAYER0)
    {
        globals.actionsCounter.player0 ++;
        // console.log("Acccion: " + globals.actionsCounter.player0 + " Player 0");
        globals.actionsCounter.player1 = 0;
    }

    if(globals.turnState === Turn.PLAYER1)
    {
        globals.actionsCounter.player1 ++;
        // console.log("Acccion: " + globals.actionsCounter.player1 + " Player 1");
        globals.actionsCounter.player0 = 0;
    }

    else if (globals.turnState === Turn.NO_TURN)
    {
        // console.log("NO TURN");
        globals.actionsCounter.player0 = 0;
        globals.actionsCounter.player1 = 0;
    }
}


function  canvasRightMousedownHandler()
{
    //Meter aqui la accion de la carta grande
    // console.log("entra en la funcion canvasDoubleClickHandler");
    // globals.action.doubleClick = true;

    // console.log("Entra en canvasRightMouseupHandler");
    globals.action.rightMousePressed = true; 
    

    //HAY QUE ECHARLE UN OJO
    if (!globals.mouseHasCollidedWithTheCard)
    {
        renderBigCard();
    }
   
}

function canvasRightMouseupHandler()
{
    globals.action.rightMousePressed = false;
}

export function canvasMousedownHandler()
{
    // console.log("entra en funcion click");
    globals.action.mousePressed = true;
    
}



export function canvasMouseupHandler(event)
{
    // console.log("sale funcion click");
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

        case Key.ENGLISH_KEY:
          // console.log("Entra en la tecla N");
            globals.action.n        = true;
            // multiMensaje();
            break;

        case Key.EUSK_KEY:
          // console.log("Entra en la tecla U");
            globals.action.u        = true;
            // multiMensaje();
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
            
        case Key.ENGLISH_KEY:
          // console.log("Entra en la tecla N");
            globals.action.n        = false;
            break;

        case Key.EUSK_KEY:
          // console.log("Entra en la tecla U");
            globals.action.u        = false;
            break;
    }

}

function decoyEvent()
{
    if(globals.actionsCounter === 1)
    {
        if(globals.selectedCardId_Click >= 0)
        {
            if(globals.decoy === true)
            {
                // console.log("Entra en todos los ifs");
                const card = globals.cards[globals.selectedCardId_Click]
                decoyEffectResult(card);
            }
        }
        
    }
}




export {
    createList,
    selectEnemy,
    canvasRightMousedownHandler,
    canvasRightMouseupHandler,
    checkIfRoundPass,
    decoyEvent,
    btnForgotPassword,
    btnRegister,
    btnEnglishMode,
    btnEuskeraMode,
    btnBack,
    btnSubmitForget,
    btnSubmitRegister,
    btnClose,
    btnControls,
    btnConfirmRound,
    btnDenyRound,
    createUserEditList,
}