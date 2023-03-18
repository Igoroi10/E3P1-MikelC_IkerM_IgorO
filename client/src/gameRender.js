

import { CardCategory, CardDisplaySize, CardSizes, CARD_SIZE } from "./constants.js";
import globals from "./globals.js";
// import { gameZones } from "./GameZones.js";





// export default function render()
// {
//     globals.ctx.clearRect(0,0,globals.canvas.width, globals.canvas.height);
    drawGame();

// }

function drawGame(){
    // renderMap();
    // renderCards();

    drawSlots();
    // renderBigCard(); //A CORREGIR
}

function renderMap ()
{
    
}


// function renderCards(){

//     for(let i = 0; i < globals.cards.length; i++){
//         renderCard(globals.cards[i]);    
//     }

// }

// function renderCard(card){

//      //DIBUJO DEL REVERSO
//     if(card.showBack === true){
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       
//         )

//     }


//     //DIBUJO DEL ANVERSO DE LA UNIDAD 
//     else if (card.category === CardCategory.UNIT){

//         //Imagen de fondo
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT             //Fin de anchura.       

//         )
//         //Frame
//         globals.ctx.drawImage(
//             globals.tileSets.card_front_img[cards[i].frontImg],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT             //Fin de anchura.       

//         )
//         //Icono superior izquierda
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].type],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

//         )
//         //Icono centro izquierda
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].value],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

//         )

//         //Icono abajo izquierda
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

//         )

//     }
//     //DIBUJO DEL ANVERSO DEL RESTO DE CARTAS EXCEPTO TOKEN
//     else if(card.category !== CardCategory.TOKEN){
//         //Imagen de fondo
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT             //Fin de anchura.       

//         )
//         //Frame
//         globals.ctx.drawImage(
//             globals.tileSets.card_front_img[cards[i].frontImg],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             CardSizes.SMALL_WIDTH, CardSizes.SMALL_HEIGHT             //Fin de anchura.       

//         )
//         //Icono superior izquierda
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].type],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

//         )
//         //Icono abajo izquierda
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].value],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             card.imageSet.xSize, card.imageSet.ySize             //Fin de anchura.       

//         )
//     }
//     //DIBUJO ANVERSO DEL  TOKEN
//     else{
//         //Imagen de fondo
//         globals.ctx.drawImage(
//             globals.tileSets.card_reverse[cards[i].reverse],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

//         )
//         //Frame
//         globals.ctx.drawImage(
//             globals.tileSets.card_front_img[cards[i].frontImg],                     //archivo de la imagen
//             card.xPos, card.yPos,                                   //Posición inicial x e y 
//             card.imageSet.xSize, card.imageSet.ySize, 
//             card.xPos, card.yPos,                                   //fin de x e y
//             CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

//         )
//     }
// }

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




// PREUBA 

export default function render()
{
    // globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
    // renderCards();
    // console.log("bololo");
    
    globals.ctx.clearRect(0,0,globals.canvas.width, globals.canvas.height);
    drawGame();

}

function renderCards()
{
    // console.log("bololo");
    // console.log(globals.cards);
    for (let i = 0; i < globals.cards.length; ++i)
    {
        const card = globals.cards[i];
        renderCard(card);
        // console.log("entra");
    }
}

function renderCard(card)
{
    // console.log("entra");
    globals.ctx.fillStyle = 'green';
    globals.ctx.fillRect(card.xPos, card.yPos, CARD_SIZE, CARD_SIZE);
    globals.ctx.font = '12px arial';
    globals.ctx.fillStyle = 'white';
    globals.ctx.fillText(card.title,        card.xPos + 10, card.yPos + 30); 
    globals.ctx.fillText(card.isbn,         card.xPos + 10, card.yPos + 50);
    globals.ctx.fillText(card.author,       card.xPos + 10, card.yPos + 70);
    globals.ctx.fillText(card.category,     card.xPos + 10, card.yPos + 90);
    globals.ctx.fillText(card.year,         card.xPos + 10, card.yPos + 110);
}


function renderSlots(slot)
{
    const xPos = Math.floor(slot.xPos);
    const yPos = Math.floor(slot.yPos);

    globals.ctx.drawImage(
        slot.xSize, slot.ySize,         // The Source height and width
        xPos, yPos,                     // The Source x and y position
        slot.xSize, slot.ySize          // The destinaton height and width
    );

}

//Funcion que dibuja el tamaño del slot
function drawSlots()
{
    for (let i = 0; i < globals.slots.length; i++)
    {
        const slot = globals.slots[i]
        
        //TEST: Dibujado de rectangulo alrededor del Slot
        drawSlotRectangle(slot);

        //Funcion para renderizar los slots (NO SE SI LA UTILIZAREMOS)
        // renderSlots(slot);
    }
}

function drawSlotRectangle(slot) //Funcion que crea un rectangulo alrededor del Sprite  (Se usa generalmente para posicionar los sprites de la hoja de Spritesheet).
{

    //Datos del slot
    const x1 = Math.floor(slot.xPos);
    const y1 = Math.floor(slot.yPos);
    const w1 = slot.xSize;
    const h1 = slot.ySize;

    globals.ctx.fillStyle = "green"; 
    globals.ctx.fillRect(x1,y1,w1,h1);

}





export{
    render,
}