import {CardCategory} from "./constants.js";

class Card{

    constructor(xPos, yPos, frontImg, backImg, frameImg, cardName, state, showBack){

        this.xPos       = xPos;
        this.yPos       = yPos;
        this.frontImg   = frontImg;
        this.backImg    = backImg;
        this.frameImg   = frameImg;
        this.cardName   = cardName;
        this.categoryId = CardCategory.TOKEN;
        this.state      = state;
        this.showBack   = showBack;

    }
}

class UnitCard extends Card{

    constructor(value, description, effect, rarity, type){
        super(xPos, yPos, frontImg, backImg, frameImg, cardName, type);
        this.value          = value;
        this.description    = description;
        this.effect         = effect;
        this.rarity         = rarity;
        this.categoryId     = CardCategory.UNIT;
        this.type           = type;

    }
}

class SuddenCard extends Card {

    constructor(description, effect, type){
        super(xPos, yPos, frontImg, backImg, frameImg, cardName, type);
        this.description    = description;
        this.effect         = effect;
        this.categoryId     = CardCategory.INSTAEFFECT;
    }
}

class PermaCard extends Card{

    constructor(description, effect, type){
        super(xPos, yPos, frontImg, backImg, frameImg, cardName);
        this.description    = description;
        this.effect         = effect;
        this.categoryId     = CardCategory.PERMAEFFECT;
        this.type           = type;
    }
}


class ClimateCard extends Card{

    constructor (effect, type){
        super(xPos, yPos, frontImg, backImg, frameImg, cardName, type);
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
