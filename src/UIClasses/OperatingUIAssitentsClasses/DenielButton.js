import { GAME_CANVA_HEIGHT } from "../../GameOperatingClasses/constant.js";
import { GAME_CANVA_WIDTH } from "../../GameOperatingClasses/constant.js";


const WIDTH = 80;
const HEIGHT = 80;

export class DenielButton{
    x = GAME_CANVA_WIDTH - WIDTH*2;
    y = GAME_CANVA_HEIGHT/2;
    w = WIDTH;
    h = HEIGHT;
    pin;
    press = false;

    constructor(pin){
        this.pin = pin;
    }

    paint(g){
        g.strokeRect(this.x,this.y,this.h,this.w);
    }

    callback(){
        if(this.press){
            this.press = false;
            this.pin.visible = false;
        }else{
            this.press = true;
            this.pin.visible = true;
        }
    }
}