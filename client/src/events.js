import globals from "./globals.js";
import { initGame } from "./initialize.js";


//Creacion de Evento para el raton

export function btnStartDown (event)
{
    console.log("OK");

    //Ocultamos el boton de START
    globals.buttonStart.style.visibility = "hidden";

    document.getElementById('divCanvas').style.display = "block";
}

export function btnStartOver (event)
{
    //cambiamos el texto 

    console.log("entraa");
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
}

export function keydownHandler(event)
{
    globals.asciiCode = event.keyCode;

    switch (event.keyCode)
    {
        case Key.ENTER:
            console.log("Entra enter");
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
            console.log("Sale enter");
            globals.action.enter    = true;
            break;
    }
}