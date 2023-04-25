import globals from "./globals.js";
import { CardState, SlotIdentificators, Effect } from "./constants.js";
import ImageSet from "./ImageSet.js";
import { updateSelectedCard, checkLastSelection  } from "./gameLogic.js";
import { decoyEvent } from "./events.js";

//DOBLE CLICK
function detectCollisionBetweenMouseAndCards()
{

    if(globals.action.rightMousePressed)
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

            globals.action.rightMousePressed = false;
            
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
    // If del Timer - para bloquear la seleccion durante 1 segundo
    if(!globals.timerActivate)
    {
        // console.log("Entra en el if de timerActivate")
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
                        if(globals.actionsCounter === 0)
                        {
                            globals.selectedCardId_Click = i;
                            //Testear el id - Ver si el slot identioficator corresponde a field 1 2 o 3 del turnState
                            checkLastSelection();
                            updateSelectedCard(card);
                            decoyEvent();
                        }

                        else if (globals.actionsCounter === 1)
                        {
                            let field1;
                            let field2;
                            let field3;

                            if (globals.turnState === 0 )
                            {
                                field1 = SlotIdentificators.PLAYER0_F1
                                field2 = SlotIdentificators.PLAYER0_F2
                                field3 = SlotIdentificators.PLAYER0_F3
                            }

                            else
                            {
                                field1 = SlotIdentificators.PLAYER1_F1
                                field2 = SlotIdentificators.PLAYER1_F2
                                field3 = SlotIdentificators.PLAYER1_F3
                            }


                            if (globals.slots[globals.selectedSlotId].slotIdentificator  === field1 && card.effect !== Effect.SPY || globals.slots[globals.selectedSlotId].slotIdentificator  === field2 && card.effect !== Effect.SPY || globals.slots[globals.selectedSlotId].slotIdentificator  === field3  && card.effect !== Effect.SPY)
                            {
                                globals.selectedCardId_Click = i;
                                //Testear el id - Ver si el slot identioficator corresponde a field 1 2 o 3 del turnState
                                updateSelectedCard(card);
                                decoyEvent();
                            }
                        
                        }
                        
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
}
    

export {
    detectCollisionBetweenMouseAndCards,
    detectCollisionBetweenMouseAndSlots,
    detectCollisionBetweenMouseAndCards_Click,
}   