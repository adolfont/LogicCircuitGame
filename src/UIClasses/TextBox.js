const TAG =  "gameTextBox";

export class TextBox{
    text;
    element;
    Visible = false;

    setText(string){
        this.text = string;
        this.element.textContent = this.text;
    }

    setVisible(){
        this.element = document.createElement(TAG);
        this.element.textContent = this.text;
        let div = document.getElementById("forCanva");
        div.appendChild(this.element);
        //gameCanva.style = "";
        this.Visible = true;
    }

    setUnvisible(){
        if(this.element!=undefined){  
            this.element.remove();
            this.Visible = false;
        }
    }

    getVisible(){
        return this.Visible;
    }
}