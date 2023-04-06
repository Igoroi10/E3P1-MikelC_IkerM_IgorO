class GameZones {

    constructor (xPos, yPos, xSize, ySize, slotIDentificator)
    {
        this.xPos               = xPos;
        this.yPos               = yPos;
        this.xSize              = xSize;
        this.ySize              = ySize;
        this.placed_cards       = 0;
        this.slotIDentificator  = slotIDentificator;
    }

}

export {

    GameZones,
}