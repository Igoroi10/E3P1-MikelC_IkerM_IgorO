import globals from "./globals.js";
import { CardState } from "./constants.js";
import ImageSet from "./ImageSet.js";
import { updateSelectedCard } from "./gameLogic.js";
import { decoyEvent } from "./events.js";

//DOBLE CLICK
function detectCollisionBetweenMouseAndCards()
{

    if(globals.action.doubleClick)
    {
        for(let i = 0; i < globals.cards.length; ++i)
        {
            const card = globals.cards[i];
            // console.log(globals.cards[i].xPos);
            const xSize = 80;
            const ySize = 100;
            
            // console.log(card.xPos);
        
            if(globals.mouse.x < (card.xPos + xSize) && globals.mouse.x >= card.xPos && globals.mouse.y < (card.yPos + ySize) && globals.mouse.y > card.yPos)
            {
                // console.log("ha entrado en el if");
                globals.mouseHasCollidedWithTheCard = true;
                
                if(globals.selectedCardId === -1)
                    globals.selectedCardId = i;
                else
                    globals.selectedCardId = -1;

                // console.log(globals.selectedCardId);
                break;
            }
            else
            {
                globals.mouseHasCollidedWithTheCard = false; 
                globals.selectedCardId = -1;
            }

            globals.action.doubleClick = false;
            
        }
    }

    // else
    
    // console.log(globals.selectedCardId);

}

function detectCollisionBetweenMouseAndSlots()
{
    // console.log("Entra en funcion Colision Slots")
    // console.log(globals.action.mousePressed);
    if (true)
    {
        // console.log("Entra en if Slots")
        for(let i = 0; i < globals.slots.length; ++i)
        {
            const slot = globals.slots[i];
            const xSize = 80;
            const ySize = 100;
        
            if(globals.mouse.x < (slot.xPos + xSize) && globals.mouse.x >= slot.xPos && globals.mouse.y < (slot.yPos + ySize) && globals.mouse.y > slot.yPos)
            {
                // console.log("Entra if");
                globals.mouseSelectedSlot = true;
                
                if(globals.selectedSlotId === -1)
                    globals.selectedSlotId = i;
                else
                    globals.selectedSlotId = -1;

                    // console.log("Slot: " + globals.selectedSlotId);
                    // console.log("Slot: " + slot.slotIdentificator);
                break;
            }
            else
            {
                globals.mouseSelectedSlot = false; 
                globals.selectedSlotId = -1;
            }
            

            // globals.action.mousePressed = false;
        }
    }
    

}

//Funcion que detecta que carta hemos seleccionado para colocar
function detectCollisionBetweenMouseAndCards_Click()
{
    if (globals.action.mousePressed )
    {
        for(let i = 0; i < globals.cards.length; ++i)
        {
            const card = globals.cards[i];
            const xSize = 80;
            const ySize = 100;
        
            if(globals.mouse.x < (card.xPos + xSize) && globals.mouse.x >= card.xPos && globals.mouse.y < (card.yPos + ySize) && globals.mouse.y > card.yPos && card.showBack === false)
            {
                // console.log(card.state);
                globals.mouseSelectedCard = true;
                
                if(globals.selectedCardId_Click === -1)
                {
                    globals.selectedCardId_Click = i;
                    updateSelectedCard(card);
                    decoyEvent();
                }
                    
                else
                globals.selectedSlotId = -1;

                break;
            }

            else
            {
                globals.mouseSelectedCard = false; 
                globals.selectedCardId_Click = -1;
            }
            
            
            // globals.action.mousePressed = false;
        }
    }
}

export {
    detectCollisionBetweenMouseAndCards,
    detectCollisionBetweenMouseAndSlots,
    detectCollisionBetweenMouseAndCards_Click,
}   