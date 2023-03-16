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
        front_img:          [],     // Imagen de la carta
        card_frame:         [],     // Marco de la carta
        card_reverse:       [],     // Reverso de la carta
        card_type:          [],     // Tipo de Carta - Zelai 1, 2 o 3
        card_category:      [],     // Categoria de la carta - Permanente, Inmediato o Clima
        card_effect:        [],     // Effecto de la carta - Scorch, spy...
        card_value:         [],     // Valor de la carta - 0, 1, 3... 10
    },

    //Carga de los Assets
    assetsToLoad: [],
    assetsLoaded: 0,

}