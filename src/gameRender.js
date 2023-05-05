

import { Card } from "./Card.js";
import { CardCategory, CardDisplaySize, CardSizes, CARD_SIZE , SlotIdentificators, Turn, Type, Effect} from "./constants.js";
import { gameLoop } from "./game.js";
import { decoyEffectResult } from "./gameLogic.js";
import globals from "./globals.js";
import { gameText } from "./text.js";
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
      // console.log(globals.cards.length)
        displayCards();
    }

    renderCards();
    renderSelectedCardAndPossibleSlots();
    drawMessages();
    drawTokens();
    drawPoints();
    renderBigCard();
    renderEarnedPoints();
    gameOverScreen();
    betweenTurnsScreen();
}

function renderMap ()
{
    
}


function renderCards(){
        for(let i = 0; i < globals.cards.length; i++){
            renderCard(globals.cards[i]);
        }


}

function displayCards(){

    let xPos = 5;
    let yPos = 5;
    let cardsDrawed = 0;
    for(let l = 0; l < 5; l++){

        for(let i = 0; i < 16; i++){
            globals.cards[cardsDrawed].xPos = xPos;
            globals.cards[cardsDrawed].yPos = yPos;
            globals.cards[cardsDrawed].showBack = false;
            renderCard(globals.cards[cardsDrawed]);
            cardsDrawed++;
            xPos += 95;   
        }

        xPos = 5;
        yPos += 120;
    }
}

function drawTokens()
{
    for(let i = 0; i < globals.tokens.length; i++)
    {
        renderCard(globals.tokens[i]);
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
            card.xPos, card.yPos + 65,                                   //fin de x e y
            30, 30             //Fin de anchura.       

        )

        //Icono abajo izquierda
        globals.ctx.drawImage(
            globals.assets.card_effect[card.effect],                     //archivo de la imagen
            0, 0,                                                        //Posición inicial x e y 
            65, 54, 
            card.xPos + 60, card.yPos + 65,                                   //fin de x e y
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
            globals.assets.front_img[card.frontImg],                     //archivo de la imagen
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
    let initialY = 238;
    let descriptionText;



    if(globals.selectedCardId >= 0){
        globals.bigRender = true;
        const card = globals.cards[globals.selectedCardId];

        if(globals.lenguageSelected === 0)
            descriptionText = card.description;
        
        else
            descriptionText = card.description_eu;

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


            let words = descriptionText.split(" ");
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
    else
        globals.bigRender = false;

}

function drawPoints(){
    globals.ctx.font        = "8 px magicmedieval";
    globals.ctx.fillStyle   = "white";
    globals.ctx.fillText(globals.player1Points,  390,  675);
    globals.ctx.fillText(globals.player2Points,  390,  230);
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

        // Funcion para renderizar los slots - todos a false ( Se actualizara con el update Slots de gameLogic)
        renderSlots(slot);
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

function renderSlots(slot)
{
    // console.log("Entra en RenderSlots");
    // slot.placed_cards = false;
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
    // console.log(globals.turnState);
    // console.log("los dos han pasado" + globals.checkBothPlayerRound);
    globals.checkRoundPlayer2;
    const hostName = localStorage.getItem('izen_abizena');
    // globals.ctx.fillStyle = 'red'; 
    // globals.ctx.fillRect(50, 530, 310, 85);
    // globals.ctx.clearRect(53, 533, 305, 80);


    if(globals.turnState === Turn.PLAYER0)
    {

        globals.ctx.font = '20px magicmedieval'; 
        globals.ctx.fillStyle = 'black';   
        globals.ctx.globalAlpha = 0.3;
        globals.ctx.fillRect(50, 530, 310, 85);
        globals.ctx.globalAlpha = 1.0; 
        globals.ctx.fillStyle = 'yellow';    
        globals.ctx.fillText(hostName+ gameText[globals.lenguageSelected].turnText, 90, 555); 
    }
    else if(globals.turnState === Turn.PLAYER1)
    {
        globals.ctx.font = '20px magicmedieval'; 
        globals.ctx.fillStyle = 'black';    
        globals.ctx.globalAlpha = 0.3;
        globals.ctx.fillRect(50, 530, 310, 85);
        globals.ctx.globalAlpha = 1.0;
        globals.ctx.fillStyle = 'yellow';    
        globals.ctx.fillText(globals.selectedEnemy + gameText[globals.lenguageSelected].turnText, 90, 555); 
    }
    else
    {
        globals.ctx.font = '20px magicmedieval'; 
        globals.ctx.fillStyle = 'black';    
        globals.ctx.globalAlpha = 0.3;
        globals.ctx.fillRect(50, 530, 310, 85);
        globals.ctx.globalAlpha = 1.0;
        globals.ctx.fillStyle = 'yellow';    
        globals.ctx.fillText("The game has ended", 80, 555);
    }
    if(!globals.checkBothPlayerRound)
   {
        if (globals.checkRoundPlayer1 && !globals.checkRoundPlayer2)
        {
            globals.ctx.fillText(gameText[globals.lenguageSelected].onePlayerPassedText, 0, 610);
        }

        else if (!globals.checkRoundPlayer1 && globals.checkRoundPlayer2)
        {
            globals.ctx.fillText(gameText[globals.lenguageSelected].onePlayerPassedText, 0, 610);
        }
   }
    if(globals.actionsCounter === 1 )
   {
        globals.ctx.font = '20px magicmedieval'; 
        globals.ctx.fillStyle = 'yellow';    
        globals.ctx.fillText(gameText[globals.lenguageSelected].decoyText, 0, 585);
   }
   else if(globals.actionsCounter === 0)
   {
        globals.ctx.font = '20px magicmedieval'; 
        globals.ctx.fillStyle = 'yellow';  
        if(globals.selectedCardId_Click === -1)
        {
            globals.ctx.fillText(gameText[globals.lenguageSelected].selectCardText, 0, 585);
        }  
        else
            globals.ctx.fillText(gameText[globals.lenguageSelected].placeCardText, 0, 585);
   }
}

function renderEarnedPoints()
{
    globals.ctx.font = '40px magicmedieval'; 
    globals.ctx.fillStyle = 'yellow';  
    let carta = globals.cards[globals.currentSelectedCardId];
    
    if(globals.calculateNewPoints)
    {
        if(carta.cardName === "Scorch")
        {
            if(carta.slotIdentificator === SlotIdentificators.PLAYER1_F1 || carta.slotIdentificator === SlotIdentificators.PLAYER1_F2 || carta.slotIdentificator === SlotIdentificators.PLAYER1_F3)
            {
                //efectuado el efecto de scorch
                globals.renderAlpha -= (globals.deltaTime / 2);
                if(globals.renderAlpha < 0)
                {
                    globals.renderAlpha = 0;
                }
                globals.ctx.save();
                globals.ctx.globalAlpha = globals.renderAlpha;
                globals.ctx.fillText(gameText[globals.lenguageSelected].scorchEffectText, 740, 290 ); 
                globals.ctx.restore();
            }
            else
            {
                //efectuado el efecto de scorch
                globals.renderAlpha -= (globals.deltaTime / 2);
                if(globals.renderAlpha < 0)
                {
                    globals.renderAlpha = 0;
                }
                globals.ctx.save();
                globals.ctx.globalAlpha = globals.renderAlpha;
                globals.ctx.fillText(gameText[globals.lenguageSelected].scorchEffectText, 740, 600); 
                globals.ctx.restore();
            }
        }
        else if(carta.cardName === "Commanders_Horn")
        {
            if(carta.slotIdentificator === SlotIdentificators.PLAYER1_B1 || carta.slotIdentificator === SlotIdentificators.PLAYER1_B2 || carta.slotIdentificator === SlotIdentificators.PLAYER1_B3)
            {
                //efectuado el efecto de scorch
                globals.renderAlpha -= (globals.deltaTime / 2);
                if(globals.renderAlpha < 0)
                {
                    globals.renderAlpha = 0;
                }
                globals.ctx.save();
                globals.ctx.globalAlpha = globals.renderAlpha;
                globals.ctx.fillText(gameText[globals.lenguageSelected].commandersText, 660, 290 ); 
                globals.ctx.restore();
            }
            else
            {
                //efectuado el efecto de scorch
                globals.renderAlpha -= (globals.deltaTime / 2);
                if(globals.renderAlpha < 0)
                {
                    globals.renderAlpha = 0;
                }
                globals.ctx.save();
                globals.ctx.globalAlpha = globals.renderAlpha;
                globals.ctx.fillText(gameText[globals.lenguageSelected].commandersText, 660, 600); 
                globals.ctx.restore();
            }
        }
        else if(carta.slotIdentificator === SlotIdentificators.PLAYER1_F1 || carta.slotIdentificator === SlotIdentificators.PLAYER1_F2 || carta.slotIdentificator === SlotIdentificators.PLAYER1_F3)
        {
            if(globals.lenguageSelected === 0)
            {
                globals.renderAlpha -= (globals.deltaTime / 2);
                if(globals.renderAlpha < 0)
                {
                    globals.renderAlpha = 0;
                }
                globals.ctx.save();
                globals.ctx.globalAlpha = globals.renderAlpha;
                globals.ctx.fillText(globals.selectedEnemy + " "  + gameText[globals.lenguageSelected].earnedPointsText + globals.earnedPlayer2Points + gameText[globals.lenguageSelected].earnedPoints2Text, 757, 290 ); 
                globals.ctx.restore();
            }
            else if(globals.lenguageSelected === 1)
            {
                globals.renderAlpha -= (globals.deltaTime / 2);
                if(globals.renderAlpha < 0)
                {
                    globals.renderAlpha = 0;
                }
                globals.ctx.save();
                globals.ctx.globalAlpha = globals.renderAlpha;
                globals.ctx.fillText(globals.selectedEnemy + " " + globals.earnedPlayer2Points + gameText[globals.lenguageSelected].earnedPoints2Text, 757, 290 ); 
                globals.ctx.restore();
            }
        }
        else if(carta.slotIdentificator === SlotIdentificators.PLAYER0_F1 || carta.slotIdentificator === SlotIdentificators.PLAYER0_F2 || carta.slotIdentificator === SlotIdentificators.PLAYER0_F3)
        {
            if(globals.lenguageSelected === 0)
            {
                globals.renderAlpha -= (globals.deltaTime / 2);
                if(globals.renderAlpha < 0)
                {
                    globals.renderAlpha = 0;
                }
                globals.ctx.save();
                globals.ctx.globalAlpha = globals.renderAlpha;
                globals.ctx.fillText(localStorage.getItem('izen_abizena') + gameText[globals.lenguageSelected].earnedPointsText + globals.earnedPlayer1Points + gameText[globals.lenguageSelected].earnedPoints2Text, 757, 600 ); 
                globals.ctx.restore();
            }
            else if(globals.lenguageSelected === 1)
            {
                globals.renderAlpha -= (globals.deltaTime / 2);
                if(globals.renderAlpha < 0)
                {
                    globals.renderAlpha = 0;
                }
                globals.ctx.save();
                globals.ctx.globalAlpha = globals.renderAlpha;
                globals.ctx.fillText(localStorage.getItem('izen_abizena') + globals.earnedPlayer1Points + gameText[globals.lenguageSelected].earnedPoints2Text, 757, 600 ); 
                globals.ctx.restore();
            }
        }
    }
    if(globals.renderAlpha === 0)
    {
        globals.calculateNewPoints = false;
        globals.renderAlpha = 1;
        // globals.earnedPlayer1Points = 0;
        // globals.earnedPlayer2Points = 0;
    }
    // console.log(globals.previousPoints2);

}

function renderSelectedCardAndPossibleSlots(){

    if(globals.selectedCardId_Click >= 0){

        const x1 = Math.floor(globals.cards[globals.selectedCardId_Click].xPos);
        const y1 = Math.floor(globals.cards[globals.selectedCardId_Click].yPos);
        const w1 = CardSizes.TOKEN_WIDHT;
        const h1 = CardSizes.TOKEN_HEIGHT;


        globals.ctx.strokeStyle = "yellow";
        globals.ctx.strokeRect(x1, y1, w1, h1);



        switch(globals.cards[globals.selectedCardId_Click].categoryId){

            case CardCategory.UNIT:
                renderUnitSlots(globals.cards[globals.selectedCardId_Click]);
                break;
            
            case CardCategory.INSTAEFFECT:
                renderFieldSlots();
                break;
            
            case CardCategory.PERMAEFFECT:
                renderBuffSlots();
                break;
            
            case CardCategory.CLIMATE:
                renderClimateSlots();
                break;
            
        }
    }
}

function renderUnitSlots(card){

    let slotID;

    if(globals.turnState === 0){
        if(card.type === Type.PHYSICAL){

            if(card.effect !== Effect.SPY)
                slotID = SlotIdentificators.PLAYER0_F1;
            
            else
                slotID = SlotIdentificators.PLAYER1_F1;
        }



        else if(card.type === Type.DISTANCE){
            if(card.effect !== Effect.SPY)
                slotID = SlotIdentificators.PLAYER0_F2;
            
            else
                slotID = SlotIdentificators.PLAYER1_F2;
        }


        else {
            if(card.effect !== Effect.SPY)
                slotID = SlotIdentificators.PLAYER0_F3;
            
            else
                slotID = SlotIdentificators.PLAYER1_F3;
        }
    }

    else{
        if(card.type === Type.PHYSICAL){

            if(card.effect !== Effect.SPY)
                slotID = SlotIdentificators.PLAYER1_F1;
            
            else
                slotID = SlotIdentificators.PLAYER0_F1;
        }



        else if(card.type === Type.DISTANCE){
            if(card.effect !== Effect.SPY)
                slotID = SlotIdentificators.PLAYER1_F2;
            
            else
                slotID = SlotIdentificators.PLAYER0_F2;
        }


        else {
            if(card.effect !== Effect.SPY)
                slotID = SlotIdentificators.PLAYER1_F3;
            
            else
                slotID = SlotIdentificators.PLAYER0_F3;
        }
    }

    for(let i = 0; i < globals.slots.length; i++){
        if(globals.slots[i].slotIdentificator === slotID && globals.slots[i].placed_cards === -1){
            const x1 = Math.floor(globals.slots[i].xPos);
            const y1 = Math.floor(globals.slots[i].yPos);
            const w1 = CardSizes.TOKEN_WIDHT;
            const h1 = CardSizes.TOKEN_HEIGHT;

            globals.ctx.strokeStyle = "yellow";
            globals.ctx.strokeRect(x1, y1, w1, h1);    
            }
    }

}

function renderFieldSlots(){
    let f1ID;
    let f2ID;
    let f3ID;

    if(globals.turnState === 0){
        f1ID = SlotIdentificators.PLAYER0_F1;
        f2ID = SlotIdentificators.PLAYER0_F2;
        f3ID = SlotIdentificators.PLAYER0_F3;
    }

    else{
        f1ID = SlotIdentificators.PLAYER1_F1;
        f2ID = SlotIdentificators.PLAYER1_F2;
        f3ID = SlotIdentificators.PLAYER1_F3;
    }

    for(let i = 0; i < globals.slots.length; i++){
        if(globals.slots[i].slotIdentificator === f1ID && globals.slots[i].placed_cards === -1
        || globals.slots[i].slotIdentificator === f2ID && globals.slots[i].placed_cards === -1
        || globals.slots[i].slotIdentificator === f3ID && globals.slots[i].placed_cards === -1){

            const x1 = Math.floor(globals.slots[i].xPos);
            const y1 = Math.floor(globals.slots[i].yPos);
            const w1 = CardSizes.TOKEN_WIDHT;
            const h1 = CardSizes.TOKEN_HEIGHT;

            globals.ctx.strokeStyle = "yellow";
            globals.ctx.strokeRect(x1, y1, w1, h1);    
            }
    }
}

function renderBuffSlots(){
    let b1ID;
    let b2ID;
    let b3ID;

    if(globals.turnState === 0){
        b1ID = SlotIdentificators.PLAYER0_B1;
        b2ID = SlotIdentificators.PLAYER0_B2;
        b3ID = SlotIdentificators.PLAYER0_B3;
    }

    else{
        b1ID = SlotIdentificators.PLAYER1_B1;
        b2ID = SlotIdentificators.PLAYER1_B2;
        b3ID = SlotIdentificators.PLAYER1_B3;
    }

    for(let i = 0; i < globals.slots.length; i++){
        if(globals.slots[i].slotIdentificator === b1ID && globals.slots[i].placed_cards === -1
        || globals.slots[i].slotIdentificator === b2ID && globals.slots[i].placed_cards === -1
        || globals.slots[i].slotIdentificator === b3ID && globals.slots[i].placed_cards === -1){
            const x1 = Math.floor(globals.slots[i].xPos);
            const y1 = Math.floor(globals.slots[i].yPos);
            const w1 = CardSizes.TOKEN_WIDHT;
            const h1 = CardSizes.TOKEN_HEIGHT;

            globals.ctx.strokeStyle = "yellow";
            globals.ctx.strokeRect(x1, y1, w1, h1);    
        }
    }
}

function renderClimateSlots(){

}

function gameOverScreen()
{

    if(globals.checkIfLives0)
    {
        globals.ctx.fillStyle = 'black';    
        globals.ctx.globalAlpha = 0.5;
        globals.ctx.fillRect(0, 0, globals.canvas.width, globals.canvas.height);
        globals.ctx.globalAlpha = 1;
        var img = new Image();
        img.src = "./images/gwent_win.png";
        globals.ctx.drawImage(img, 570, 250);
        globals.ctx.font = '45px magicmedieval'; 
        globals.ctx.fillStyle = 'white';    
        globals.ctx.fillText(globals.winner, 720, 685); 
        document.getElementById('btnTurn').style.display = "none";
        document.getElementById('btnRound').style.display = "none";
    }
} 


function betweenTurnsScreen(){

    const hostName = localStorage.getItem('izen_abizena');
    if(globals.showTurnChangeScreen){
        globals.ctx.fillStyle = 'black';  
        globals.ctx.globalAlpha = 0.85;
        globals.ctx.fillRect(0, 0, globals.canvas.width, globals.canvas.height);

        if(globals.turnState === Turn.PLAYER0){
            globals.ctx.globalAlpha = 1;
            globals.ctx.font = '45px magicmedieval'; 
            globals.ctx.fillStyle = 'white';    
            globals.ctx.fillText(hostName + gameText[globals.lenguageSelected].turnText, 650, 420);
            globals.ctx.fillText(gameText[globals.lenguageSelected].passTurnText, 600, 360);
            globals.ctx.fillText(gameText[globals.lenguageSelected].passTurnContinue, 550, 480); 
        }

        else{
            globals.ctx.globalAlpha = 1;
            globals.ctx.font = '45px magicmedieval'; 
            globals.ctx.fillStyle = 'white';    
            globals.ctx.fillText(globals.selectedEnemy + gameText[globals.lenguageSelected].turnText, 650, 420); 
            globals.ctx.fillText(gameText[globals.lenguageSelected].passTurnText, 600, 360);
            globals.ctx.fillText(gameText[globals.lenguageSelected].passTurnContinue, 550, 480);
        }
    }
}

export{
    render,
    renderBigCard,
    displayCards,
    renderCard,
    renderEarnedPoints,
}