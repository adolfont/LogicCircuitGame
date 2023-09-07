import { GAME_CANVA_HEIGHT, GAME_CANVA_WIDTH } from "../GameOperatingClasses/config.js";

/*
* Classe que desenha uma imagem por um
* periodo de tempo determinado.
*/
export class TemporaryImageDrawing{
    cntx;
    img;
    alpha = 100;
    width = 300;
    height = 300;
    time = 100;

    constructor(cntx){
        this.cntx = cntx;
    }

    setImage(img, width, height, time){
        this.img = img;
        this.width = width;
        this.height = height;
        this.time = time;
    }

    //Seu retorno diz se a animação acabou
    update(){
        this.time --;
        if(this.time <= 0){
            return true;
        }
        return false;
    }

    draw(){
        this.cntx.drawImage(this.img, GAME_CANVA_WIDTH/2 - this.width/2, GAME_CANVA_HEIGHT/2 - this.height/2, this.width, this.height);
    }
}