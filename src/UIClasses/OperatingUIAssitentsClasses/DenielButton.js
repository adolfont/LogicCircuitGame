import { GAME_CANVA_HEIGHT } from "../../GameOperatingClasses/constant.js";
import { GAME_CANVA_WIDTH } from "../../GameOperatingClasses/constant.js";
import { DENIED_PIN_WIDTH} from "../GameplayUi.js";
import { DENIED_PIN_HEIGHT } from "../GameplayUi.js";

const BUTTON_SCALE = 3;
const WIDTH = 16*BUTTON_SCALE;
const HEIGHT = 15*BUTTON_SCALE;

export class DenielButton{
    x = GAME_CANVA_WIDTH - WIDTH*2;
    y = GAME_CANVA_HEIGHT/2;
    w = WIDTH;
    h = HEIGHT;
    scale_divider = 1
    pin;
    image;
    press = false;

    constructor(pin, image){
        this.pin = pin;
        this.image = image;
    }

    paint(g){
        g.drawImage(this.image,this.x + (this.w - this.w/this.scale_divider)/2, this.y + (this.h - this.h/this.scale_divider)/2, this.w/this.scale_divider, this.h/this.scale_divider);
    }

    callback(){
        if(this.press){
            this.press = false;
            this.pin.visible = false;
            this.scale_divider = 1;
        }else{
            this.press = true;
            this.pin.visible = true;
            this.scale_divider = 1.2;
        }
    }
}