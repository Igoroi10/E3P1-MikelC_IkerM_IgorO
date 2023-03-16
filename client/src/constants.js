
const State = {

    LOADING:        0,
    LOG_IN:         1,
    ADMIN_MENU:     2,
    PLAYER_MENU:    3,
    LOAD_GAME:      4,
    PLAYING:        5,
    STATS:          6,
    ROUND_END:      7,
    GAME_END:       8
    
}  

const FPS = 30;

const Languages = {

    EUSKERA:    0,
    ENGLISH:    1,
}

const CardState = {
    DISCARD:   0,
    HAND:       1,  
    GAME:       2,
    DECK:       3,
    }

const CardDisplaySize = {

    SMALL:  0,
    FULL:   1,

}

const CardCategory ={
    UNIT:           0,
    INSTAEFFECT:    1,
    PERMAEFFECT:    2,
    CLIMATE:        3,
    TOKEN:          4,    
}

const CardQuantity = {

    NORMAL_PERMA:     3,
    NORMAL_INSTA:     6,
    EXPERT_PERMA:     6,
    EXPERT_INSTA:     10,
    EXPERT_CLIMATE:   9,

}

const GameMode = {
    NORMAL_MODE:    0,
    EXPERT_MODE:    1,
}

const Rarity = {
    
    ULTRA_RARE:     0,
    RARE:           1,
    COMMON:         2, 
}


const Effect ={
    
    //HABILITY
    SCORCH_INMUNE:      0,
    SCORCH:             1,
    COMMANDERS_HORN:    2,
    DEMORALIZE:         3,
    DECOY:              4,
    
    //WEATHER 
    BITTING_FROST:      5,
    CLEAR_WEATHER:      6,
    IMPENETRABLE_FOG:   7,
    TORRENTIAL_RAIN:    8,
    
    //UNIT HABILITY
    MEDIC:              9,
    MORALE_BOOST:       10,
    MUSTER:             11,
    SPY:                12,
    TIGHT_BOND:         13,
    
}

const Type ={

    PHYSICAL:       1,
    DISTANCE:       2,
    SIEGE:          3,


}

const Key = {

    ENTER:  13     //Tecla Enter
}

const Card_img_quantity = {
    
    UNIT_CARD:          36,
    EFFECT_CARDS:       47,
    VALUE_CARDS:        58,
    CATEGORY_CARDS:     61,
    TYPE_CARDS:         64,
    FRAME_CARDS:        66,
    REVERSE_CARDS:      67,

};



const CardSizes = {
    SMALL_HEIGHT:   87,
    SMALL_WIDTH:    85,
    BIG_HEIGHT:     460,
    BIG_WIDTH:      360,
    TOKEN_HEIGHT:   106,
    TOKEN_WIDHT:    85
}


CardSlotsQuantity = {
    HAND:       12,
    FIELD:      8,
    DECK:       1,
    DISCARD:    1, 
}


export{
    State,
    Languages,
    CardState,
    CardCategory,
    Rarity,
    Effect,
    Type,
    CardQuantity,
    CardDisplaySize,
    GameMode,
    FPS,
    Card_img_quantity,
    Key,
    CardSizes,
}

