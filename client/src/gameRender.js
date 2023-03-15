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
    renderBigCard()

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
    if(card.showBack === true){
        globals.ctx.drawImage(
            globals.assets.backImg,                          //archivo de la imagen
            card.xPos, card.yPos,                            //Posición inicial x e y 
            card.imageSet.xSize, sprite.imageSet.ySize, 
            card.xPos, card.yPos,                            //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT    //Final de anchura.       

        )

    }

    else{
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
}


function renderBigCard(){

}


export{
    render,
}