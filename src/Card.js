import {CardCategory, CardDisplaySize} from "./constants.js";

class Card{

    constructor(frontImg, cardName, state, showBack, imageSet){

        this.xPos           = 0;
        this.yPos           = 0;
        this.frontImg       = frontImg;
        this.frameImg       = 3;
        this.backImg        = 0;
        this.cardName       = cardName;
        this.categoryId     = CardCategory.TOKEN;
        this.state          = state;
        this.showBack       = showBack;
        this.imageSet       = imageSet;
        this.Size           = CardDisplaySize.SMALL;
        this.previousState  = -1;

    }
}

class UnitCard extends Card{

    constructor(frontImg, cardName, state, showBack, imageSet, value, description, description_eu, effect, rarity, type){
        super();
        this.xPos           = 0;
        this.yPos           = 0;
        this.frontImg       = frontImg;
        this.frameImg       = 0;
        this.backImg        = 0;
        this.cardName       = cardName;
        this.state          = state;
        this.showBack       = showBack;
        this.imageSet       = imageSet;
        this.value          = value;
        this.description    = description;
        this.description_eu = description_eu
        this.effect         = effect;
        this.rarity         = rarity;
        this.categoryId     = CardCategory.UNIT;
        this.type           = type;

    }
}

class SuddenCard extends Card {

    constructor(frontImg, cardName, state, showBack, imageSet, description, description_eu, effect){
        super();
        this.xPos           = 0;
        this.yPos           = 0;
        this.frontImg       = frontImg;
        this.frameImg       = 0;
        this.backImg        = 0;
        this.cardName       = cardName;
        this.state          = state;
        this.showBack       = showBack;
        this.imageSet       = imageSet;
        this.Size           = CardDisplaySize.SMALL;
        this.description    = description;
        this.description_eu = description_eu;
        this.effect         = effect;
        this.categoryId     = CardCategory.INSTAEFFECT;
    }
}

class PermaCard extends Card{

    constructor(frontImg, cardName, state, showBack, imageSet, description, description_eu, effect, type){
        super();
        this.xPos           = 0;
        this.yPos           = 0;
        this.frontImg       = frontImg;
        this.frameImg       = 0;
        this.backImg        = 0;
        this.cardName       = cardName;
        this.state          = state;
        this.showBack       = showBack;
        this.imageSet       = imageSet;
        this.Size           = CardDisplaySize.SMALL;
        this.description    = description;
        this.description_eu = description_eu
        this.effect         = effect;
        this.categoryId     = CardCategory.PERMAEFFECT;
        this.type           = type;
    }
}


class ClimateCard extends Card{

    constructor (frontImg, cardName, state, showBack, imageSet, description, description_eu, effect){
        super();
        this.xPos           = 0;
        this.yPos           = 0;
        this.frontImg       = frontImg;
        this.frameImg       = 0;
        this.backImg        = 0;
        this.cardName       = cardName;
        this.categoryId     = CardCategory.TOKEN;
        this.state          = state;
        this.showBack       = showBack;
        this.imageSet       = imageSet;
        this.Size           = CardDisplaySize.SMALL;
        this.description    = description;
        this.description_eu = description_eu
        this.categoryId     = CardCategory.CLIMATE;
        this.effect         = effect;
    }
}

export{
    UnitCard,
    SuddenCard,
    PermaCard,
    ClimateCard,
    Card
}
