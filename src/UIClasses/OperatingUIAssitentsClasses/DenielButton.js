import { GAME_CANVA_HEIGHT } from "../../GameOperatingClasses/constant.js";
import { GAME_CANVA_WIDTH } from "../../GameOperatingClasses/constant.js";
import {TextBox} from "../TextBox.js";


const WIDTH = 80;
const HEIGHT = 80;
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

    constructor(pin,manager){
        this.pin = pin;
        this.textBox.setSufix("/ " + MAX);
        this.textBox.setTag(TEXTBOX_TAG)
        this.pinManager = manager;
    }

    paint(g){
        if(this.pinManager.denielPins>0){
            g.strokeRect(this.x,this.y,this.h,this.w);
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
        }else{
            this.press = true;
            this.pin.visible = true;
        }
    }
}