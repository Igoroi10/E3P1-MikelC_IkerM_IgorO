

import { CardCategory, CardDisplaySize, CardSizes, CARD_SIZE , Turn} from "./constants.js";
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

    if (globals.action.d)
    {
        // console.log("Entra accion D");
        drawSlots();
        
    }
    drawNames();
    if (globals.action.c)
    {
        renderCards();
    }


    renderBigCard();
    drawMessages();
    gameOverScreen();
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

        //Icono abajo izquierda
        globals.ctx.drawImage(
            globals.assets.card_effect[card.effect],                     //archivo de la imagen
            0, 0,                                                        //Posición inicial x e y 
            65, 54, 
            card.xPos, card.yPos + 51,                                   //fin de x e y
            19, 16                                                      //Fin de anchura.       

        )

    }
    //DIBUJO DEL ANVERSO DEL RESTO DE CARTAS EXCEPTO TOKEN
    else if(card.categoryId !== CardCategory.TOKEN){
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
    let initialX = 652;
    let initialY = 238

    if(globals.selectedCardId >= 0){

        const card = globals.cards[globals.selectedCardId];

        if(card.showBack){

            globals.ctx.drawImage(
                globals.assets.card_reverse[0],                     //archivo de la imagen
                0, card.yPos,                                   //Posición inicial x e y 
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
                initialX, initialY,                                   //fin de x e y
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT             //Fin de anchura.       
            )
        }

        else{

            //Imagen de fondo
            globals.ctx.drawImage(
                globals.assets.front_img[card.frontImg],                     //archivo de la imagen
                0, 0,                                                                       //Posición inicial x e y 
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
                initialX, initialY,                                                      //fin de x e y
                CardSizes.BIG_CUT_FRAME_WIDTH, CardSizes.BIG_CUT_FRAME_HEIGHT             //Fin de anchura.       

            )
            //Frame
            globals.ctx.drawImage(
                globals.assets.card_frame[1],                           //archivo de la imagen
                0, 0,                                                       //Posición inicial x e y 
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT, 
                initialX, initialY,                                   //fin de x e y
                CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT             //Fin de anchura.       

            )

            if(globals.cards[globals.selectedCardId].categoryId === CardCategory.UNIT){
                //Icono superior izquierda
                globals.ctx.drawImage(
                    globals.assets.card_type[card.type-1],                     //archivo de la imagen
                    0, 0,                                   //Posición inicial x e y 
                    CardSizes.BIG_HEIGHT, CardSizes.BIG_HEIGHT, 
                    initialX, initialY,                             //fin de x e y
                    65, 63                                                 //Fin de anchura.       

                )
                //Icono centro izquierda
                globals.ctx.drawImage(
                    globals.assets.card_value[card.value],                      //archivo de la imagen
                    0, 0,                                                       //Posición inicial x e y 
                    65, 63, 
                    initialX, initialY + 154,                                  //fin de x e y
                    65, 63                                                      //Fin de anchura.       

                )

                
                //Icono abajo izquierda
                globals.ctx.drawImage(
                globals.assets.card_effect[card.effect],                     //archivo de la imagen
                0, 0,                                                        //Posición inicial x e y 
                64, 64, 
                initialX, initialY + 240,                                   //fin de x e y
                50, 50                                                     //Fin de anchura.       

            )

            }

            else{
                globals.ctx.drawImage(
                    globals.assets.card_category[card.categoryId - 1],                     //archivo de la imagen
                    0, 0,                                                                                           //Posición inicial x e y 
                    CardSizes.BIG_HEIGHT, CardSizes.BIG_HEIGHT, 
                    initialX, initialY,                                                                           //fin de x e y
                    65, 63                                                                                          //Fin de anchura.       

                )

            }

            globals.ctx.font        = "8 px magicmedieval";
            globals.ctx.fillStyle   = "black";
            globals.ctx.fillText(card.cardName, initialX + 100, initialY + 300);


            let words = card.description_eu.split(" ");
            let x = initialX + 43;
            let y = initialY + 330;
            let tamanoLetra = 7;
            let limiteCarta = 900;

            globals.ctx.font        = "6 px magicmedieval";
            globals.ctx.fillStyle   = "black";
            
            for (let j = 0; j < words.length; j++) {
                let letter = words[j].split("");

                globals.ctx.fillText(words[j], x, y);
                x += ((letter.length) * tamanoLetra)+2*tamanoLetra;


                if (j + 1 < words.length) {
                    let nextWordLetter = words[j + 1].split("");
                    if (x + tamanoLetra * nextWordLetter.length >= limiteCarta) {
                        y += 17;
                        x = initialX + 43;
                    }
                }
            }
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
    const hostName = localStorage.getItem('izen_abizena');
    // console.log(globals.hostPlayerInfo);
    globals.ctx.font = '18px magicmedieval'; 
    globals.ctx.fillStyle = 'white';    
    globals.ctx.fillText(globals.selectedEnemy, 225, 220); 
    globals.ctx.fillText(hostName, 225, 660);
    // globals.ctx.fillText()
    
    // globals.hostPlayerInfo.izen_abizena
}

function drawMessages()
{
    // console.log("los dos han pasado" + globals.checkBothPlayerRound);
    globals.checkRoundPlayer2;
    const hostName = localStorage.getItem('izen_abizena');
    if(globals.turnState === 1)
    {

        globals.ctx.font = '20px magicmedieval'; 
        globals.ctx.fillStyle = 'black';   
        globals.ctx.globalAlpha = 0.3;
        globals.ctx.fillRect(50, 530, 310, 85);
        globals.ctx.globalAlpha = 1.0; 
        globals.ctx.fillStyle = 'yellow';    
        globals.ctx.fillText(hostName + "'s turn.", 90, 585); 
    }
    else if(globals.turnState === 2)
    {
        globals.ctx.font = '20px magicmedieval'; 
        globals.ctx.fillStyle = 'black';    
        globals.ctx.globalAlpha = 0.3;
        globals.ctx.fillRect(50, 530, 310, 85);
        globals.ctx.globalAlpha = 1.0;
        globals.ctx.fillStyle = 'yellow';    
        globals.ctx.fillText(globals.selectedEnemy + "'s turn.", 90, 585); 
    }
    else
    {
        globals.ctx.font = '20px magicmedieval'; 
        globals.ctx.fillStyle = 'black';    
        globals.ctx.globalAlpha = 0.3;
        globals.ctx.fillRect(50, 530, 310, 85);
        globals.ctx.globalAlpha = 1.0;
        globals.ctx.fillStyle = 'yellow';    
        globals.ctx.fillText("The game has ended", 80, 585);
    }

    if(!globals.checkBothPlayerRound)
   {
        if (globals.checkRoundPlayer1 && !globals.checkRoundPlayer2)
        {
            globals.ctx.fillText("Solo puede jugar el jugador 1", 70, 555);
        }

        else if (!globals.checkRoundPlayer1 && globals.checkRoundPlayer2)
        {
            globals.ctx.fillText("Solo puede jugar el jugador 2", 70, 555);
        }
   }


   //////////////////////////////////////////////////
   ////// FRASES
   //////////////////////////////////////////////////
//    globals.ctx.fillText("Start of the round.", 90, 585); 

//    globals.ctx.fillText(globals.selectedEnemy + "'s turn.", 90, 585); 
//    globals.ctx.fillText(hostName + "'s turn.", 90, 585); 

//    globals.ctx.fillText(globals.selectedEnemy + " passed, your turn.", 90, 585); 
//    globals.ctx.fillText(hostName + " passed, your turn.", 90, 585); 

//    globals.ctx.fillText(globals.selectedEnemy + " has won the round", 90, 585); 
//    globals.ctx.fillText(hostName + " has won the round", 90, 585); 

//    globals.ctx.fillText("Draw a card", 90, 585); 

//    globals.ctx.fillText("Select an unit or effect card", 90, 585); 

//    globals.ctx.fillText("Take one card from your table or end turn", 90, 585); 

//    globals.ctx.fillText("Your turn is finished", 90, 585); 

//    globals.ctx.fillText("Select where will be the card placed", 90, 585); 


}


function gameOverScreen()
{
    const hostName = localStorage.getItem('izen_abizena');
    if(globals.turnState !== 1 && globals.turnState !== 2)
    {

        globals.ctx.fillStyle = 'black';    
        globals.ctx.globalAlpha = 0.8;
        globals.ctx.fillRect(0, 0, globals.canvas.width, globals.canvas.height);
        globals.ctx.globalAlpha = 1;
        var img = new Image();
        img.src = "./images/gwent_win.png";
        globals.ctx.drawImage(img, 570, 250);
        globals.ctx.font = '45px magicmedieval'; 
        globals.ctx.fillStyle = 'white';    
        globals.ctx.fillText(hostName, 720, 685); 
        document.getElementById('btnTurn').style.display = "none";
        document.getElementById('btnRound').style.display = "none";
    }

} 


export{
    render,
    renderBigCard,
}