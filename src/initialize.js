
import {btnStartDown, btnStartOver, btnStartOut, btnStartAdmin, btnStartPlayer, btnStartTurn,canvasRightMouseupHandler, canvasMousedownHandler, canvasMousemoveHandler, canvasMouseupHandler, canvasRightMousedownHandler, keydownHandler, keyupHandler, btnEndRound, btnLogOut, createList, selectEnemy, btnNormalMode, btnForgotPassword, btnRegister, btnEnglishMode, btnEuskeraMode, btnBack, btnSubmitForget, btnSubmitRegister} from "./events.js";
import globals from "./globals.js";
import {  State, Languages, CardState, CardCategory, Rarity, Effect, Type, CardQuantity, CardSizes, GameMode, FPS, Card_img_quantity} from "./constants.js";
import render from "./gameRender.js";
import {Card, UnitCard, SuddenCard, PermaCard, ClimateCard} from "./Card.js";
import { GameZones } from "./GameZones.js";
import { Assets } from "./Assets.js";
import ImageSet from "./ImageSet.js";
import { Player0_map_pos, Player1_map_pos, Common_map_pos, SlotIdentificators } from "./constants.js";
import { checkStates, localStorageUpdate } from "./gameLogic.js";
import Time from "./Timer.js";


function initHTMLelements()
{
    //Falta crear la global
    globals.buttonStart     = document.getElementById('btnStart');
    globals.buttonAdmin     = document.getElementById('btnAdmin');
    globals.buttonPlayer    = document.getElementById('btnPlayer');
    globals.buttonAdd       = document.getElementById('btnAdd');
    globals.buttonTurn      = document.getElementById('btnTurn');
    globals.buttonRound     = document.getElementById('btnRound');
    globals.buttonLogout    = document.getElementsByClassName('btnLogout');
    globals.buttonMode      = document.getElementById('btnNormal');
    globals.buttonEnglish   = document.getElementById('btnEnglish');
    globals.buttonEuskera   = document.getElementById('btnEuskera');

    //Get A reference to the canvas 
    globals.canvas = document.getElementById('gameScreen');

    document.getElementById('divCanvas').style.display = "none";

    //Context
    globals.ctx = globals.canvas.getContext('2d');

    //Inicializamos listeners
    // globals.buttonStart.addEventListener("mousedown",       btnStartDown,       false);
    globals.buttonStart.addEventListener("mouseover",       btnStartOver,       false);
    globals.buttonStart.addEventListener("mouseout",        btnStartOut,        false);
    // globals.buttonAdmin.addEventListener("mousedown",       btnStartAdmin,      false);
    // globals.buttonPlayer.addEventListener("mousedown",      btnStartPlayer,     false);
    globals.buttonTurn.addEventListener("mousedown",        btnStartTurn,       false);
    globals.buttonRound.addEventListener("mousedown",       btnEndRound,        false);
    globals.buttonMode.addEventListener("mousedown",       btnNormalMode,        false);
        for(let i = 0; i < globals.buttonLogout.length; i++)
        {
            globals.buttonLogout[i].addEventListener("mousedown",      btnLogOut,          false);
        }
    globals.buttonEnglish.addEventListener("mousedown", btnEnglishMode, false);
    globals.buttonEuskera.addEventListener("mousedown", btnEuskeraMode, false);


    // globals.buttonAdd.addEventListener("mousedown", btnAddDown, false);

    


    //Elementos
    globals.btnLogin                = document.getElementById('btnLogin'); 
    globals.inputEmail              = document.getElementById('Emaila');
    globals.inputPassword           = document.getElementById('Password');
    globals.btnBack                 = document.getElementById('btnBack');
    globals.btnBack_register        = document.getElementById('btnBack_register');
    globals.lblSessionUser          = document.getElementById('lblSessionUser');
    globals.lblError                = document.getElementById('lblError');
    globals.sectionLogIn            = document.getElementById('sectionLogIn');
    globals.sectionPlay             = document.getElementById('sectionPlay');
    
    

    //Formulario Forget
    globals.sectionForgotPassword   = document.getElementById('forgetbtn');

    globals.inputEmail_Forgot                   = document.getElementById('Emaila_Forgot');
    globals.inputPassword_Forgot                = document.getElementById('Password_Forgot');
    globals.inputConfirmPassword_Forgot         = document.getElementById('Confirm_Password_Forgot');
    globals.submit_forget                       = document.getElementById('btnLogin_forgot');
    
    //Formulario Register
    globals.sectionRegister         = document.getElementById('btnregister');

    globals.inputNameSurname_Register               = document.getElementById('name_surname');
    globals.inputEmail_Register                     = document.getElementById('Emaila_Register');
    globals.inputPassword_Register                  = document.getElementById('Password_Register');
    globals.inputConfirmPassword_Register           = document.getElementById('Confirm_Password_Register');
    globals.submit_register                         = document.getElementById('btnLogin_Register');


    //Mostramos la pantalla de Log In
    document.getElementById('sectionLogIn').style.display = "flex";
    document.getElementById('sectionPlay').style.display = "none";
    // globals.sectionLogIn.style.display  = "block";
    // globals.sectionPlay.style.display   = "none";

    globals.btnLogin.addEventListener("mousedown", logInHandler, false);
    globals.sectionForgotPassword.addEventListener("mousedown", btnForgotPassword, false);
    globals.sectionRegister.addEventListener("mousedown", btnRegister, false);

    globals.btnBack.addEventListener("mousedown", btnBack, false);
    globals.btnBack_register.addEventListener("mousedown", btnBack, false);

    globals.submit_forget.addEventListener("mousedown", btnSubmitForget, false);
    // globals.sectionRegister.addEventListener("mousedown", btnSubmitRegister, false);
    
    // globals.sectionForgotPassword = 
    // globals.sectionRegister = 
    

    
}

export function initGame(data)
{
    //Creamos las cartas
    createCards(data);

    //Dibuja las cartas
    render();
}




function initVars()
{
    //Inicializamos las variables de gestión de tiempo
    globals.previousCycleMilliseconds = 0;
    globals.deltaTime = 0;
    globals.frameTimeObj = 1 / FPS; //Frame time in seconds

    //Inicializamos el estado del juego
    globals.gameState = State.LOADING;

    //Inicializamos los estados de las acciones
    globals.action = {
        mousePressed: false,
        doubleClick: false,
    };

    //Inicializamos el objeto mouse
    globals.mouse = {
        x: -1,
        y: -1
    }
}

function initEvents()
{

    //Add the keyboard event listeners
    window.addEventListener("keydown", keydownHandler, false);
    window.addEventListener("keyup", keyupHandler, false);

    //Add the event listeners
    // globals.canvas.addEventListener("mouseup",   canvasMouseupHandler, false);
    // globals.canvas.addEventListener("mousedown", canvasMousedownHandler, false);
    globals.canvas.addEventListener("mousemove", canvasMousemoveHandler, false);

    //EVITAR QUE SALGA EL MENU DEL NAVEGADOR
    let b = document.getElementsByClassName('container')[0];
    let contextmenu = document.querySelector('.container');
    b.oncontextmenu = (evt)=>{
        evt.preventDefault(); 
        contextmenu.style.display = 'block';
    }

    //FUNCION QUE DETECTA QUE CLICK SE UTILIZA 
    let button = document.querySelector('canvas');
    button.addEventListener("mousedown", (e) => {
    switch (e.button) 
    {
        case 0:
            // console.log("Entra en caso left Button");
            // globals.action.mousePressed = true;
            canvasMousedownHandler();
            // log.textContent = "Left button clicked.";
        break;

        case 1:
            // console.log("Entra en caso middle Button");
            // log.textContent = "Middle button clicked.";
        break;

        case 2:
            // console.log("Entra en caso right Button");
            canvasRightMousedownHandler();
            // log.textContent = "Right button clicked.";
        break;

        default:
            // console.log("no se pulsa ninguno / No se detecta el boton pulsado")
        // log.textContent = `Unknown button code: ${e.button}`;
    }
    
    });

    //FUNCION UP DE DETECTAR EL CICK
    let Button = document.querySelector('canvas');
    Button.addEventListener("mouseup", (e) => {
    switch (e.button) 
    {
        case 0:
            // console.log("Sale en caso left Button");
            // globals.action.mousePressed = true;
            canvasMouseupHandler();
            // log.textContent = "Left button clicked.";
        break;

        case 1:
            // console.log("sale en caso middle Button");
            // log.textContent = "Middle button clicked.";
        break;

        case 2:
            // console.log("Sale en caso right Button");
            canvasRightMouseupHandler();
            // log.textContent = "Right button clicked.";
        break;

        default:
            // console.log("no se pulsa ninguno / No se detecta el boton pulsado")
        // log.textContent = `Unknown button code: ${e.button}`;
    }
    
    });
   
}

//===========================================
//                  ASSETS
//===========================================

function loadAssets()
{
    // console.log("entra en loadAssets");

    loadCardImages();

//  gameState = STATE.PLAYING;   
}

function loadCardImages(){

    // console.log("entra en load card images");

    for (let i = 0; i < globals.img_url.length; i++)
    {
        

        let cardImg;

        const url ="."+globals.img_url[i].URL;

        if (i < Card_img_quantity.UNIT_CARD )
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.front_img.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else if (i < Card_img_quantity.EFFECT_CARDS)
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_effect.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else if (i < Card_img_quantity.VALUE_CARDS)
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_value.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else if (i < Card_img_quantity.CATEGORY_CARDS)
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_category.push(cardImg)
            globals.assetsToLoad.push(cardImg);

        }
        else if (i < Card_img_quantity.TYPE_CARDS)
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_type.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else if ( i < Card_img_quantity.FRAME_CARDS)
        {   
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_frame.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }
        else
        {
            cardImg = new Image();
            cardImg.addEventListener("load", loadHandler, false);
            cardImg.src = url;
            globals.assets.card_reverse.push(cardImg);
            globals.assetsToLoad.push(cardImg);

        }

        console.log("fin de carga de imagenes");
    }


}



function loadHandler()
{
    
    globals.assetsLoaded++; 
    // console.log ("Assets loaded: " + globals.assetsLoaded);
    // console.log ("Assets to load: " + globals.assetsToLoad.length);

    
    //Una vez se han cargado todos los activos pasamos
    if(globals.assetsLoaded === globals.assetsToLoad.length)
    {
        //remove the load event listener
        for (let i = 0; i < globals.assets.front_img.length; i++)
        {
            globals.assets.front_img[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_frame.length; i++)
        {
            globals.assets.card_frame[i].removeEventListener("load", loadHandler, false);
        }

        
        for (let i = 0; i < globals.assets.card_reverse.length; i++)
        {
            globals.assets.card_reverse[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_category.length; i++)
        {
            globals.assets.card_category[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_type.length; i++)
        {
            globals.assets.card_type[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_effect.length; i++)
        {
            globals.assets.card_effect[i].removeEventListener("load", loadHandler, false);
        }

        for (let i = 0; i < globals.assets.card_value.length; i++)
        {
            globals.assets.card_value[i].removeEventListener("load", loadHandler, false);
        }


        // console.log("Assets finished loading");

        globals.gameState = State.PLAYING;
        // console.log(globals.gameState);


    }
}
// ===========================================================
//                          P O S T
// ===========================================================
function logInHandler(event)
{
    // console.log("Send Button Pressed");

    const objectToSend = {
        emaila: globals.inputEmail.value,
        pasahitza: globals.inputPassword.value
    }
    
    const dataToSend = 'emaila=' + objectToSend.emaila + '&pasahitza=' + objectToSend.pasahitza;

    console.log(dataToSend);

    //Ruta relativa al fichero que hace la petición (verifyUser.php)
    const url = "../server/routes/verifyUser.php";
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function()
    {
        if (this.readyState == 4)
        {
            if(this.status == 200)
            {
                if(this.responseText != null)
                {
                    // console.log(this.responseText);
                    const userData = JSON.parse(this.responseText);

                    //Guardado Global
                    globals.hostPlayerInfo = userData;

                    // console.log(globals.hostPlayerInfo.emaila);
                    manageLogin(userData);
                }
                else
                    alert("Comunication error: No data received");
            }
            else
                alert( "Comunication error: " + this.statusText);
        }
    }

    request.responseType = "text";
    request.send(dataToSend);
    console.log("datatoSend2:  " + dataToSend)

}

function manageLogin(userData)
{
console.log("entra en el funcion manageLogin");
    // console.log("entra en manage");
    // console.log("email..." + userData.email + "...");
    // console.log("password..." + userData.password + "...");

    if (userData.emaila !== "")
    {
        if(userData === undefined)
        {
            globals.lblError.innerHTML = "The username or password are incorrect. Please try again.";
            globals.inputEmail.value = "";
            globals.inputPassword.value = "";
        }

        else{
            if(userData.rol === "admin"){
                globals.gameState = State.ADMIN_MENU;
                localStorageUpdate();
                checkStates();
    
            }
    
            else{
                globals.gameState = State.PLAYER_MENU;
                localStorageUpdate();
                checkStates();
                // console.log("entra en el else");
            }
            //Usuario logueado
    
            console.log(localStorage.getItem("izen_abizena"));
            createList();
    
            //ACtivamos el menú de play y ocultamos el de logIn
            // document.getElementById('sectionLogIn').style.display = "none";
            // document.getElementById('playerMenuScreen').style.display = "block";
            // globals.sectionLogIn.style.display  = "none";
            // globals.sectionPlay.style.display   = "block";
    
            //No hay mesajes de eror
            lblError.innerHTML = "";
        }
    }

    else
    {
        // console.log("entra en reseteo a login")
        // console.log("entra else");
        // console.log("entra error data");
        globals.gameState = State.LOG_IN;
        //Mostramos el mensaje de error
        globals.lblError.innerHTML = "The username or password are incorrect. Please try again.";
        globals.inputEmail.value = "";
        globals.inputPassword.value = "";
        
        checkStates();
    }

    //Pintamos el texto logIN
    updateUserText(userData);
    
    selectEnemy();
    console.log("Fin de funcion")
}

// ===========================================================
//                    P O S T  d e  F O R G O T
// ===========================================================
function postForgotPasswordData(event)
{
    console.log("Entra en postForgotPasswordData");

    checkPassword();

    const objectToSend = {
        emaila: globals.inputEmail_Forgot.value,
        pasahitza: globals.inputPassword_Forgot.value
    }
    
    const dataToSend = 'emaila=' + objectToSend.emaila + '&pasahitza=' + objectToSend.pasahitza;

    console.log(dataToSend);

    //Ruta relativa al fichero que hace la petición (verifyUser.php)
    const url = "../server/routes/postNewPassword.php";
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.onreadystatechange = function()
    {
        if (this.readyState == 4)
        {
            if(this.status == 200)
            {
                if(this.responseText != null)
                {
                    console.log(this.responseText);
                    const userData = JSON.parse(this.responseText);

                    //Guardado Global
                    globals.hostPlayerInfo = userData;

                    manageForgot(userData);
                }
                else
                    alert("Comunication error: No data received");
            }
            else
                alert( "Comunication error: " + this.statusText);
        }
    }

    request.responseType = "text";
    request.send(dataToSend);

}

function checkPassword()
{
    if (globals.inputPassword_Forgot.value !== globals.inputConfirmPassword_Forgot.value )
    {
        console.log("entr en el if de checkPassword")
        globals.inputPassword_Forgot.value = null;
    }
    else
        console.log("contraseña correcta");
}

function manageForgot(userData)
{
    console.log("entra en el funcion manageForgot");
    if (userData.emaila !== "")
    {
        if(userData === undefined || userData.pasahitza === null)
        {
            console.log("entra en undefined o null");
            globals.lblError.innerHTML = "The Email or Password are not correct";
            globals.inputEmail_Forgot.value = "";
            globals.inputPassword_Forgot.value = "";
            globals.inputConfirmPassword_Forgot.value = "";
        }

        else
            lblError.innerHTML = "";
    }

    else
    {
        console.log("entra en el primer else de la funcion manageForgot")
        //Mostrar mensaje de todo ok


        localStorageUpdate();
        checkStates();
        
    }
}


function updateUserText(user)
{
    // console.log(user.error);
    if (user.emaila !== "" && user.pasahitza !== "")
    {
        // globals.lblSessionUser.innerHTML = "Logged in as: " + user.emaila + " " + user.pasahitza;
        globals.lblSessionUser.innerHTML = "Logged in as: " + user.emaila;
    }

    else
    {
        globals.lblSessionUser.innerHTML = "";
    }

}


function createNormalDeck(){
    console.log(globals.cards);
    let cardsNeeded = 65;
    const normalMode = GameMode.NORMAL_MODE;
    addZarate();
    addDecoy();
    AddTokenCard();
    addPermaCards(normalMode);
    addInstaCards(normalMode);

    cardsNeeded -= globals.cards.length;

    addUnitCards(cardsNeeded,normalMode);
    filterExtraCards(normalMode);
    globals.cards.splice(60);
    console.log("Array de información");
    console.log(globals.cardInfo);
    console.log("Cartas generadas con ello");
    console.log(globals.cards);
}


function createExpertDeck(){

    let cardsNeeded = 85;
    const expertMode = GameMode.EXPERT_MODE;
    addOneOfEach();
    addZarate();
    addDecoy();
    addPermaCards(expertMode);
    addInstaCards(expertMode);
    addClimateCards();
    AddTokenCard();

    // console.log("cards.length after addOneEach: " + globals.cards.length);

    cardsNeeded -= globals.cards.length;
    // console.log("cardsNeeded after addOneOfEach: " + cardsNeeded);

    //Comentada Funcion - DA ERROR 
    addUnitCards(cardsNeeded);
    globals.cards.splice(80);

}

function addOneOfEach(){
 
    for(let i = 0; i < globals.cardInfo.length; i++){
        if(globals.cardInfo[i].izena !== "Decoy" || globals.cardInfo[i].izena !== "Zarate")
                insertCard(i);
    }
    // console.log("fin de addOneEach");
}

function insertCard(i){

    //FUncion de imageSet que tengan la anchura y altura carta grande - La paso a loadCardImages 
    //CardSize();
    //Toquens medida Especial
    // Generar un fondo en el CSS

    const imageSet = new ImageSet(CardSizes.BIG_WIDTH, CardSizes.BIG_HEIGHT);


    switch(globals.cardInfo[i].kategoria){

        case "unit":
        const unitCard = new UnitCard(globals.cardInfo[i].irudia, globals.cardInfo[i].izena, CardState.DECK, true, imageSet,
                                      globals.cardInfo[i].balioa, globals.cardInfo[i].description, globals.cardInfo[i].deskribapena, globals.cardInfo[i].efektua,
                                      globals.cardInfo[i].urritasun_karta, globals.cardInfo[i].mota);
        globals.cards.push(unitCard);
        break;

        case "instaeffect":
        const instaCard = new SuddenCard(globals.cardInfo[i].irudia,  globals.cardInfo[i].izena, CardState.DECK, true, imageSet, globals.cardInfo[i].description, globals.cardInfo[i].deskribapena, globals.cardInfo[i].efektua);
        globals.cards.push(instaCard);
        if(globals.cardInfo[i].izena === "Decoy"){
            console.log("Decoy added")
            console.log(instaCard);
        }

        break;

        case "permaeffect":
        const permaCard = new PermaCard(globals.cardInfo[i].irudia, globals.cardInfo[i].izena, CardState.DECK, true, imageSet, globals.cardInfo[i].description, globals.cardInfo[i].deskribapena, globals.cardInfo[i].efektua);
        globals.cards.push(permaCard);
        break;

        // case "climate":
        // const climateCard = new ClimateCard(globals.cardInfo[i].irudia, globals.cardInfo[i].cardName, 
        //                                     CardState.DECK, true, imageSet, globals.cardInfo[i].description, globals.cardInfo[i].deskribapena, globals.cardInfo[i].efektua);
        // globals.cards.push(climateCard);
        // break;

        case "token":
        
        const tokenCard = new Card(globals.cardInfo[i].irudia,  globals.cardInfo[i].izena, CardState.DECK, false, imageSet);
        globals.tokens.push(tokenCard);
        break;

        default:
            // console.error("Incorrect card category");



    }
    
}







function addClimateCards(){
    // console.log("Entra en addClimateCards");
    for(let i = 0; i < CardQuantity.EXPERT_CLIMATE; i++){
        let randomChoice = Math.floor(Math.random() * (4 + 1));
        let checks = 0;

        for(let l = 0; l < globals.cardInfo.length; l++){
            if(globals.cardInfo[l].kategoria === "climate"){
                // console.log("entra en el de kategoria en clima")
                if(checks === randomChoice){
                    if(globals.cardInfo[i].izena !== "Decoy" || globals.cardInfo[i].izena !== "Zarate")
                        insertCard(l);
                    l = globals.cardInfo.length;
                    // console.log("añadido carta de clima")
                } 
                checks++;   
            }
        }
    }
}
 
function addPermaCards(mode){
    // console.log("Entra en addPermaCards");
    let cardsToDraw;
    if(mode === GameMode.EXPERT_MODE)
        cardsToDraw = CardQuantity.EXPERT_PERMA;
    else
        cardsToDraw = CardQuantity.NORMAL_PERMA;
        // console.log(globals.cardInfo)
    for(let i = 0; i < cardsToDraw; i++){
        let checks = 0;

        for(let l = 0; l < globals.cardInfo.length; l++){

            if(globals.cardInfo[l].kategoria === "permaeffect"){
                // console.log("entra en el de kategoria en perma")
                if(globals.cardInfo[i].izena !== "Decoy" || globals.cardInfo[i].izena !== "Zarate")
                    insertCard(l);
                l = globals.cardInfo.length;
                // console.log("añadido carta perma")   
                checks++;
            }
        }
    }
}


function addInstaCards(mode){
    // console.log("Entra en addInstaCards");
    let cardsToDraw;
    if(mode === GameMode.EXPERT_MODE)
        cardsToDraw = CardQuantity.EXPERT_INSTA;
    else
        cardsToDraw = CardQuantity.NORMAL_INSTA;

    for(let i = 0; i < cardsToDraw; i++){
        let randomChoice = Math.floor(Math.random() * (2 + 1));
        let checks = 0;

        for(let l = 0; l < globals.cardInfo.length; l++){

            if(globals.cardInfo[l].kategoria === "instaeffect"){
                // console.log("entra en el de kategoria en insta")
                
                if(checks === randomChoice){
                    if(globals.cardInfo[i].izena !== "Decoy" || globals.cardInfo[i].izena !== "Zarate")
                        insertCard(l);
                    l = globals.cardInfo.length;
                    // console.log("añadido carta de effect")
                }    
                checks++;
            }
        }
    }
}


function addDecoy(){
    for(let l = 0; l < 6; l++){
        for(let i = 0; i < globals.cardInfo.length; i++){

            if(globals.cardInfo[i].izena === "Decoy")
                insertCard(i);
        }
    }


}

function addUnitCards(cardsLeft){

    for(let i = 0; i < cardsLeft; i++){
        let chanceNumber = Math.random();
        if(chanceNumber < 0.10){
            // console.log("Entra en función para añadir carta ultra rara");
            addUltraRareCard();
        }

        else if(chanceNumber < 0.40){
            // console.log("Entra en función para añadir carta rara");
            AddRareCard();
        }

        else{
            // console.log("Entra en función para añadir carta común");
            AddCommonCard();
        }

        filterExtraCards();
        // console.log(i);
    }

    

    // console.log(cardsLeft);

}

function filterExtraCards(mode){

    let cardsNeeded;
    let cardsToDraw;
    let zCheck = 0;
    let dCheck = 0;
    let cCheck = 0;

    if(mode === GameMode.EXPERT_MODE)
        cardsNeeded = 80;
    else
        cardsNeeded = 60;

    for(let i = 0; i < globals.cards.length; i++){
        let card = globals.cards[i];
        if(card.cardName === "Zarate"){
            zCheck++;
            if(zCheck > 1)
            globals.cards.splice(i,1);
        }

        if(card.cardName === "Decoy"){
            dCheck++;
            if(dCheck > 6){
                globals.cards.splice(i,1);
            }
        }

        if(card.categoryId === 3){
            cCheck++;
            if(cCheck > 0)
            globals.cards.splice(i,1);

        }






    }

    if(globals.cards.length < cardsNeeded){
        cardsToDraw = cardsNeeded - globals.cards.length;
        addUnitCards(cardsToDraw);
    }
}

function addZarate(){
    for(let i = 0; i < globals.cardInfo.length; i++){

        if(globals.cardInfo[i].izena === "Zarate")
            insertCard(i);
    }

}

function addUltraRareCard(){
    let ultraRareQuantity = 5;
    let randomChoice = Math.floor(Math.random() * (ultraRareQuantity + 1));
    let checks = 0;
    // console.log("randomChoice: " + randomChoice)
    for(let i = 0; i < globals.cardInfo.length; i++){
        if(globals.cardInfo[i].urritasun_karta === Rarity.ULTRA_RARE){
            if(checks === randomChoice){
                // console.log("Añade carta ultra rara");
                if(globals.cardInfo[i].izena !== "Decoy" || globals.cardInfo[i].izena !== "Zarate")
                    insertCard(i);
            }
            checks++;
        }
    }

}

function AddRareCard(){
    let rareQuantity = 8;
    let randomChoice = Math.floor(Math.random() * (rareQuantity + 1));
    let checks = 0;
    // console.log("randomChoice: " + randomChoice)
    for(let i = 0; i < globals.cardInfo.length; i++){
        if(globals.cardInfo[i].urritasun_karta === Rarity.RARE){
            if(checks === randomChoice){
                if(globals.cardInfo[i].izena !== "Decoy" || globals.cardInfo[i].izena !== "Zarate")
                    insertCard(i);
            }
            checks++;
        }
    }
}

function AddCommonCard(){
    let commonQuantity = 12;
    let randomChoice = Math.floor(Math.random() * (commonQuantity + 1));
    // console.log("randomChoice: " + randomChoice)
    let checks = 0;
    for(let i = 0; i < globals.cardInfo.length; i++){
        if(globals.cardInfo[i].urritasun_karta === Rarity.COMMON){
            if(checks === randomChoice){
                if(globals.cardInfo[i].izena !== "Decoy" || globals.cardInfo[i].izena !== "Zarate")
                    insertCard(i);
            }
            checks++;
        }
    }

}

function AddTokenCard()
{
    globals.tokens.splice(0);
    for(let i = 0; i < globals.cardInfo.length; i++)
    {
        if(globals.cardInfo[i].kategoria === 'token')
        {
            insertCard(i);
            if(globals.cardInfo[i].izena === 'Health_token')
            {
                for(let j = 0; j < 3; j++)
                {
                    console.log(globals.cardInfo[i]);
                    insertCard(i);
                }
            }
        }
    }
    // console.log(globals.tokens);
}



// ============================================================================================
//                                      ZONAS DE JUEGO
// ============================================================================================

//La funcion Slots sera la funcion que llame a todos las funciones donde estaran los slots donde se coloquen todas las cartas
function initSlots()
{
    //GENERAL
    // tableSize();             // Tamaño de Toda la Mesa de juego      - NOT NECESSARY
    climatologyZone();          // Slots de Cartas de Clima             - DONE
    buffPlayer1();              // Buffs del Player 0 (3 secciones)     - DONE
    buffPlayer2();              // Buffs del Player 1 (3 secciones)     - DONE
    liveZone1();                // Slots de las vidas                   
    liveZone2();  
    tokenZone1();
    tokenZone2();
    messageZone();

    //PLAYER 0
    slotDiscardP1();            // Slots de Descartes del Jugador 1     - DONE
    handPlayer1();              // Mano del Jugador 1 (12 Slots)        - DONE
    tableSection_Player1();     // Seccion de juego de todas las cartas del Player 0 (3 Secciones, 10 slots cada una)   - DONE
    deckPlayer1();              // Mazo del Jugador 1                   - 
    decoyZone0();               // Slots de los decoys del player 0

    //PLAYER 1
    slotDiscardP2();            // Slots de Descartes del Jugador 2     - DONE
    handPlayer2();              // Mano del Jugador 2 (12 Slots)        - DONE
    tableSection_Player2();     // Seccion de juego de todas las cartas del Player 1 (3 Secciones, 10 slots cada una)   - 
    deckPlayer2();              // Mazo del jugador 2                   - 
    decoyZone1();               // Slots de los decoys del player 1
}

// Tamaño de la mesa
function tableSize()
{
    const xPos = 200;
    const yPos = 200;
    const xSize = 300;
    const ySize = 300;
    
    const tableSize = new GameZones (xPos, yPos, xSize, ySize);
    globals.slots.push(tableSize);

}

function decoyZone0()
{
    let xPos = Player0_map_pos.PLAYER0_DECOY_XPOS;

    const yPos = Player0_map_pos.PLAYER0_DECOY_YPOS;
    const xSize = CardSizes.TOKEN_WIDHT;
    const ySize = CardSizes.TOKEN_HEIGHT;
    let slotID = SlotIdentificators.PLAYER0_DECOY; 

    for(let i = 0; i < 3; i++)
    {
        const decoySlot = new GameZones(xPos, yPos, xSize, ySize, slotID)
        globals.slots.push(decoySlot);
        xPos += 90;
    }
}

function decoyZone1()
{
    let xPos = Player1_map_pos.PLAYER1_DECOY_XPOS;

    const yPos = Player1_map_pos.PLAYER1_DECOY_YPOS;
    const xSize = CardSizes.TOKEN_WIDHT;
    const ySize = CardSizes.TOKEN_HEIGHT;
    let slotID = SlotIdentificators.PLAYER1_DECOY; 

    for(let i = 0; i < 3; i++)
    {
        const decoySlot = new GameZones(xPos, yPos, xSize, ySize, slotID)
        globals.slots.push(decoySlot);
        xPos += 90;
    }
}

function slotDiscardP1 ()
{
    const xPos      = Player0_map_pos.PLAYER0_DISCARD_XPOS;
    const yPos      = Player0_map_pos.PLAYER0_DISCARD_YPOS;
    const xSize     = 90;
    const ySize     = 100;
    const slotID    = SlotIdentificators.PLAYER0_DISCARD;

    const slotDiscardP1 = new GameZones(xPos, yPos, xSize, ySize, slotID);
    globals.slots.push(slotDiscardP1);
    //Se hara un push a un array globals de Slots para almacenar todos los slots y despues renderizarlos
}

function slotDiscardP2 ()
{
    const xPos      = Player1_map_pos.PLAYER1_DISCARD_XPOS;
    const yPos      = Player1_map_pos.PLAYER1_DISCARD_YPOS;
    const xSize     = 90;
    const ySize     = 100;
    const slotID    = SlotIdentificators.PLAYER1_DISCARD

    const slotDiscardP2 = new GameZones(xPos, yPos, xSize, ySize, slotID);
    globals.slots.push(slotDiscardP2);
}

function climatologyZone ()
{
    const xPos1     = Common_map_pos.CLIMATE_BOX_1_XPOS;
    const xPos2     = Common_map_pos.CLIMATE_BOX_2_XPOS;

    const yPos      = Common_map_pos.CLIMATE_BOX_YPOS;
    const xSize     = 140;
    const ySize     = 120;
    const slotID    = SlotIdentificators.CLIMATE_FIELD;

    const slotClimatology1 = new GameZones(xPos1, yPos, xSize, ySize, slotID);
    const slotClimatology2 = new GameZones(xPos2, yPos, xSize, ySize, slotID);
    globals.slots.push(slotClimatology1, slotClimatology2);
}

function liveZone1()
{
    const xPos1     = Common_map_pos.PLAYER0_LIVE1_XPOS;
    const xPos2     = Common_map_pos.PLAYER0_LIVE2_XPOS;

    const yPos      = Common_map_pos.PLAYER0_LIVE_YPOS;
    const xSize     = CardSizes.TOKEN_WIDHT;
    const ySize     = CardSizes.TOKEN_HEIGHT;
    const slotID1   = SlotIdentificators.PLAYER0_TOKEN1;
    const slotID2   = SlotIdentificators.PLAYER0_TOKEN2;


    const slotLive1 = new GameZones(xPos1, yPos, xSize, ySize, slotID1);
    const slotLive2 = new GameZones(xPos2, yPos, xSize, ySize, slotID2);
    globals.slots.push(slotLive1, slotLive2);
}

function liveZone2()
{
    const xPos1     = Common_map_pos.PLAYER1_LIVE1_XPOS;
    const xPos2     = Common_map_pos.PLAYER1_LIVE2_XPOS;

    const yPos      = Common_map_pos.PLAYER1_LIVE1_YPOS;
    const xSize     = CardSizes.TOKEN_WIDHT;
    const ySize     = CardSizes.TOKEN_HEIGHT;

    const slotID1   = SlotIdentificators.PLAYER1_TOKEN1;
    const slotID2   = SlotIdentificators.PLAYER1_TOKEN2;

    const slotLive1 = new GameZones(xPos1, yPos, xSize, ySize, slotID1);
    const slotLive2 = new GameZones(xPos2, yPos, xSize, ySize, slotID2);
    globals.slots.push(slotLive1, slotLive2);
}

function tokenZone1()
{
    const xPos1     = Common_map_pos.PLAYER0_TURN_TOKEN_XPOS;
    const yPos      = Common_map_pos.PLAYER0_TURN_TOKEN_YPOS;
    const xSize     = CardSizes.TOKEN_WIDHT;
    const ySize     = CardSizes.TOKEN_HEIGHT;

    const slotToken = new GameZones(xPos1, yPos, xSize, ySize);
    globals.slots.push(slotToken);
}

function tokenZone2()
{
    const xPos1     = Common_map_pos.PLAYER1_TURN_TOKEN_XPOS;
    const yPos      = Common_map_pos.PLAYER1_TURN_TOKEN_YPOS;
    const xSize     = CardSizes.TOKEN_WIDHT;
    const ySize     = CardSizes.TOKEN_HEIGHT;

    const slotToken = new GameZones(xPos1, yPos, xSize, ySize);
    globals.slots.push(slotToken);
}

function messageZone()
{
    const xPos1     = Common_map_pos.MESSAGE_XPOS;
    const yPos      = Common_map_pos.MESSAGE_YPOS;
    const xSize     = Common_map_pos.MESSAGE_XSIZE;
    const ySize     = Common_map_pos.MESSAGE_YSIZE;

    const slotMessage = new GameZones(xPos1, yPos, xSize, ySize);
    globals.slots.push(slotMessage);
}

function handPlayer1 ()
{ 
    const yPos      = Player0_map_pos.PLAYER0_CARDS_IN_HAND_YPOS;
    const xSize     = 87.5;
    const ySize     = 90;
    const slotID    = SlotIdentificators.PLAYER0_HAND;

    let xPos = Player0_map_pos.PLAYER0_CARDS_IN_HAND1_XPOS;

    for (let i = 0; i < 12; i++)
    {
        const handSlots = new GameZones(xPos, yPos, xSize, ySize, slotID)
        globals.slots.push(handSlots);
        xPos += 87.5;
    }

}

function handPlayer2 ()
{
    const yPos      = Player1_map_pos.PLAYER1_CARDS_IN_HAND_YPOS;
    const xSize     = 87.5;
    const ySize     = 90;
    const slotID    = SlotIdentificators.PLAYER1_HAND;

    let xPos = Player1_map_pos.PLAYER1_CARDS_IN_HAND1_XPOS;

    for (let i = 0; i < 12; i++)
    {
        const handSlots = new GameZones(xPos, yPos, xSize, ySize, slotID)
        globals.slots.push(handSlots);
        xPos += 87.5;
    }
}

function buffPlayer1 ()
{
     // 3 Secciones 
     const xPos      = Player0_map_pos.PLAYER0_BUFF1_XPOS;

     const yPos1     = Player0_map_pos.PLAYER0_BUFF1_YPOS;
     const yPos2     = Player0_map_pos.PLAYER0_BUFF2_YPOS;
     const yPos3     = Player0_map_pos.PLAYER0_BUFF3_YPOS;
 
     const xSize     = 100;
     const ySize     = 90;

     const slotID1      = SlotIdentificators.PLAYER0_B1;
     const slotID2      = SlotIdentificators.PLAYER0_B2;
     const slotID3      = SlotIdentificators.PLAYER0_B3;
 
     const slot_1_BuffPlayer1 = new GameZones(xPos, yPos1, xSize, ySize, slotID1);
     const slot_2_BuffPlayer1 = new GameZones(xPos, yPos2, xSize, ySize, slotID2);
     const slot_3_BuffPlayer1 = new GameZones(xPos, yPos3, xSize, ySize, slotID3);
 
     globals.slots.push(slot_1_BuffPlayer1, slot_2_BuffPlayer1, slot_3_BuffPlayer1);
}

function buffPlayer2 ()
{
    // 3 Secciones 
    const xPos      = Player1_map_pos.PLAYER1_BUFF1_XPOS;

    const yPos1     = Player1_map_pos.PLAYER1_BUFF1_YPOS;
    const yPos2     = Player1_map_pos.PLAYER1_BUFF2_YPOS;
    const yPos3     = Player1_map_pos.PLAYER1_BUFF3_YPOS;

    const xSize     = 100;
    const ySize     = 90;

    const slotID1      = SlotIdentificators.PLAYER1_B1;
    const slotID2      = SlotIdentificators.PLAYER1_B2;
    const slotID3      = SlotIdentificators.PLAYER1_B3;

    const slot_1_BuffPlayer2 = new GameZones(xPos, yPos1, xSize, ySize, slotID1);
    const slot_2_BuffPlayer2 = new GameZones(xPos, yPos2, xSize, ySize, slotID2);
    const slot_3_BuffPlayer2 = new GameZones(xPos, yPos3, xSize, ySize, slotID3);

    globals.slots.push(slot_1_BuffPlayer2, slot_2_BuffPlayer2, slot_3_BuffPlayer2);
}

function tableSection_Player1()
{
    // 3 Secciones - Fisico, Distancia, Asedio
    // 8 Slots 
    
    let yPos        = Player0_map_pos.PLAYER0_TABLE_SECTION1_YPOS;
    let xPos        = Player0_map_pos.PLAYER0_TABLE_SECTION1_XPOS;
    const xSize     = 87.5;
    const ySize     = 90;
    let slotID    = SlotIdentificators.PLAYER0_F1 - 1;
    
    for (let i = 0; i < 3; i++)
    {
        slotID++;
        for (let j = 0; j < 8; j++)
        {
            const slotsTable_Player1 = new GameZones(xPos, yPos, xSize, ySize, slotID);
            globals.slots.push(slotsTable_Player1);
            xPos  += xSize;

        }
        
        yPos += 10 + ySize;
        xPos = Player0_map_pos.PLAYER0_TABLE_SECTION1_XPOS;
    }
    
}

function tableSection_Player2()
{
   // 3 Secciones - Fisico, Distancia, Asedio
    // 8 Slots 
    
    let yPos        = Player1_map_pos.PLAYER1_TABLE_SECTION1_YPOS;
    let xPos        = Player1_map_pos.PLAYER1_TABLE_SECTION1_XPOS;
    const xSize     = 87.5;
    const ySize     = 90;
    let slotID    = SlotIdentificators.PLAYER1_F1 - 1;
    
    for (let i = 0; i < 3; i++)
    {
        
        slotID++;
        for (let j = 0; j < 8; j++)
        {
            const slotsTable_Player2 = new GameZones(xPos, yPos, xSize, ySize, slotID);
            globals.slots.push(slotsTable_Player2);
            xPos  += xSize;

        }
        
        yPos -= 10 + ySize;
        xPos = Player0_map_pos.PLAYER0_TABLE_SECTION1_XPOS;
    }
}

function deckPlayer1()
{
    const xPos      = Player0_map_pos.PLAYER0_DECK_XPOS;
    const yPos      = Player0_map_pos.PLAYER0_DECK_YPOS;
    const xSize     = 90;
    const ySize     = 100;
    const slotID    = SlotIdentificators.PLAYER0_DECK

    const deckSlot = new GameZones(xPos, yPos, xSize, ySize, slotID);
    globals.slots.push(deckSlot);
}

function deckPlayer2()
{
    const xPos      = Player1_map_pos.PLAYER1_DECK_XPOS;
    const yPos      = Player1_map_pos.PLAYER1_DECK_YPOS;
    const xSize     = 90;
    const ySize     = 100;
    const slotID    = SlotIdentificators.PLAYER1_DECK

    const deckSlot = new GameZones(xPos, yPos, xSize, ySize, slotID);
    globals.slots.push(deckSlot);
}


// ==========================================
//                  GET
// ==========================================

function initCardInfo()
{

    const url = "http://localhost/mythClash/server/routes/getAllCards.php";
    const request = new XMLHttpRequest();

    request.onreadystatechange = function()
    {
        // console.log("entra");
        if (this.readyState == 4)
        {
            if(this.status == 200)
            {
                // console.log("entra");
                // console.log (this.responseText);
                if (this.responseText != null)
                {
                    
                    // console.log("Entra");
                    const resultJSON = JSON.parse(this.responseText);
                    
                    //Guardamos los datos del resultJSON
                    globals.cardInfo = resultJSON;
                    
                    initCardLinks();


                    console.log("Card info loaded");
                   
                    // console.log(resultJSON); 

                }
                else  
                    alert("Comunication error: No data received");
            }
            else 
                alert ( "Communication error: " + this.statusText);
        }
    }

    request.open ('GET', url, true);
    request.responseType = "text";
    request.send();
}

function initCardLinks()
{

    const url = "http://localhost/mythClash/server/routes/getAllLinks.php";
    const request = new XMLHttpRequest();

    request.onreadystatechange = function()
    {
        // console.log("entra");
        if (this.readyState == 4)
        {
            if(this.status == 200)
            {
                // console.log("entra");
                // console.log (this.responseText);
                if (this.responseText != null)
                {
                    
                    // console.log("Entra");
                    const resultJSON = JSON.parse(this.responseText);
                    
                    //Guardamos los datos del resultJSON
                    globals.img_url = resultJSON;
                    
                    loadAssets();

                    // console.log("get links loaded");
                    // console.log("this.responetext" + this.responseText);

                }
                else  
                    alert("Comunication error: No data received");
            }
            else 
                alert ( "Communication error: " + this.statusText);
        }
    }

    request.open ('GET', url, true);
    request.responseType = "text";
    request.send();
}


function getAllUsers()
{
    // console.log("entra en getAllUsers");
    const url = "http://localhost/mythClash/server/routes/getAllUsers.php";
    const request = new XMLHttpRequest();

    request.onreadystatechange = function()
    {

        if (this.readyState == 4)
        {
            if(this.status == 200)
            {

                // console.log("entra");
                // console.log (this.responseText);
                if (this.responseText != null)
                {
                    // console.log(this.responseText);
                    const resultJSON = JSON.parse(this.responseText);
                    // console.log(resultJSON);
                    //Guardamos los datos del resultJSON
                    globals.all_users = resultJSON;
                    createList();
                    // console.log("this.responetext" + this.responseText);
                    // console.log(globals.all_users);
                }
                else  
                    alert("Comunication error: No data received");
            }
            else 
                alert ( "Communication error: " + this.statusText);
        }
    }
    request.open ('GET', url, true);
    request.responseType = "text";
    request.send();
}




// ==================================================
//               TIMERS
// ==================================================

function initTimers()
{
    globals.levelTime = new Time(0,1);
}


function initCommonSlots(){
    initClimateSlot();
    initBuffSlots();
}


export {
    createExpertDeck,
    createNormalDeck,
    initHTMLelements,
    initVars,
    initEvents,
    loadAssets,
    initCardInfo,
    initCardLinks,
    initSlots,
    getAllUsers,
    initTimers,
    postForgotPasswordData,
}