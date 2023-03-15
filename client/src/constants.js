
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

const Languages = {

    EUSKERA:    0,
    ENGLISH:    1,
}

const CardState = {
    DISSCARD:   0,
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


export{
    State,
    Languages,
    CardState,
    CardCategory,
    CardQuantity,
    CardDisplaySize,
    GameMode,
    Rarity
}
