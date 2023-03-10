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