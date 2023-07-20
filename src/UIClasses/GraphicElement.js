export class GraphicElement{
    x = 0;
    y = 0;
    w = 0;
    h = 0;

    image;

    constructor(x, y, w, h, image){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.image = image;
    }

    draw(context, offsetX, offsetY){
        context.drawImage(this.image, this.x - offsetX, this.y - offsetY, this.w, this.h);
    }
}