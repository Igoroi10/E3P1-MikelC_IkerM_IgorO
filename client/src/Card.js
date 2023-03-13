import {CardCategory} from constants.js;

class Card{

    constructor(xPos, yPos, frontImg, backImg, frameImg, cardName, categoryId, state, showBack){

        this.xPos       = xPos;
        this.yPos       = yPos;
        this.frontImg   = frontImg;
        this.backImg    = backImg;
        this.frameImg   = frameImg;
        this.cardName   = cardName;
        this.categoryId = categoryId;
        this.state      = state;
        this.showBack   = showBack;

    }
}

class UnitCard extends Card{

    constructor(value, description, effect, rarity, type){
        super(xPos, yPos, frontImg, backImg, frameImg, cardName, categoryId, type);
        this.value          = value;
        this.description    = description;
        this.effect         = effect;
        this.rarity         = rarity;
        this.type           = type;

    }
}

class SuddenCard extends Card {

    constructor(description, effect, type){
        super(xPos, yPos, frontImg, backImg, frameImg, cardName, categoryId, type);
        this.description    = description;
        this.effect         = effect;
        this.type           = type;
    }
}

class PermaCard extends Card{

    constructor(description, effect, type){
        super(xPos, yPos, frontImg, backImg, frameImg, cardName, categoryId, type);
        this.description    = description;
        this.effect         = effect;
        this.type           = type;
    }
}


class ClimateCard extends Card{

    constructor (effect, type){
        super(xPos, yPos, frontImg, backImg, frameImg, cardName, categoryId, type);
        this.effect     = effect;
        this.type       = type;
    }
}

export{
    UnitCard,
    SuddenCard,
    PermaCard,
    ClimateCard
}
