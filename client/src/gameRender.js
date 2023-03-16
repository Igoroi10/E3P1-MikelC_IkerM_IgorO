

import { CardCategory, CardDisplaySize, CardSizes } from "./constants.js";
import globals from "./globals.js";





export default function render()
{
    globals.ctx.clearRect(0,0,globals.canvas.width, globals.canvas.height);
    drawGame();

}

function drawGame(){
    renderMap();
    renderCards();
    // renderBigCard(); //A CORREGIR
}

function renderMap ()
{
    
}


function renderCards(){

    for(let i = 0; i < globals.cards.length; i++){
        renderCard(globals.cards[i]);    
    }

}

function renderCard(card){

     //DIBUJO DEL REVERSO
    if(card.showBack === true){
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       
        )

    }


    //DIBUJO DEL ANVERSO DE LA UNIDAD 
    else if (card.category === CardCategory.UNIT){

        //Imagen de fondo
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT             //Fin de anchura.       

        )
        //Frame
        globals.ctx.drawImage(
            globals.tileSets.card_front_img[cards[i].frontImg],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT             //Fin de anchura.       

        )
        //Icono superior izquierda
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].type],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

        )
        //Icono centro izquierda
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].value],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

        )

        //Icono abajo izquierda
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

        )

    }
    //DIBUJO DEL ANVERSO DEL RESTO DE CARTAS EXCEPTO TOKEN
    else if(card.category !== CardCategory.TOKEN){
        //Imagen de fondo
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT             //Fin de anchura.       

        )
        //Frame
        globals.ctx.drawImage(
            globals.tileSets.card_front_img[cards[i].frontImg],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT             //Fin de anchura.       

        )
        //Icono superior izquierda
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].type],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

        )
        //Icono abajo izquierda
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].value],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

        )
    }
    //DIBUJO ANVERSO DEL  TOKEN
    else{
        //Imagen de fondo
        globals.ctx.drawImage(
            globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

        )
        //Frame
        globals.ctx.drawImage(
            globals.tileSets.card_front_img[cards[i].frontImg],                     //archivo de la imagen
            card.xPos, card.yPos,                                   //Posición inicial x e y 
            card.imageSet.xSize, card.imageSet.ySize, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

        )
    }
}

function renderBigCard(){

let i = 0;
        if(globals.cards[i].category !== CardCategory.TOKEN){

            globals.ctx.drawImage(
                globals.assets.frontImg,                          //archivo de la imagen
                card.xPos, card.yPos,                            //Posición inicial x e y 
                card.imageSet.xSize, sprite.imageSet.ySize, 
                card.xPos, card.yPos,                            //fin de x e y
                CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT    //Final de anchura.       
    
            )

            globals.ctx.drawImage(
                globals.assets.frameImg,                          //archivo de la imagen
                card.xPos, card.yPos,                            //Posición inicial x e y 
                card.imageSet.xSize, sprite.imageSet.ySize, 
                card.xPos, card.yPos,                            //fin de x e y
                CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT    //Final de anchura.       
    
            )

        }

        else{
            globals.ctx.drawImage(
                globals.assets.frontImg,                          //archivo de la imagen
                card.xPos, card.yPos,                            //Posición inicial x e y 
                card.imageSet.xSize, sprite.imageSet.ySize, 
                card.xPos, card.yPos,                            //fin de x e y
                CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT    //Final de anchura.       
    
            )

            globals.ctx.drawImage(
                globals.assets.frameImg,                          //archivo de la imagen
                card.xPos, card.yPos,                            //Posición inicial x e y 
                card.imageSet.xSize, sprite.imageSet.ySize, 
                card.xPos, card.yPos,                            //fin de x e y
                CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT    //Final de anchura.       
    
            )

        }
    

}





export{
    render,
}