//Inicializamos el Array de cartas
import{State, Turn} from "./constants.js";

export default
{
    //Acceso al canvas y context
    canvas: {},
    ctx:{},

    //Estado de juego. inicializamos a INVALIDO
    gameState: State.LOADING,

    //Tiempo de ciclo anterior
    previousCycleMilliseconds: -1,

    //Tiempo de ciclo de juego real
    deltaTime: 0,

    //Tiempo de ciclo objetivo
    frameTimeObj: 0,

    //Boton de inicio
    buttonStart: {},

    buttonAdmin: {},

    buttonPlayer: {},

    buttonTurn: {},

    buttonRound: {},

    buttonLogout: {},

    buttonMode: {},

    buttonEnglish: {},

    buttonEuskera: {},

    buttonEditUser: {},

    buttonDeleteUser: {},

    buttonEditCard: {},

    buttonDeleteCard: {},

    buttonPlayerEdit:   {},

    buttonAdmin:    {},
    //Array de Cartas
    cards: [],

    action: {},

    //Objeto que guarda las coordenadas del ratón (contiene las coords x e y)
    mouse: {}, 

    txtPruebas: {},
    

    cardInfo: [],

    img_url: [],

    tokens:[],

    all_users: [],

    hostPlayerInfo: [],

    //Array de assets que guarda Datos de imagen
    assets: {
        front_img:          [],     // Imagen de la carta
        card_frame:         [],     // Marco de la carta
        card_reverse:       [],     // Reverso de la carta
        card_type:          [],     // Tipo de Carta - Zelai 1, 2 o 3
        card_category:      [],     // Categoria de la carta - Permanente, Inmediato o Clima
        card_effect:        [],     // Effecto de la carta - Scorch, spy...
        card_value:         [],     // Valor de la carta - 0, 1, 3... 10
    },




    //Array para los slots de mesa
    tableSlots:{
        player1:    [],
        player2:    [],
        common:      [],
    },




    //rutas de imagenes
    images_routesLinks: [],

    //Carga de los Assets
    assetsToLoad: [],
    assetsLoaded: 0,

    //Ascii Code para eventos del teclado
    asciiCode: -1,

    //Checks de los get
    get_checks: 0,
    
    mouseHasCollidedWithTheCard: false,
    //Array donde se almacenaran los slots / huevos donde se pondran las cartas
    slots: [],


    // ====================
    //      LOGIN
    // ====================

    btnLogin:       {},
    btnLogout:      {},

    inputEmail:     {},
    inputPassword:  {},
    
    lblSessionUser: {}, 
    lblError:       {},
    sectionLogIn:   {},
    sectionPlay:    {},

    bigCard:       -1,




    // Recoger puntuación de los jugadores:

    player1Points : 0,
    player2Points : 0,

    player1PointTokens : {
        hundredsToken:  [],
        tensToken:      [],
        unitsToken:     [],
    },

    player2PointTokens : {
        hundredsToken:  [],
        tensToken:      [],
        unitsToken:     [],
    },


    //Turnos
    turnState:                  Turn.PLAYER1,           //Comienza el jugador Uno siempre - Al menos ahora
    checkRoundPlayer1:          false,                  //Inicializamos en falso = puede jugar el turno.
    checkRoundPlayer2:          false,                  //Inicializamos en falso = Puede jugar el turno.
    checkBothPlayerRound:       false,                  //Inicializamos en false = Ninguno de los dos a pasado la ronda.

    //Enemigo seleccionado de la lista de enemigos
    selectedEnemy: "",

    selectedCardId: -1,
    selectedCardId_Click: -1,
    selectedSlotId: -1,

    actionsCounter: 0,

    //Card States
    draw:           false,
    double_click:   false,
    click:          false,
    selected:       false,
    DISCARD:        false,
    otherSelected:  false,
    decoy:          false,
    medic:          false,
    inmediateEffect:false,
    effectFinished: false,

    player: [[],[]],

    playerTokens: [[],[]],

    mouseSelectedCard: false,
    mouseSelectedSlot: false,

    placedCard: false,

    roundWinner: "",
    winner: "",
    checkIfLives0: false,
    
    //Acciones para el cambio automatico de turno
    Player1TwoActions: false,
    Player2TwoActions: false,

    checkPlaced: false,

    player1LivesDeleted: 0,
    player2LivesDeleted: 0,

    gameMode: -1,

    levelTime: {},

    timerActivate: false,

    decoyAvailable: false,

    //Inicializamos el render de la carta Grande a false
    bigRender: false,

    showTurnChangeScreen: false,

    

   
    
    lenguageSelected: 0,

    btnBack: {},
    btnBack_register: {},
    //Formulario EditUser

    newRolaEdit:                    "",
    inputEmailaEdit:                "",
    newEmailaEdit:                  {},
    newIzenAbizenaEdit:             {},

    //Formulario DeleteCard         
    inputCardCode:                  "",

    //Formulario Forgot
    sectionForgotPassword:          {},

    inputEmail_Forgot:              {},
    inputPassword_Forgot:           {},
    inputConfirmPassword_Forgot:    {},
    submit_forget:                  {},
    
    //Formulario Register
    sectionRegister:                {},

    inputNameSurname_Register:      {},
    inputEmail_Register:            {},
    inputPassword_Register:         {}, 
    inputConfirmPassword_Register:  {},
    submit_register:                {},

    previousPoints1: 0,
    previousPoints2: 0,
    earnedPlayer1Points: 0,
    earnedPlayer2Points: 0,
    calculateNewPoints: false,
    renderAlpha: 1,
    renderTurnAlpha: 1,
    currentSelectedCardId: -1,
    checkIfPlayer0TurnPass: false,
    checkIfPlayer1TurnPass: false,

    //Formulario DeleteUser
    inputEmail_Delete:              "",

    //Controls
    controls:                       {},
    controlsEUS:                    {},
    controlsEN:                     {},
    btnCloseControlsEUS:            {},
    btnCloseControlsEN:             {},
    btnControls:                    {},

    //Round
    btnConfirmRound:                {},
    btnDenyRound:                   {},
    checkIfRoundConfirm:            false,      //Confirma si se le ha dado o no al boton.

    //Botones de Deck control
    btn_add_deck:                   {},                      
    btn_remove_deck:                {},                         
    btn_edit_deck:                  {},


    //Botones de Player control
    btn_add_player:                 {},
    btn_remove_player:              {},
    btn_edit_player:                {},


    //Botones de Edit de Player - Admin Page
    btn_back_EditAdmin:             {},
    btn_submit_EditAdmin:           {},

    //Boton add User de la Admin Page
    btn_addUser:                    {},
    FromAddUser:                    false,

    //Sonidos
    sounds:                         [],
    currentSound:                   -1,

    //Boton de reseteo
    btnReset:                       {},

    winnerKod:                      -1,
    enemyKod:                       -1,
    hostKod:                        -1,
    roundWinnerKod:                 [],
    roundWinnerPoints:              [],
    roundLoserPoints:               [],
}