const SCALE = 0.1;
const PORT_SCALE = 0.1;

const LIGHT_WIDTH = 29*PORT_SCALE;
const LIGHT_HEIGHT = 46*PORT_SCALE;

const PORT_WIDTH = 78*PORT_SCALE;
const PORT_HEIGHT = 35*PORT_SCALE;

const LEAF_WIDTH = 85*SCALE;
const LEAF_HEIGHT = 84*SCALE;

const TUBE_WIDTH = 20*PORT_SCALE;
const TUBE_HEIGHT = 20*PORT_SCALE;

const SHORTCUT_WIDTH = 20*SCALE;
const SHORTCUT_HEIGHT = 20*SCALE;

const FLOOR_WIDTH = 640*SCALE;
const FLOOR_HEIGHT = 360*SCALE;

const EDGE = (PORT_WIDTH/PORT_SCALE)*SCALE;

export const CLICK_AREA_W = PORT_WIDTH;
export const CLICK_AREA_H = PORT_HEIGHT;

const ON = 1;
const OFF = 0;

export class GameplayMapUi{
    canvaHeight = 180;
    canvaWidth = 360;

    onLight = new Image();
    offLight = new Image();
    andModPort = [];
    orModPort = [];
    andNoModPort = [];
    orNoModPort = [];
    energyFont = [];
    leftTube = [];
    rightTube = [];
    horizontalTube = [];
    verticalTube = [];
    shortcutImage = new Image();
    floor = new Image();

    canva;
    context;


    constructor(canva, head, currentNode){
        this.canva = canva;
        this.context = canva.getContext('2d');

        this.onLight.src = "./res/onLamp.png";
        this.offLight.src = "./res/offLamp.png";
        this.floor.src = "./res/floor.png";

        /*Cada modelo de porta tem sua respectiva
        representação para ligado e desligado
        diferenciando se sua saída é true ou false.
        Portas que não podem ser modificadas também
        modelos diferentes daqueles que podem*/

        this.andModPort[OFF] = new Image();
        this.andModPort[OFF].src = "./res/andOffPortMod.png";
        this.andModPort[ON] = new Image();
        this.andModPort[ON].src = "./res/andOnPortMod.png";
        
        this.orModPort[OFF] = new Image();
        this.orModPort[OFF].src = "./res/orOffPortMod.png";
        this.orModPort[ON] = new Image();
        this.orModPort[ON].src = "./res/orOnPortMod.png";
        
        this.andNoModPort[OFF] = new Image();
        this.andNoModPort[OFF].src = "./res/andOffPortNoMod.png";
        this.andNoModPort[ON] = new Image();
        this.andNoModPort[ON].src = "./res/andOnPortNoMod.png";

        this.orNoModPort[OFF] = new Image();
        this.orNoModPort[OFF].src = "./res/orOffPortNoMod.png";
        this.orNoModPort[ON] = new Image();
        this.orNoModPort[ON].src = "./res/orOnPortNoMod.png";

        this.energyFont[OFF] = new Image();
        this.energyFont[OFF].src = "./res/energyOffSource.png";
        this.energyFont[ON] = new Image();
        this.energyFont[ON].src = "./res/energyONSource.png";

        this.rightTube[OFF] = new Image();
        this.rightTube[OFF].src = "./res/offRightTube.png"
        this.rightTube[ON] = new Image();
        this.rightTube[ON].src = "./res/onRightTube.png"

        this.leftTube[OFF] = new Image();
        this.leftTube[OFF].src = "./res/offLeftTube.png"
        this.leftTube[ON] = new Image();
        this.leftTube[ON].src = "./res/onLeftTube.png"

        this.horizontalTube[OFF] = new Image();
        this.horizontalTube[OFF].src = "./res/offMidTubeH.png";
        this.horizontalTube[ON] = new Image();
        this.horizontalTube[ON].src = "./res/onMidTubeH.png"

        this.verticalTube[OFF] = new Image();
        this.verticalTube[OFF].src = "./res/offMidTubeV.png"
        this.verticalTube[ON] = new Image();
        this.verticalTube[ON].src = "./res/onMidTubeV.png"

        this.verticalTube[ON].onload = ()=>{
            this.paintGameBoard(head);
        }
    }

    //redesenha toda a tela da gameplay
    paintGameBoard(head){
        const x = this.canvaWidth/2;
        const y = EDGE;

        let light;
        
        if(head.getOutput()){
            light = this.onLight;
        }
        else{
            light = this.offLight;
        }

        this.context.clearRect(0, 0, this.canvaWidth , this.canvaHeight);
        //this.context.drawImage(this.floor, 0, 0, FLOOR_WIDTH*SCALE, FLOOR_HEIGHT*SCALE);

        this.context.drawImage(light, x - LIGHT_WIDTH/ 2, y, LIGHT_WIDTH, LIGHT_HEIGHT);

        this.paintTree(head, this.canvaWidth/2, y + EDGE);
    }

    //desenha a arvore de portas
    paintTree(head, x, y){
        let flag = false;

        head.xInMap = x;
        head.yInMap = y;

        this.paintPort(head);

        if(head.Linput != null){

            this.paintTree(head.Linput, x - EDGE - head.Linput.bifurcation*EDGE , y + (PORT_HEIGHT/1.3 + TUBE_HEIGHT) + head.Linput.bifurcation*EDGE/2 );
            this.paintLeftTube(head);
        }

        if(head.Rinput != null){
           
            this.paintTree(head.Rinput, x + EDGE + head.Rinput.bifurcation*EDGE , y + PORT_HEIGHT/1.3 + TUBE_HEIGHT + head.Rinput.bifurcation * 2 );
            this.paintRightTube(head);
        }
    }

    //desenha o tubo direito à porta
    paintRightTube(head){
        let x = head.xInMap + PORT_WIDTH/2 ;
        let y = head.yInMap + PORT_HEIGHT/2 - 5 ;

        let w = head.Rinput.xInMap - x;
        let h = head.Rinput.yInMap - y - PORT_HEIGHT/2;


        if(head.Rinput.port.id!="TRUE" && head.Rinput.port.id!="FALSE"){
            
            if(head.Rinput.getOutput()){
                this.context.drawImage(this.horizontalTube[ON],  x, y, w, TUBE_HEIGHT);
                this.context.drawImage(this.rightTube[ON], x + w, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[ON], head.Rinput.xInMap + 1, y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }else{

                
                this.context.drawImage(this.horizontalTube[OFF], x, y, w, TUBE_HEIGHT);
                this.context.drawImage(this.rightTube[OFF], x + w, y, TUBE_WIDTH , TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[OFF],head.Rinput.xInMap + 1,  y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }
        }

    }

    //desenha o tubo esquerto à porta
    paintLeftTube(head){
        
        let x = head.xInMap  - PORT_WIDTH /2 ;
        let y = head.yInMap + TUBE_HEIGHT/2 ;

        let w = x - head.Linput.xInMap;
        let h = head.Linput.yInMap - y - PORT_HEIGHT/2;
        
        if(head.Linput.port.id!="TRUE" && head.Linput.port.id!="FALSE"){
            
            if(head.Linput.getOutput()){
                this.context.drawImage(this.horizontalTube[ON], head.Linput.xInMap + TUBE_WIDTH, y, w - TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.leftTube[ON], head.Linput.xInMap, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[ON], head.Linput.xInMap - 1, y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }else{

                
                this.context.drawImage(this.horizontalTube[OFF], head.Linput.xInMap + TUBE_WIDTH, y, w - TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.leftTube[OFF], head.Linput.xInMap, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[OFF], head.Linput.xInMap - 1,  y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }
        }
        
    }

    //desenha a porta
    paintPort(head){

        if(head.getOutput()){

            if(head.mod){
                //caso a porta seja modificavel e esteja ligada

                if(head.port.id == "AND"){
                    this.context.drawImage(this.andModPort[ON], head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR") {
                    this.context.drawImage(this.orModPort[ON], head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
                }

            }else{
                //caso a porta não seja modificavel e esteja ligada
                if(head.port.id == "AND"){
                    this.context.drawImage(this.andNoModPort[ON], head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orNoModPort[ON], head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
                }else{
                    this.paintLeaf(head);
                }
            }

        }else{

            
            if(head.mod){
            //caso a porta seja modificavel e esteja desligada
                
                if(head.port.id == "AND"){
                    this.context.drawImage(this.andModPort[OFF], head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orModPort[OFF], head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
                }

            }else{
                //caso a porta não seja modificavel e esteja desligada

                if(head.port.id == "AND"){
                    this.context.drawImage(this.andNoModPort[OFF], head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orNoModPort[OFF], head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
                }else{
                    this.paintLeaf(head);
                }

            }
        }

    }

    //desenha os nós folhas que são portas booleanas
    paintLeaf(head){
        if(head.port.id == "TRUE"){
            this.context.drawImage(this.energyFont[ON], head.xInMap - LEAF_WIDTH/2, head.yInMap - LEAF_HEIGHT/2, LEAF_WIDTH, LEAF_HEIGHT);
        }else if(head.port.id == "FALSE"){
            this.context.drawImage(this.energyFont[OFF], head.xInMap - LEAF_WIDTH/2, head.yInMap - LEAF_HEIGHT/2, LEAF_WIDTH, LEAF_HEIGHT);
        }
    }
}