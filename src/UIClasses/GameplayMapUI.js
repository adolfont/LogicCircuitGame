import { GAME_CANVA_HEIGHT } from "../GameOperatingClasses/constant.js";
import { GAME_CANVA_WIDTH } from "../GameOperatingClasses/constant.js";
import {SCALE_RELATIVE_TO_GAMEPLAY} from "./constants.js";
import { MINIMAP_SCALE } from "./constants.js";

const PORT_SCALE = 0.1;

export const OFFSET_WIDTH = GAME_CANVA_WIDTH * SCALE_RELATIVE_TO_GAMEPLAY;
export const OFFSET_HEIGTH = GAME_CANVA_HEIGHT * SCALE_RELATIVE_TO_GAMEPLAY;

const LIGHT_WIDTH = 29*PORT_SCALE;
const LIGHT_HEIGHT = 46*PORT_SCALE;

const PORT_WIDTH = 62*PORT_SCALE;
const PORT_HEIGHT = 74*PORT_SCALE;

const LEAF_WIDTH = 85*MINIMAP_SCALE;
const LEAF_HEIGHT = 84*MINIMAP_SCALE;

const TUBE_WIDTH = 20*PORT_SCALE;
const TUBE_HEIGHT = 20*PORT_SCALE;

const SHORTCUT_WIDTH = 20*MINIMAP_SCALE;
const SHORTCUT_HEIGHT = 20*MINIMAP_SCALE;

const FLOOR_WIDTH = 640*MINIMAP_SCALE;
const FLOOR_HEIGHT = 360*MINIMAP_SCALE;

const EDGE = (PORT_WIDTH/PORT_SCALE)*MINIMAP_SCALE;

const ON = 1;
const OFF = 0;

export class GameplayMapUi{
    canvaHeight = 180;
    canvaWidth = 360;

    onLight = new Image();
    offLight = new Image();
    portImage;
    energyFont = [];
    leftTube = [];
    rightTube = [];
    horizontalTube = [];
    verticalTube = [];
    shortcutImage = new Image();
    floor = new Image();
    mapedScenery;

    offsetX = 0;
    offsetY = 0;

    focus = false;

    canva;
    context;

    treeHead;

    constructor(canva, head, mapedScenery){
        this.canva = canva;
        this.context = canva.getContext('2d');

        this.mapedScenery = mapedScenery;

        this.onLight.src = "./res/genSprites/onLamp.png";
        this.offLight.src = "./res/genSprites/offLamp.png";
        this.floor.src = "./res/genSprites/floor.png";

        /*Cada modelo de porta tem sua respectiva
        representação para ligado e desligado
        diferenciando se sua saída é true ou false.
        Portas que não podem ser modificadas também
        modelos diferentes daqueles que podem*/

        this.portImage = new Image();
        this.portImage.src = "./res/genSprites/orPortMod_NoOutputVisualize.png";

        this.energyFont[OFF] = new Image();
        this.energyFont[OFF].src = "./res/genSprites/energyOffSource.png";
        this.energyFont[ON] = new Image();
        this.energyFont[ON].src = "./res/genSprites/energyOnSource.png";

        this.rightTube[OFF] = new Image();
        this.rightTube[OFF].src = "./res/genSprites/offRightTube.png"
        this.rightTube[ON] = new Image();
        this.rightTube[ON].src = "./res/genSprites/onRightTube.png"

        this.leftTube[OFF] = new Image();
        this.leftTube[OFF].src = "./res/genSprites/offLeftTube.png"
        this.leftTube[ON] = new Image();
        this.leftTube[ON].src = "./res/genSprites/onLeftTube.png"

        this.horizontalTube[OFF] = new Image();
        this.horizontalTube[OFF].src = "./res/genSprites/offMidTubeH.png";
        this.horizontalTube[ON] = new Image();
        this.horizontalTube[ON].src = "./res/genSprites/onMidTubeH.png"

        this.verticalTube[OFF] = new Image();
        this.verticalTube[OFF].src = "./res/genSprites/offMidTubeV.png"
        this.verticalTube[ON] = new Image();
        this.verticalTube[ON].src = "./res/genSprites/onMidTubeV.png"

        this.verticalTube[ON].onload = ()=>{
            this.paintGameBoard(head);
        }

        this.treeHead = head;
    }

    paint(){
        this.paintGameBoard(this.treeHead);
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

        this.paintOffsetRegion(head);
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
           
            this.paintTree(head.Rinput, x + EDGE + head.Rinput.bifurcation*EDGE , y + PORT_HEIGHT/1.3 + TUBE_HEIGHT + head.Rinput.bifurcation* MINIMAP_SCALE * 2 );
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
            
            if(head.Rinput.getOutput() && head.Linput.outputVisualize){
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
            
            if(head.Linput.getOutput() && head.Linput.outputVisualize){
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
        if(head.port.id == "TRUE" || head.port.id == "FALSE"){
            this.paintLeaf(head);
        }else{
            this.context.drawImage(this.portImage, head.xInMap - PORT_WIDTH/2, head.yInMap, PORT_WIDTH, PORT_HEIGHT);
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

    /*Desenha no mapa um retangulo
    que delimita o que está sendo mostrado
    na tela de gameplay*/
    paintOffsetRegion(head){
        this.context.strokeStyle = "black";
        this.offsetRecalculate();
        this.context.strokeRect(this.canvaWidth/2 + this.offsetX - OFFSET_WIDTH/2, 0 + this.offsetY, OFFSET_WIDTH, OFFSET_HEIGTH);
    }   
    
    /*Atualiza os valores de offset
    de acordo com os do canva de gameplay*/
    offsetRecalculate(){
        this.offsetX = this.mapedScenery.getOffsetX() * SCALE_RELATIVE_TO_GAMEPLAY;
        this.offsetY = this.mapedScenery.getOffsetY() * SCALE_RELATIVE_TO_GAMEPLAY;
    }

    /*Recupera o foco no canva do
    minimapa*/
    requestFocus(){
        this.focus = true;
    }

    /*libera o foco do canva do
    minimapa*/
    releaseFocus(){
        this.focus = false;
    }

    /*Define o centro dos limites do offset*/
    setOffsetCenter(x, y){
        this.offsetX = x + this.canvaWidth/2;
        this.offsetY = y - OFFSET_HEIGTH/2;
    }

    setLevel(level){
        this.level = level;
        this.treeHead = level.gameTree.G[0];
    }
}