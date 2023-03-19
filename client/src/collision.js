import globals from "./globals.js";
import { CARD_SIZE } from "./constants.js";
import ImageSet from "./ImageSet.js";

function detectCollisionBetweenMouseAndCards()
{
    for(let i = 0; i < globals.cards.length; ++i)
    {
        const card = globals.cards[i];
        // console.log(card);
     
        if(globals.mouse.x < (card.xPos + ImageSet.xSize) && globals.mouse.x >= card.xPos && globals.mouse.y < card.yPos)
        {
            globals.mouseHasCollidedWithTheCard = true;
        }
        else
            globals.mouseHasCollidedWithTheCard = false;
    }
    // console.log(globals.mouseHasCollidedWithTheCard);
    console.log(ImageSet.xSize);

}

export {
    detectCollisionBetweenMouseAndCards
}