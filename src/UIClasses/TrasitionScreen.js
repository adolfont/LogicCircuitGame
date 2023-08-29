import { GAME_CANVA_HEIGHT } from "../GameOperatingClasses/config.js";
import { GAME_CANVA_WIDTH } from "../GameOperatingClasses/config.js";

export class TrasitionScreen{
    context;
    opacity = 1;

    constructor(context){
        this.context = context;
    }

    paint(){
        this.context.fillStyle = 'rgba(0,0,0,'+ this.opacity +')';
        this.context.fillRect(0,0,GAME_CANVA_WIDTH,GAME_CANVA_HEIGHT);
    }

    upOpacity(){
        this.opacity+= 0.01;
    }

    downOpacity(){
        this.opacity-=0.01;
    }
}