import {CardCategory, CardDisplaySize} from "./constants.js";

class Card{

    constructor(frontImg, backImg, frameImg, cardName, state, showBack, imageSet){

        this.xPos       = 0;
        this.yPos       = 0;
        this.frontImg   = frontImg;
        this.backImg    = backImg;
        this.frameImg   = frameImg;
        this.cardName   = cardName;
        this.categoryId = CardCategory.TOKEN;
        this.state      = state;
        this.showBack   = showBack;
        this.imageSet   = imageSet;
        this.Size       = CardDisplaySize.SMALL;

    }
}

class UnitCard extends Card{

    constructor(value, description, effect, rarity, type){
        super( frontImg, backImg, frameImg, cardName, state, showBack);
        this.value          = value;
        this.description    = description;
        this.effect         = effect;
        this.rarity         = rarity;
        this.categoryId     = CardCategory.UNIT;
        this.type           = type;

    }
}

class SuddenCard extends Card {

    constructor(description, effect){
        super(frontImg, backImg, frameImg, cardName, state, showBack, imageSet);
        this.description    = description;
        this.effect         = effect;
        this.categoryId     = CardCategory.INSTAEFFECT;
    }
}

class PermaCard extends Card{

    constructor(description, effect, type){
        super(frontImg, backImg, frameImg, cardName, state, showBack, imageSet);
        this.description    = description;
        this.effect         = effect;
        this.categoryId     = CardCategory.PERMAEFFECT;
        this.type           = type;
    }
}


class ClimateCard extends Card{

    constructor (effect){
        super(frontImg, backImg, frameImg, cardName, state, showBack, imageSet);
        this.categoryId     = CardCategory.CLIMATE;
        this.effect     = effect;
    }
}

export{
    UnitCard,
    SuddenCard,
    PermaCard,
    ClimateCard,
    Card
}
