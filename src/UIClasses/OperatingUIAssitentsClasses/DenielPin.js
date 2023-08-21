import { DENIED_PIN_HEIGHT } from "../GameplayUi.js";
import { DENIED_PIN_WIDTH } from "../GameplayUi.js";

export class DenielPin {
    visible = false;
    x;
    y;
    image;

    constructor(image){
        this.image = image;
    }

    paint(g){
        g.drawImage(this.image,this.x,this.y,DENIED_PIN_WIDTH,DENIED_PIN_HEIGHT);
    }

    updateDenielPinPos(x,y){
        this.x = x - DENIED_PIN_WIDTH/2;
        this.y = y - DENIED_PIN_HEIGHT/2;
    }
}