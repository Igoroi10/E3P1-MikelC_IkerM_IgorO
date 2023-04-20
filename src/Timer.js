export default class Time 
{
    constructor (value, timeChangeValue)
    {
        this.value              = value;            //Valor dle temporizador 
        this.timeChangeCounter  = 0;                //temporizador para cambiar valor (seconds)
        this.timeChangeValue    = timeChangeValue;  //Tiempo para cambiar valor (seconds)
    }
}