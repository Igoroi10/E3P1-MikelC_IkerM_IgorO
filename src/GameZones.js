class GameZones {

    constructor (xPos, yPos, xSize, ySize, slotIDentificator)
    {
        this.xPos               = xPos;
        this.yPos               = yPos;
        this.xSize              = xSize;
        this.ySize              = ySize;
        this.placed_cards       = 0;    //Si existe una carta tendra el numero correspopndiente de la carta, en caso de no haber ninguna carta tendra -1
        this.slotIDentificator  = slotIDentificator;
    }

}

export {

    GameZones,
}