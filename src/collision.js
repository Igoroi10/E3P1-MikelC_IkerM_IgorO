import globals from "./globals.js";
import { CardSizes, CARD_SIZE } from "./constants.js";
import ImageSet from "./ImageSet.js";

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
                // console.log(card);
                globals.mouseHasCollidedWithTheCard = true;
                globals.selectedCardId = i;
                // console.log(globals.selectedCardId);
                break;
            }
            else
                globals.mouseHasCollidedWithTheCard = false; 

            globals.action.doubleClick = false;
            
        }
    }
    
    // console.log(globals.mouseHasCollidedWithTheCard);

}

export {
    detectCollisionBetweenMouseAndCards
}   