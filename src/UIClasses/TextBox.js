import { mobileMode } from "../GameOperatingClasses/config.js";
import { GAME_CANVA_WIDTH } from "../GameOperatingClasses/config.js";

export class TextBox{
    tag = "gameTextBox";
    text;
    element;
    Visible = false;
    prefix = '';
    sufix = '';

    setText(string){
        this.text = this.prefix + string + this.sufix;
        this.element.textContent = this.text;
    }

    setPrefix(string){
        this.prefix = string;
    }

    setSufix(string){
        this.sufix = string;
    }

    setVisible(){
        this.element = document.createElement(this.tag);
        this.element.textContent = this.text;

        if(mobileMode){
            if(this.tag == "gameTextBox"){
                this.element.style.width = GAME_CANVA_WIDTH*0.8 + "px"
                this.element.style.fontSize = "6pt";
            }else{
                this.element.style.fontSize = "10pt";
            }
        }

        let div = document.getElementById("forCanva");
        div.appendChild(this.element);
        this.Visible = true;
    }

    setUnvisible(){
        if(this.element!=undefined){  
            this.element.remove();
            this.Visible = false;
        }
    }

    setTag(string){
        this.tag = string;
    }

    getVisible(){
        return this.Visible;
    }
}