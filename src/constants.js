
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
    
    ULTRA_RARE:     "ur3",
    RARE:           "ur2",
    COMMON:         "ur1", 
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

    ENTER:      13,     // Tecla Enter
    DECK:       68,     // Tecla D
    CARD:       67,     // Tecla C
    EXAMINE:    69,     // Tecla E    
}

const Card_img_quantity = {
    
    UNIT_CARD:          35,
    EFFECT_CARDS:       46,
    VALUE_CARDS:        57,
    CATEGORY_CARDS:     60,
    TYPE_CARDS:         63,
    FRAME_CARDS:        66,
    REVERSE_CARDS:      67,

};



const CardSizes = {
    TOKEN_HEIGHT:           87,
    TOKEN_WIDHT:            85,
    
    SMALL_ICON_HEIGHT:      62,
    SMALL_ICON_WIDTH:       65,
    SMALL_ICON_INTERSEC:    54,

    BIG_CUT_FRAME_HEIGHT:   294,
    BIG_CUT_FRAME_WIDTH:    280,

    BIG_HEIGHT:             460,
    BIG_WIDTH:              360,
    TOKEN_HEIGHT:           106,
    TOKEN_WIDHT:            85
}

const CARD_SIZE = 150;


const CardSlotsQuantity = {
    HAND:       12,
    FIELD:      8,
    DECK:       1,
    DISCARD:    1,
     
}

const Common_map_pos = {
    PLAYER2_CARD_XPOS:      120,
    PLAYER2_CARD_YPOS:      60,

    CLIMATE_BOX_1_XPOS:     60,
    CLIMATE_BOX_2_XPOS:     200,
    CLIMATE_BOX_YPOS:       390,

    PLAYER1_CARD_XPOS:      120,
    PLAYER1_CARD_YPOS:      750
}

const Player1_map_pos = {
    PLAYER1_BUFF1_XPOS:             500,
    PLAYER1_BUFF1_YPOS:             450,

    PLAYER1_BUFF2_XPOS:             500,
    PLAYER1_BUFF2_YPOS:             550,

    PLAYER1_BUFF3_XPOS:             500,
    PLAYER1_BUFF3_YPOS:             650,


    PLAYER1_TABLE_SECTION1_XPOS:    620,
    PLAYER1_TABLE_SECTION2_XPOS:    690,
    PLAYER1_TABLE_SECTION3_XPOS:    760,
    PLAYER1_TABLE_SECTION4_XPOS:    830,
    PLAYER1_TABLE_SECTION5_XPOS:    900,
    PLAYER1_TABLE_SECTION6_XPOS:    970,
    PLAYER1_TABLE_SECTION7_XPOS:    1040,
    PLAYER1_TABLE_SECTION8_XPOS:    1110,
    PLAYER1_TABLE_SECTION9_XPOS:    1180,
    PLAYER1_TABLE_SECTION10_XPOS:   1250,

    PLAYER1_TABLE_SECTION1_YPOS:    450,
    PLAYER1_TABLE_SECTION2_YPOS:    550,
    PLAYER1_TABLE_SECTION3_YPOS:    650,

    PLAYER1_CARDS_IN_HAND_YPOS:     760,
    PLAYER1_CARDS_IN_HAND1_XPOS:    430,
    PLAYER1_CARDS_IN_HAND2_XPOS:    505,
    PLAYER1_CARDS_IN_HAND3_XPOS:    580,
    PLAYER1_CARDS_IN_HAND4_XPOS:    655,
    PLAYER1_CARDS_IN_HAND5_XPOS:    730,
    PLAYER1_CARDS_IN_HAND6_XPOS:    805,
    PLAYER1_CARDS_IN_HAND7_XPOS:    880,
    PLAYER1_CARDS_IN_HAND8_XPOS:    955,
    PLAYER1_CARDS_IN_HAND9_XPOS:    1030,
    PLAYER1_CARDS_IN_HAND10_XPOS:   1105,
    PLAYER1_CARDS_IN_HAND11_XPOS:   1180,
    PLAYER1_CARDS_IN_HAND12_XPOS:   1255,

    PLAYER1_DECK_XPOS:              1345,
    PLAYER1_DECK_YPOS:              20,
    
    PLAYER1_DISSCARD_XPOS:          120,
    PLAYER1_DISSCARD_YPOS:          60,
}

const Player2_map_pos = {
    PLAYER2_BUFF1_XPOS:             500,
    PLAYER2_BUFF1_YPOS:             330,

    PLAYER2_BUFF2_XPOS:             500,
    PLAYER2_BUFF2_YPOS:             230,

    PLAYER2_BUFF3_XPOS:             500,
    PLAYER2_BUFF3_YPOS:             130,

    PLAYER2_TABLE_SECTION1_XPOS:    620,
    PLAYER2_TABLE_SECTION2_XPOS:    690,
    PLAYER2_TABLE_SECTION3_XPOS:    760,
    PLAYER2_TABLE_SECTION4_XPOS:    830,
    PLAYER2_TABLE_SECTION5_XPOS:    900,
    PLAYER2_TABLE_SECTION6_XPOS:    970,
    PLAYER2_TABLE_SECTION7_XPOS:    1040,
    PLAYER2_TABLE_SECTION8_XPOS:    1110,
    PLAYER2_TABLE_SECTION9_XPOS:    1180,
    PLAYER2_TABLE_SECTION10_XPOS:   1250,

    PLAYER2_TABLE_SECTION1_YPOS:    330,
    PLAYER2_TABLE_SECTION2_YPOS:    230,
    PLAYER2_TABLE_SECTION3_YPOS:    130,

    PLAYER2_CARDS_IN_HAND_YPOS:     20,
    PLAYER2_CARDS_IN_HAND1_XPOS:    430,
    PLAYER2_CARDS_IN_HAND2_XPOS:    505,
    PLAYER2_CARDS_IN_HAND3_XPOS:    580,
    PLAYER2_CARDS_IN_HAND4_XPOS:    655,
    PLAYER2_CARDS_IN_HAND5_XPOS:    730,
    PLAYER2_CARDS_IN_HAND6_XPOS:    805,
    PLAYER2_CARDS_IN_HAND7_XPOS:    880,
    PLAYER2_CARDS_IN_HAND8_XPOS:    955,
    PLAYER2_CARDS_IN_HAND9_XPOS:    1030,
    PLAYER2_CARDS_IN_HAND10_XPOS:   1105,
    PLAYER2_CARDS_IN_HAND11_XPOS:   1180,
    PLAYER2_CARDS_IN_HAND12_XPOS:   1255,

    PLAYER2_DECK_XPOS:              1345,
    PLAYER2_DECK_YPOS:              750,

    PLAYER2_DISSCARD_XPOS:          120,
    PLAYER2_DISSCARD_YPOS:          750,
}

//Player Turn
const Turn ={
    NO_TURN:    0,
    PLAYER1:    1,
    PLAYER2:    2,

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
    CARD_SIZE,
    CardSlotsQuantity,
    Common_map_pos,
    Player1_map_pos,
    Player2_map_pos, 
    Turn,
}

