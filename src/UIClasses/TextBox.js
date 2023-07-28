export class TextBox{
    tag = "gameTextBox";
    text;
    element;
    Visible = false;
    prefix = '';

    setText(string){
        this.text = this.prefix + string;
        this.element.textContent = this.text;
    }

    setPrefix(string){
        this.prefix = string;
    }

    setVisible(){
        this.element = document.createElement(this.tag);
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

    setTag(string){
        this.tag = string;
    }

    getVisible(){
        return this.Visible;
    }
}