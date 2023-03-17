import globals from "./globals.js";
import { initGame } from "./initialize.js";

import { Key } from "./constants.js";


//Creacion de Evento para el raton

export function btnStartDown (event)
{
    // console.log("OK");

    // //Ocultamos el boton de START
    // globals.buttonStart.style.visibility = "hidden";

    // document.getElementById('divCanvas').style.display = "block";

    // console.log("OK");

    //Ocultamos el boton de Start
    globals.buttonStart.style.visibility = "Hidden";

    document.getElementById('divCanvas').style.display = "block";

    //Ruta o absoluta o relativa al fichero que hace la peticion (html)
    const url = "http://localhost/PHP/BookcardExample/server/routes/getAllHighscore.php";
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
                    
                    
                    //Iniciamos los datos del juego
                    initGame(resultJSON);

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

//Boton de Start a Over
export function btnStartOver (event)
{
    //cambiamos el texto 
    // console.log("entraa");
    document.getElementById("btnStart").innerHTML = "OVER";

}

export function btnStartOut (event)
{
    //Recuperamos tento original 
    document.getElementById("btnStart").innerHTML = "START";
}

export function canvasMousedownHandler(event)
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
    }

}

export function keyupHandler(event)
{
    globals.asciiCode = -1;

    switch (event.keyCode)
    {
        case Key.ENTER:
            // console.log("Sale enter")
            globals.action.enter    = true;
            break;
    }

    // console.log(globals.mouse.x);
    console.log(globals.mouse.x)

}