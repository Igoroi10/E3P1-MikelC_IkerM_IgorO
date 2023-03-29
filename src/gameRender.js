

import { CardCategory, CardDisplaySize, CardSizes, CARD_SIZE } from "./constants.js";
import { gameLoop } from "./game.js";
import globals from "./globals.js";
// import { GameZones } from "./GameZones.js";





export default function render()
{
    globals.ctx.clearRect(0,0,globals.canvas.width, globals.canvas.height);
    drawGame();


}

function drawGame()
{
    // renderMap();
    // renderCards();

    if (globals.action.d)
    {
        // console.log("Entra accion D");
        drawSlots();
        
    }

    if(globals.action.e){
        globals.bigCard = 0;
        renderBigCard();
    }

    if (globals.action.c)
    {
        renderCards();
    }

    // renderBigCard(); //A CORREGIR
    drawNames();
}

function renderMap ()
{
    
}


function renderCards(){
    let xPos = 5;
    let yPos = 5;
    let cardsDrawed = 0;
    for(let l = 0; l < 5; l++){

        for(let i = 0; i < 16; i++){
            globals.cards[cardsDrawed].xPos = xPos;
            globals.cards[cardsDrawed].yPos = yPos;
            renderCard(globals.cards[cardsDrawed]);
            cardsDrawed++;
            xPos += 95;   
        }

        xPos = 5;
        yPos += 120; 
    }


}

function renderCard(card){

     //DIBUJO DEL REVERSO
     if(card.showBack === true){
        globals.ctx.drawImage(
            globals.assets.card_reverse[0],                     //archivo de la imagen
            0, 0,                                               //Posición inicial x e y 
            CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       
        )

    }


    // //DIBUJO DEL ANVERSO DE LA UNIDAD 
    else if (card.categoryId === CardCategory.UNIT){
      

        //Imagen de fondo
        globals.ctx.drawImage(
            globals.assets.front_img[card.frontImg],                     //archivo de la imagen
            0, 0,                                   //Posición inicial x e y 
            CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

        )
        //Frame
        globals.ctx.drawImage(
            globals.assets.card_frame[0],                           //archivo de la imagen
            0, 0,                                                       //Posición inicial x e y 
            280, 290, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

        )
        //Icono superior izquierda
        globals.ctx.drawImage(
            globals.assets.card_type[card.type-1],                     //archivo de la imagen
            0, 0,                                   //Posición inicial x e y 
            CardSizes.BIG_HEIGHT, CardSizes.BIG_HEIGHT, 
            card.xPos, card.yPos,                             //fin de x e y
            19, 20                                                 //Fin de anchura.       

        )
        //Icono centro izquierda
        globals.ctx.drawImage(
            globals.assets.card_value[card.value],                     //archivo de la imagen
            0, 0,                                                    //Posición inicial x e y 
            65, 63, 
            card.xPos, card.yPos + 60,                                   //fin de x e y
            30, 30             //Fin de anchura.       

        )

        // //Icono abajo izquierda
        // globals.ctx.drawImage(
        //     globals.assets.card_effect[card.effect],                     //archivo de la imagen
        //     0, 0,                                                        //Posición inicial x e y 
        //     65, 54, 
        //     card.xPos, card.yPos + 51,                                   //fin de x e y
        //     19, 16                                                      //Fin de anchura.       

        // )

    }
    //DIBUJO DEL ANVERSO DEL RESTO DE CARTAS EXCEPTO TOKEN
    else if(card.category !== CardCategory.TOKEN){
        //Imagen de fondo
        globals.ctx.drawImage(
            globals.assets.front_img[card.frontImg],                     //archivo de la imagen
            0, 0,                                      //Posición inicial x e y 
            CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

        )
        //Frame
        globals.ctx.drawImage(
            globals.assets.card_frame[0],                     //archivo de la imagen
            0, 0,                                   //Posición inicial x e y 
            CardSizes.BIG_CUT_FRAME_WIDTH, CardSizes.BIG_CUT_FRAME_HEIGHT, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

        )
        // Icono superior izquierda
        globals.ctx.drawImage(
            globals.assets.card_category[card.categoryId - 1],                     //archivo de la imagen
            0, 0,                                      //Posición inicial x e y 
            CardSizes.BIG_HEIGHT, CardSizes.BIG_HEIGHT, 
            card.xPos, card.yPos,                             //fin de x e y
            19, 20                                                 //Fin de anchura.       

        )

        // //Icono abajo izquierda
        // globals.ctx.drawImage(
        //     globals.assets.card_effect[card.effect],                     //archivo de la imagen
        //     0, 0,                                      //Posición inicial x e y 
        //     65, 54, 
        //     card.xPos, card.yPos + 51,                                   //fin de x e y
        //     19, 16                                                      //Fin de anchura.       

        // )

    }
    //DIBUJO ANVERSO DEL  TOKEN
    else{
        //Imagen de fondo
        globals.ctx.drawImage(
            globals.assets.card_reverse[cards[i].reverse],                     //archivo de la imagen
            0, 0,                                                    //Posición inicial x e y 
            CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

        )
        //Frame
        globals.ctx.drawImage(
            globals.assets.card_frame[2],                     //archivo de la imagen
            0, 0,                                   //Posición inicial x e y 
            CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
            card.xPos, card.yPos,                                   //fin de x e y
            CardSizes.TOKEN_WIDHT, CardSizes.TOKEN_HEIGHT             //Fin de anchura.       

        )
    }
}

function renderBigCard(){

    if(globals.bigCard <= 0){

        const card = globals.cards[globals.bigCard];

        if(card.showBack !== true){

            globals.ctx.drawImage(
                globals.assets.card_reverse[0],                     //archivo de la imagen
                card.xPos, card.yPos,                                   //Posición inicial x e y 
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
                card.xPos, card.yPos,                                   //fin de x e y
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT             //Fin de anchura.       
            )
        }

        else{

            //Imagen de fondo
            globals.ctx.drawImage(
                globals.assets.front_img[globals.cards[globals.bigCard].frontImg],                     //archivo de la imagen
                0, 0,                                   //Posición inicial x e y 
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
                card.xPos, card.yPos,                                   //fin de x e y
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT             //Fin de anchura.       

            )
            //Frame
            globals.ctx.drawImage(
                globals.assets.card_frame[1],                           //archivo de la imagen
                0, 0,                                                       //Posición inicial x e y 
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
                card.xPos, card.yPos,                                   //fin de x e y
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT             //Fin de anchura.       

            )

            if(globals.cards[globals.bigCard].category === CardCategory.UNIT){
                //Icono superior izquierda
                globals.ctx.drawImage(
                    globals.assets.card_type[globals.cards[globals.bigCard].type],                     //archivo de la imagen
                    0, 0,                                   //Posición inicial x e y 
                    CardSizes.BIG_HEIGHT, CardSizes.BIG_HEIGHT, 
                    card.xPos, card.yPos,                             //fin de x e y
                    65, 63                                                 //Fin de anchura.       

                )
                //Icono centro izquierda
                globals.ctx.drawImage(
                    globals.assets.card_value[card.value],                      //archivo de la imagen
                    0, 0,                                                       //Posición inicial x e y 
                    65, 63, 
                    card.xPos, card.yPos + 60,                                  //fin de x e y
                    65, 63                                                      //Fin de anchura.       

                )
            }

            else{
                globals.ctx.drawImage(
                    globals.assets.card_category[globals.cards[globals.bigCard].card_category],                     //archivo de la imagen
                    0, 0,                                                                                           //Posición inicial x e y 
                    CardSizes.BIG_HEIGHT, CardSizes.BIG_HEIGHT, 
                    card.xPos, card.yPos,                                                                           //fin de x e y
                    65, 63                                                                                          //Fin de anchura.       

                )

            }

            //Icono abajo izquierda
            globals.ctx.drawImage(
                globals.assets.card_effect[card.effect],                     //archivo de la imagen
                0, 0,                                                        //Posición inicial x e y 
                65, 54, 
                card.xPos, card.yPos + 51,                                   //fin de x e y
                65, 54                                                      //Fin de anchura.       

            )

            globals.ctx.font        = "8 px magicmedieval-prv1";
            globals.ctx.fillStyle   = "black";
            globals.ctx.fillText(card.cardName, card.xPos + 5, card.yPos + 300);


            globals.ctx.font        = "8 px magicmedieval-prv1";
            globals.ctx.fillStyle   = "black";
            globals.ctx.fillText(card.description_eu, card.xPos + 5, card.yPos + 300);
            
        }
    }

}






// function renderCards()
// {
//     // console.log("bololo");
//     // console.log(globals.cardInfo.length);
//     for (let i = 0; i < globals.cardInfo.length; ++i)
//     {
//         //Las cartas que recibe el array CardInfo no cuentan con tamaño, por lo tanto en el render se utilizara un tamaño global
//         const card = globals.cardInfo[i];
//         renderCard(card);

//         // console.log("entra");
//     }
// }

// function renderCard(card)
// {
//     let xPos = 10;
//     let yPos = 10;

//     // console.log(Math.floor(globals.cardInfo));

//     for (let i = 1; i < globals.cardInfo.length +1; i++)
//     {
//         globals.ctx.fillStyle = 'green';
//         globals.ctx.fillRect(xPos, yPos, CARD_SIZE, CARD_SIZE);
//         globals.ctx.font = '12px arial';
//         globals.ctx.fillStyle = 'white';
//         globals.ctx.fillText(card.title,        card.xPos + 10, card.yPos + 30); 
//         globals.ctx.fillText(card.isbn,         card.xPos + 10, card.yPos + 50);
//         globals.ctx.fillText(card.author,       card.xPos + 10, card.yPos + 70);
//         globals.ctx.fillText(card.category,     card.xPos + 10, card.yPos + 90);
//         globals.ctx.fillText(card.year,         card.xPos + 10, card.yPos + 110);

//         xPos += 160;

//         if (i%8 === 0)
//         {   
//             xPos = 10;
//             yPos += 200;
//         }
//     }
   
// }



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

    //Datos del Slot
    const x1 = Math.floor(slot.xPos) + Math.floor(0);
    const y1 = Math.floor(slot.yPos) + Math.floor(0);
    const w1 = slot.xSize;
    const h1 = slot.ySize;

    // const x1 = Math.floor(slot.xPos);
    // const y1 = Math.floor(slot.yPos);
    // const w1 = slot.xSize;
    // const h1 = slot.ySize;

    globals.ctx.strokeStyle = "red";
    globals.ctx.strokeRect(x1, y1, w1, h1);

}


function drawNames()
{
    // console.log(globals.hostPlayerInfo);
    globals.ctx.font = '18px Magicmedieval-pRV1'; 
    globals.ctx.fillStyle = 'white';    
    globals.ctx.fillText(globals.selectedEnemy, 225, 220); 
    globals.ctx.fillText(globals.hostPlayerInfo.izena_abizena, 225, 660);
    // globals.ctx.fillText()
    
    // globals.hostPlayerInfo.izen_abizena
}



export{
    render,
    renderBigCard,
}