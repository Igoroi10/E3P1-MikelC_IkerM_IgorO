import globals from "./globals.js";
import { initGame } from "./initialize.js";


//Creacion de Evento para el raton

export function btnStartDown (event)
{
    console.log("OK");
}

export function btnStartOver (event)
{
    //cambiamos el texto 
    document.getElementById("btnStart").innerHTML = "OVER";

}

export function btnStartOut (event)
{
    //Recuperamos tento original 
    document.getElementById("btnStart").innerHTML = "START";
}