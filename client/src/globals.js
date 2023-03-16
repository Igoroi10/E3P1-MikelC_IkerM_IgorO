//Inicializamos el Array de cartas
import{State} from "./constants.js";

export default
{
    //Acceso al canvas y context
    canvas: {},
    ctx:{},

    //Estado de juego. inicializamos a INVALIDO
    gameState: State.PLAYING,

    //Tiempo de ciclo anterior
    previousCycleMilliseconds: -1,

    //Tiempo de ciclo de juego real
    deltaTime: 0,

    //Tiempo de ciclo objetivo
    frameTimeObj: 0,

    //Boton de inicio
    buttonStart: {},

    //Array de Cartas
    cards: [],

    action: {},

    //Objeto que guarda las coordenadas del ratón (contiene las coords x e y)
    mouse: {}, 

    txtPruebas: {},
    
    fakeCardInfo: [],

    tokens:[],

    //Array de assets que guarda Datos de imagen
    tileSets: {
        front_img:         [],
        card_frame:         [],
        card_reverse:       [],
        card_type:          [],
        card_category:      [],
        card_effect:        [],
        card_value:         [],
    },

    //Carga de los Assets
    assetsToLoad: [],
    assetsLoaded: 0,

}