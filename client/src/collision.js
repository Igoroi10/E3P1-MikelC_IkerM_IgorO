import globals from "./globals.js";
import { CardSizes, CARD_SIZE } from "./constants.js";
import ImageSet from "./ImageSet.js";

function detectCollisionBetweenMouseAndCards()
{
    for(let i = 0; i < globals.cards.length; ++i)
    {
        const card = globals.cards[i];
        // console.log(card);
        const cardSize = card.xSize;
        
     
        if(globals.mouse.x < (card.xPos + card.xSize) && globals.mouse.x >= card.xPos && globals.mouse.y < card.yPos)
        {
            globals.mouseHasCollidedWithTheCard = true;
        }
        else
            globals.mouseHasCollidedWithTheCard = false; 

        console.log(card.ImageSet);
    }
    // console.log(globals.mouseHasCollidedWithTheCard);
   

}

export {
    detectCollisionBetweenMouseAndCards
}