class GameZones {

    constructor (xPos, yPos, xSize, ySize, slotIdentificator)
    {
        this.xPos               = xPos;
        this.yPos               = yPos;
        this.xSize              = xSize;
        this.ySize              = ySize;
        this.placed_cards       = -1;    //Si existe una carta tendra el numero correspopndiente de la carta, en caso de no haber ninguna carta tendra -1
        this.slotIdentificator  = slotIdentificator;
    }

}

export {

    GameZones,
}