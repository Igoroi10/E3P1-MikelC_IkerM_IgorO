//Fake Card para almacenar en el array de Objetos Fake

export default class FakeCard{

    constructor( frontImg, backImg, frameImg, cardName, CardCategory, state, value, description, effect, rarity, type, showBack){

        // this.xPos       = xPos;
        // this.yPos       = yPos;
        this.frontImg       = frontImg;
        this.backImg        = backImg;
        this.frameImg       = frameImg;
        this.cardName       = cardName;
        this.categoryId     = CardCategory;
        this.state          = state;
        this.value          = value;
        this.description    = description;
        this.effect         = effect;
        this.rarity         = rarity;
        this.type           = type; 

        this.showBack       = showBack;

    }
}