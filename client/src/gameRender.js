import globals from "./globals";




export default function render()
{
    globals.ctx.clearRect(0,0,globals.canvas.width, globals.canvas.height);

}

function drawGame(){
    renderMap();
    renderCards();

}

function renderMap ()
{
    
}


function renderCards(){

    for(let i = 0; i < globals.cards.length; i++){
        renderCard(globals.cards[i]);
    }

}

function renderCard(card){
    if(card.showBack === true){
        globals.ctx.drawImage(
            globals.assets.reverse,     //archivo de la imagen
            card.xPos, card.yPos,       //Posición inicial x e y 
            

        )

    }
}

export{
    render,
    drawGame,
}