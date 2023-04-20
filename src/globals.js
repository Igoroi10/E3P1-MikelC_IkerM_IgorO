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

    //Array de Cartas
    cards: [],

    action: {},

    //Objeto que guarda las coordenadas del ratón (contiene las coords x e y)
    mouse: {}, 

    txtPruebas: {},
    
    fakeCardInfo: [],

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

    fakeUsersArray: ['Iker Mendoza', 'Mikel Cruz', 'Igor Ocon', 'Asier Nogueria', 'Esther', 'Zarate'],



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
    draw: false,
    double_click: false,
    click: false,
    selected: false,
    DISCARD: false,
    otherSelected: false,
    decoy: false,
    medic: false,
    inmediateEffect: false,
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
}