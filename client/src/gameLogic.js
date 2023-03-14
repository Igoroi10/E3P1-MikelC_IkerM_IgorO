import globals from "./globals";

function playGame()
{
    //... ANTERIR

    //Sacamos en pantalla las coordenadas del ratón 
    globals.txtPruebas.innerHTML = "X: " + globals.mouse.x + " Y: " + globals.mouse.y;
}