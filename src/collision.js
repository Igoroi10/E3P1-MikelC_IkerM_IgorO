import globals from "./globals.js";
import { CardSizes, CARD_SIZE } from "./constants.js";
import ImageSet from "./ImageSet.js";

function detectCollisionBetweenMouseAndCards()
{
    let j = 0;
    for(let i = 0; i < globals.cards.length; ++i)
    {
        const card = globals.cards[i];
        // console.log(globals.cards[1].xPos);
        const xSize = 80;
        const ySize = 100;
        
        // console.log("I : " + i);
     
        if(globals.action.doubleClick)
        {
            if(globals.mouse.x < (card.xPos + xSize) && globals.mouse.x >= card.xPos && globals.mouse.y < (card.yPos + ySize) && globals.mouse.y > card.yPos)
            {
                globals.mouseHasCollidedWithTheCard = true;
                
                // globals.selectedCardId = i;
            }
            else
                globals.mouseHasCollidedWithTheCard = false; 
                globals.action.doubleClick = false;
        }
    }
   
    
    console.log(globals.mouseHasCollidedWithTheCard);

}

export {
    detectCollisionBetweenMouseAndCards
}   