import { GAME_CANVA_HEIGHT } from "../../GameOperatingClasses/config.js";
import { GAME_CANVA_WIDTH } from "../../GameOperatingClasses/config.js";
import {TextBox} from "../TextBox.js";
import { DENIED_PIN_WIDTH} from "../GameplayUi.js";
import { DENIED_PIN_HEIGHT } from "../GameplayUi.js";


const BUTTON_SCALE = 3;
const WIDTH = 16*BUTTON_SCALE;
const HEIGHT = 15*BUTTON_SCALE;
const TEXTBOX_TAG = "deniedPinBox";
var MAX = 3;

export class DenielButton{
    x = GAME_CANVA_WIDTH - WIDTH*2;
    y = GAME_CANVA_HEIGHT/2;
    w = WIDTH;
    h = HEIGHT;
    numberOfPins = 1;
    pin;
    press = false;
    textBox = new TextBox()
    pinManager;
    image;
    scale_divider = 1

    constructor(pin,manager,image){
        this.pin = pin;
        this.textBox.setSufix(" / " + MAX);
        this.textBox.setTag(TEXTBOX_TAG)
        this.pinManager = manager;
        this.image = image
    }

    paint(g){
        if(this.pinManager.denielPins>0){
            g.drawImage(this.image,this.x + (this.w - this.w/this.scale_divider)/2, this.y + (this.h - this.h/this.scale_divider)/2, this.w/this.scale_divider, this.h/this.scale_divider);
            this.showText();
        }else{
            this.textBox.setUnvisible();
        }
    }

    showText(){
        if(this.textBox.getVisible()==false){
            this.textBox.setVisible();
        }else{
            this.textBox.setText(this.pinManager.denielPins);
        }
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