export class DenielPin {
    visible = false;
    x;
    y;

    paint(g){
        g.strokeRect(this.x, this.y, 80,80);
    }

    updateDenielPinPos(x,y){
        this.x = x - 40;
        this.y = y - 40;
    }
}