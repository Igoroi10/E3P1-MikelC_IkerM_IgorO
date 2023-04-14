
const State = {

    LOADING:        0,
    LOG_IN:         1,
    ADMIN_MENU:     2,
    PLAYER_MENU:    3,
    LOAD_GAME:      4,
    PLAYING:        5,
    STATS:          6,
    ROUND_END:      7,
    GAME_END:       8, 
    GAME_START:     9,
    
}  

const FPS = 30;

const Languages = {

    EUSKERA:    0,
    ENGLISH:    1,
}

const CardState = {

    DISCARD:        0,
    HAND:           1,  
    GAME:           2,
    DECK:           3,
    SELECTED:       4,
    DOUBLE_CLICK:   5,
    HOVER:          6,


}

const GameStates = {

    INITIAL:                0,

    PLAYER_0_TURN:          1,
    PLAYER_0_SELECTED_CARD: 2,
    PLAYER_0_PLACE_CARD:    3,
    PLAYER_0_DECOY:         4,
    PLAYER_0_PASSED:        5,

    PLAYER_1_TURN:          6,
    PLAYER_1_SELECTED_CARD: 7,
    PLAYER_1_PLACE_CARD:    8,
    PLAYER_1_DECOY:         9,
    PLAYER_1_PASSED:        10,

    ROUND_END:              11,

    PLAYER_0_WON_ROUND:     12,
    PLAYER_1_WON_ROUND:     13,
}


const CardDisplaySize = {

    SMALL:  0,
    FULL:   1,

}

const CardCategory = {

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
    SCORCH_INMUNE:      "12",
    SCORCH:             "7",
    COMMANDERS_HORN:    "5",
    DECOY:              "6",
    
    //WEATHER 
    BITTING_FROST:      "8",
    CLEAR_WEATHER:      "9",
    IMPENETRABLE_FOG:   "10",
    TORRENTIAL_RAIN:    "11",
    
    //UNIT HABILITY
    MEDIC:              "0",
    MORALE_BOOST:       "1",
    MUSTER:             "2",
    SPY:                "3",
    TIGHT_BOND:         "4",
    
}

const Type ={

    PHYSICAL:       "1",
    DISTANCE:       "2",
    SIEGE:          "3",

}

const Key = {

    ENTER:      13,     // Tecla Enter
    DECK:       68,     // Tecla D
    CARD:       67,     // Tecla C
    EXAMINE:    69,     // Tecla E    
}

const Card_img_quantity = {
    
    UNIT_CARD:          37,
    EFFECT_CARDS:       49,
    VALUE_CARDS:        60,
    CATEGORY_CARDS:     63,
    TYPE_CARDS:         66,
    FRAME_CARDS:        69,
    REVERSE_CARDS:      70,

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

}

const CARD_SIZE = 150;


const CardSlotsQuantity = {

    HAND:       12,
    FIELD:      8,
    DECK:       1,
    DISCARD:    1,
     
}

const SlotIdentificators = {
    //Player 1 Buffs

    PLAYER1_B1 :    0,
    PLAYER1_B2:     1,
    PLAYER1_B3:     2,
    
    //Player 2 Buffs:

    PLAYER0_B1:     3,
    PLAYER0_B2:     4,
    PLAYER0_B3:     5,

    //Player 1 Field:
    PLAYER1_F1:     6,
    PLAYER1_F2:     7,
    PLAYER1_F3:     8,

    //Player 2 Field:
    PLAYER0_F1:     9,
    PLAYER0_F2:     10,
    PLAYER0_F3:     11,

    //Climate control

    CLIMATE_FIELD:  12, 


    PLAYER1_HAND:   13,
    PLAYER1_DECK:   14,
    
    PLAYER0_HAND:   15,
    PLAYER0_DECK:   16,

}

const Common_map_pos = {

    PLAYER0_CARD_XPOS:      120,
    PLAYER0_CARD_YPOS:      60,

    CLIMATE_BOX_1_XPOS:     60,
    CLIMATE_BOX_2_XPOS:     200,
    CLIMATE_BOX_YPOS:       390,

    PLAYER1_CARD_XPOS:      120,
    PLAYER1_CARD_YPOS:      750,

    PLAYER1_LIVE1_XPOS:     205,
    PLAYER1_LIVE2_XPOS:     295,
    PLAYER1_LIVE_YPOS:      670,
    PLAYER1_TURN_TOKEN_XPOS: 15,
    PLAYER1_TURN_TOKEN_YPOS: 620,
    
    PLAYER0_LIVE1_XPOS:     205,
    PLAYER0_LIVE2_XPOS:     295,
    PLAYER0_LIVE1_YPOS:     230,
    PLAYER0_TURN_TOKEN_XPOS: 15,
    PLAYER0_TURN_TOKEN_YPOS: 190,
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
    
    PLAYER1_DISCARD_XPOS:          120,
    PLAYER1_DISCARD_YPOS:          60,

}

const Player0_map_pos = {


    PLAYER0_BUFF1_XPOS:             500,
    PLAYER0_BUFF1_YPOS:             330,

    PLAYER0_BUFF2_XPOS:             500,
    PLAYER0_BUFF2_YPOS:             230,

    PLAYER0_BUFF3_XPOS:             500,
    PLAYER0_BUFF3_YPOS:             130,

    PLAYER0_TABLE_SECTION1_XPOS:    620,
    PLAYER0_TABLE_SECTION2_XPOS:    690,
    PLAYER0_TABLE_SECTION3_XPOS:    760,
    PLAYER0_TABLE_SECTION4_XPOS:    830,
    PLAYER0_TABLE_SECTION5_XPOS:    900,
    PLAYER0_TABLE_SECTION6_XPOS:    970,
    PLAYER0_TABLE_SECTION7_XPOS:    1040,
    PLAYER0_TABLE_SECTION8_XPOS:    1110,
    PLAYER0_TABLE_SECTION9_XPOS:    1180,
    PLAYER0_TABLE_SECTION10_XPOS:   1250,

    PLAYER0_TABLE_SECTION1_YPOS:    330,
    PLAYER0_TABLE_SECTION2_YPOS:    230,
    PLAYER0_TABLE_SECTION3_YPOS:    130,

    PLAYER0_CARDS_IN_HAND_YPOS:     20,
    PLAYER0_CARDS_IN_HAND1_XPOS:    430,
    PLAYER0_CARDS_IN_HAND2_XPOS:    505,
    PLAYER0_CARDS_IN_HAND3_XPOS:    580,
    PLAYER0_CARDS_IN_HAND4_XPOS:    655,
    PLAYER0_CARDS_IN_HAND5_XPOS:    730,
    PLAYER0_CARDS_IN_HAND6_XPOS:    805,
    PLAYER0_CARDS_IN_HAND7_XPOS:    880,
    PLAYER0_CARDS_IN_HAND8_XPOS:    955,
    PLAYER0_CARDS_IN_HAND9_XPOS:    1030,
    PLAYER0_CARDS_IN_HAND10_XPOS:   1105,
    PLAYER0_CARDS_IN_HAND11_XPOS:   1180,
    PLAYER0_CARDS_IN_HAND12_XPOS:   1255,

    PLAYER0_DECK_XPOS:              1345,
    PLAYER0_DECK_YPOS:              750,

    PLAYER0_DISCARD_XPOS:          120,
    PLAYER0_DISCARD_YPOS:          750,

}

//Player Turn
const Turn ={
    PLAYER1:    0,
    PLAYER2:    1,
    NO_TURN:    2,

}

export{

    State,
    Languages,
    CardState,
    GameStates,
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
    Player0_map_pos,
    SlotIdentificators,
    Turn,
}