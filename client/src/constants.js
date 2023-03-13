
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
    DECK:       3
    }

const CardCategory ={
    UNIT:           0,
    INSTAEFFECT:    1,
    PERMAEFFECT:    2,
    CLIMATE:        3,
    TOKEN:          4    
}


export{
    State,
    Languages,
    CardState,
    CardCategory
}
