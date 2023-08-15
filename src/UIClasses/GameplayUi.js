import { GAME_CANVA_HEIGHT } from "../GameOperatingClasses/constant.js";
import { GAME_CANVA_WIDTH } from "../GameOperatingClasses/constant.js";
import { canvaGamaplayHandleMove } from "./haddleListener.js";
import { ShortcutUIFunc } from "./OperatingUIAssitentsClasses/ShortcutUIFunc.js";
import {GAMEPLAY_SCALE} from "./constants.js";
import { SCALE_RELATIVE_TO_GAMEPLAY } from "./constants.js";
import {DecorGraphics} from "./DecorGraphics.js";
import { TextBox } from "./TextBox.js";
import { TrasitionScreen } from "./TrasitionScreen.js";
import { canvaGamaplayHandleClick } from "./haddleListener.js";
import { DenielButton } from "./OperatingUIAssitentsClasses/DenielButton.js";
import { DenielPin } from "./OperatingUIAssitentsClasses/DenielPin.js";

const DIALOG_BOX_TAG =  "gameTextBox";
const SCORE_BOX_TAG = "gameScoreBox";

const LIGHT_WIDTH = 29*GAMEPLAY_SCALE;
const LIGHT_HEIGHT = 46*GAMEPLAY_SCALE;

const PORT_WIDTH = 62*GAMEPLAY_SCALE;
const PORT_HEIGHT = 74*GAMEPLAY_SCALE;

const LEAF_WIDTH = 85*GAMEPLAY_SCALE;
const LEAF_HEIGHT = 84*GAMEPLAY_SCALE;

const TUBE_WIDTH = 20*GAMEPLAY_SCALE;
const TUBE_HEIGHT = 20*GAMEPLAY_SCALE;

const SHORTCUT_WIDTH = 20*GAMEPLAY_SCALE;
const SHORTCUT_HEIGHT = 20*GAMEPLAY_SCALE;

const FLOOR_WIDTH = 640*GAMEPLAY_SCALE;
const FLOOR_HEIGHT = 360*GAMEPLAY_SCALE;

export const DENIED_PIN_HEIGHT = 15*GAMEPLAY_SCALE;
export const DENIED_PIN_WIDTH = 16*GAMEPLAY_SCALE;

const EDGE = PORT_WIDTH;

export const CLICK_AREA_W = PORT_WIDTH;
export const CLICK_AREA_H = PORT_HEIGHT;

const ON = 1;
const OFF = 0;
const UP = 1;
const DOWN = 0

export class GameplayUi{
    dialogBox = new TextBox();
    scoreBox = new TextBox();
    transitionScreen;

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
    andModPortNoOuputVisualize;
    orModPortNoOuputVisualize;
    andNoModPortNoOuputVisualize;
    orNoModPortNoOuputVisualize;
    deniedPinImage = new Image();

    decorGraphics =  new DecorGraphics(this);
    shortcutImage = new Image();

    offsetX = 0;
    offsetY = 0;
    
    currentNode = null; //a ultimo nó modificado pelo usuário
    shortcutUI = new ShortcutUIFunc(this); //para o funcionamento interno dos
                                            //botões de atalho

    denielPin;
    denielButton;
    horizontalPositiveMove = false;
    horizontalNegativeMove = false;

    verticalPositiveMove = false;
    verticalNegativeMove = false;

    inCutScene = false;
    inTransition = true;
    transition = DOWN;

    focus = true;

    canva;
    context;

    treeHead;
    level;


    constructor(canva, head, level){
        this.canva = canva;
        this.context = canva.getContext('2d');
        this.transitionScreen = new TrasitionScreen(this.context);
        this.treeHead = head;
        this.level =  level;
        this.level.setUI(this);
        this.dialogBox.setTag(DIALOG_BOX_TAG);
        this.scoreBox.setTag(SCORE_BOX_TAG);
        this.scoreBox.setPrefix("Score: ");

        this.canva.addEventListener('mousemove', (event)=>{
            canvaGamaplayHandleMove(event, this);
        });


        this.onLight.src = "./res/genSprites/onLamp.png";
        this.offLight.src = "./res/genSprites/offLamp.png";

        /*Cada modelo de porta tem sua respectiva
        representação para ligado e desligado
        diferenciando se sua saída é true ou false.
        Portas que não podem ser modificadas também
        modelos diferentes daqueles que podem*/

        this.shortcutImage.src = "./res/genSprites/shortcut.png";

        this.andModPort[OFF] = new Image();
        this.andModPort[OFF].src = "./res/genSprites/andOffPortMod.png";
        this.andModPort[ON] = new Image();
        this.andModPort[ON].src = "./res/genSprites/andOnPortMod.png";
        
        this.orModPort[OFF] = new Image();
        this.orModPort[OFF].src = "./res/genSprites/orOffPortMod.png";
        this.orModPort[ON] = new Image();
        this.orModPort[ON].src = "./res/genSprites/orOnPortMod.png";
        
        this.andNoModPort[OFF] = new Image();
        this.andNoModPort[OFF].src = "./res/genSprites/andOffPortNoMod.png";
        this.andNoModPort[ON] = new Image();
        this.andNoModPort[ON].src = "./res/genSprites/andOnPortNoMod.png";

        this.orNoModPort[OFF] = new Image();
        this.orNoModPort[OFF].src = "./res/genSprites/orOffPortNoMod.png";
        this.orNoModPort[ON] = new Image();
        this.orNoModPort[ON].src = "./res/genSprites/orOnPortNoMod.png";

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
        this.verticalTube[OFF].src = "./res/genSprites/offMidTubeV.png";
        this.verticalTube[ON] = new Image();
        this.verticalTube[ON].src = "./res/genSprites/onMidTubeV.png";

        this.andModPortNoOuputVisualize = new Image();
        this.andModPortNoOuputVisualize.src = "./res/genSprites/andPortMod_NoOutputVisualize.png";
        this.orModPortNoOuputVisualize = new Image();
        this.orModPortNoOuputVisualize.src = "./res/genSprites/orPortMod_NoOutputVisualize.png";
        this.andNoModPortNoOuputVisualize = new Image();
        this.andNoModPortNoOuputVisualize.src = "./res/genSprites/andPortNoMod_NoOutputVisualize.png";
        this.orNoModPortNoOuputVisualize = new Image();
        this.orNoModPortNoOuputVisualize.src = "./res/genSprites/orPortNoMod_NoOutputVisualize.png";

        this.deniedPinImage.src = "./res/pins/deniedPin.png";

        this.denielPin = new DenielPin(this.deniedPinImage);
        this.denielButton =  new DenielButton(this.denielPin, this.deniedPinImage);

        this.verticalTube[ON].onload = ()=>{
            this.paint();
        }

        this.scoreBox.setVisible();
        //this.scoreBox.setText(0);
    }

    /*Desenha o nivel do jogo*/
    paint(){
        this.context.clearRect(0, 0, GAME_CANVA_WIDTH , GAME_CANVA_HEIGHT);
        this.paintGameBoard(this.treeHead);
        this.denielButton.paint(this.context);

        if(this.denielPin.visible == true){
            this.denielPin.paint(this.context);
        }

        this.scoreBoxUpdateText();

        /*Caso o nivel tenha iniciado um evento*/
        if(this.level.inEvent()){
            this.paintLevelEvent();
        }else{
            this.dialogBox.setUnvisible();
        }

        /*Caso esteja em trnasição de fase*/
        if(this.inTransition){
            
            if(this.transition == UP){
                this.transitionScreen.upOpacity();
                if(this.transitionScreen.opacity >= 1){
                    this.setTreeHead(this.level.gameTree.G[0]);
                    this.transition = DOWN;
                }
            }else if(this.transition == DOWN){
                this.transitionScreen.downOpacity();
                if(this.transitionScreen.opacity <= 0){
                    if(this.level.gameTree.G[0]==this.treeHead){
                        this.inTransition = false;
                    }
                    this.transition = UP;
                }
            }
            this.transitionScreen.paint();
        }

    }

    scoreBoxUpdateText(){
        this.scoreBox.setText(this.level.gameTree.getScore());
    }

    paintDenielPin(){

    }

    /*Executa do evento do level*/
    paintLevelEvent(){
        this.level.executeEvent();

        if(!this.dialogBox.getVisible()){
            this.dialogBox.setVisible();
        }
        this.dialogBox.setText(this.level.getEventString());
    }

    //redesenha toda a tela da gameplay
    paintGameBoard(head){
        const x = GAME_CANVA_WIDTH/2;
        const y = EDGE;

        this.offSetRecalculate();

        let light;
        
        if(head.getOutput()){
            light = this.onLight;
        }
        else{
            light = this.offLight;
        }
        this.context.fillStyle = "#A6B04F";
        this.context.fillRect(0, 0, GAME_CANVA_WIDTH , GAME_CANVA_HEIGHT);
        
        this.decorGraphics.draw();
        this.paintLine(x, y + EDGE, GAME_CANVA_WIDTH/2, y + EDGE);
        this.context.drawImage(light, x - LIGHT_WIDTH/ 2  - this.offsetX, y - this.offsetY , LIGHT_WIDTH, LIGHT_HEIGHT);

        this.paintTree(head, GAME_CANVA_WIDTH/2 - this.offsetX , y + EDGE - this.offsetY);
    }

    //desenha a arvore de portas
    paintTree(head, x, y){
        let flag = false;

        head.x = x;
        head.y = y;

        this.paintPort(head);

        if(head.Linput != null){

            this.paintTree(head.Linput, x - EDGE - head.Linput.bifurcation*EDGE , y + (PORT_HEIGHT/1.3 + TUBE_HEIGHT) + head.Linput.bifurcation*EDGE/2 );
            this.paintLeftTube(head);
        }

        if(head.Rinput != null){
           
            
            this.paintTree(head.Rinput, x + EDGE + head.Rinput.bifurcation*EDGE , y + PORT_HEIGHT/1.3 + TUBE_HEIGHT + head.Rinput.bifurcation * 2 );
            this.paintRightTube(head);
        }

        /*if(head.Linput != null){
            this.paintLine(x, y, x - EDGE - head.Linput.bifurcation*EDGE, y + (PORT_HEIGHT/1.3 + TUBE_HEIGHT)*GAMEPLAY_SCALE);
        }

        if(head.Rinput != null){
            this.paintLine(x, y, x + EDGE + head.Rinput.bifurcation*EDGE, y + (PORT_HEIGHT/1.3 + TUBE_HEIGHT)*GAMEPLAY_SCALE);
        }*/
        if(head == this.currentNode){
            this.paintShortcut(head); 
        }
    }

    //desenha o tubo direito à porta
    paintRightTube(head){
        let x = head.x + PORT_WIDTH/2 - 8 * GAMEPLAY_SCALE;
        let y = head.y + PORT_HEIGHT/2 - 20;

        let w = head.Rinput.x - x;
        let h = head.Rinput.y - y - PORT_HEIGHT/4;


        if(head.Rinput.port.id!="TRUE" && head.Rinput.port.id!="FALSE"){
            
            if(head.Rinput.getOutput() && head.Rinput.outputVisualize){
                this.context.drawImage(this.horizontalTube[ON],  x, y, w, TUBE_HEIGHT);
                this.context.drawImage(this.rightTube[ON], x + w, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[ON], head.Rinput.x + 1, y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }else{

                
                this.context.drawImage(this.horizontalTube[OFF], x, y, w, TUBE_HEIGHT);
                this.context.drawImage(this.rightTube[OFF], x + w, y, TUBE_WIDTH , TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[OFF],head.Rinput.x + 1,  y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }
        }

    }

    //desenha o tubo esquerto à porta
    paintLeftTube(head){
        
        let x = head.x  - PORT_WIDTH /2 + 6 * GAMEPLAY_SCALE;
        let y = head.y + TUBE_HEIGHT/2 + 20;

        let w = x - head.Linput.x;
        let h = head.Linput.y - y - PORT_HEIGHT/4;
        
        if(head.Linput.port.id!="TRUE" && head.Linput.port.id!="FALSE"){
            
            if(head.Linput.getOutput() && head.Linput.outputVisualize){
                this.context.drawImage(this.horizontalTube[ON], head.Linput.x + TUBE_WIDTH, y, w - TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.leftTube[ON], head.Linput.x, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[ON], head.Linput.x - 1, y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }else{

                
                this.context.drawImage(this.horizontalTube[OFF], head.Linput.x + TUBE_WIDTH, y, w - TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.leftTube[OFF], head.Linput.x, y, TUBE_WIDTH, TUBE_HEIGHT);
                this.context.drawImage(this.verticalTube[OFF], head.Linput.x - 1,  y + TUBE_HEIGHT - 2, TUBE_WIDTH, h);
            }
        }
        
    }

    //desenha a porta
    paintPort(head){

        if(head.outputVisualize){
            if(head.getOutput()){

                if(head.mod){
                    //caso a porta seja modificavel e esteja ligada
    
                    if(head.port.id == "AND"){
                        this.context.drawImage(this.andModPort[ON], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                    }else if(head.port.id == "OR") {
                        this.context.drawImage(this.orModPort[ON], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                    }
    
                }else{
                    //caso a porta não seja modificavel e esteja ligada
                    if(head.port.id == "AND"){
                        this.context.drawImage(this.andNoModPort[ON], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                    }else if(head.port.id == "OR"){
                        this.context.drawImage(this.orNoModPort[ON], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                    }else{
                        this.paintLeaf(head);
                    }
                }
    
            }else{
    
                
                if(head.mod){
                //caso a porta seja modificavel e esteja desligada
                    
                    if(head.port.id == "AND"){
                        this.context.drawImage(this.andModPort[OFF], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                    }else if(head.port.id == "OR"){
                        this.context.drawImage(this.orModPort[OFF], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                    }
    
                }else{
                    //caso a porta não seja modificavel e esteja desligada
    
                    if(head.port.id == "AND"){
                        this.context.drawImage(this.andNoModPort[OFF], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                    }else if(head.port.id == "OR"){
                        this.context.drawImage(this.orNoModPort[OFF], head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                    }else{
                        this.paintLeaf(head);
                    }
    
                }
            }
        }else{

            if(head.mod){
                //caso a porta seja modificavel e esteja ligada
    
                if(head.port.id == "AND"){
                    this.context.drawImage(this.andModPortNoOuputVisualize, head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR") {
                    this.context.drawImage(this.orModPortNoOuputVisualize, head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }
    
            }else{
                //caso a porta não seja modificavel e esteja ligada
                if(head.port.id == "AND"){
                    this.context.drawImage(this.andNoModPortNoOuputVisualize, head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else if(head.port.id == "OR"){
                    this.context.drawImage(this.orNoModPortNoOuputVisualize, head.x - PORT_WIDTH/2, head.y, PORT_WIDTH, PORT_HEIGHT);
                }else{
                    this.paintLeaf(head);
                }
            }
        }

        if(head.deniel){
            this.context.drawImage(this.deniedPinImage, head.x, head.y + PORT_HEIGHT/1.5 + DENIED_PIN_HEIGHT/2, DENIED_PIN_WIDTH, DENIED_PIN_HEIGHT)
        }
    }

    //desenha os nós folhas que são portas booleanas
    paintLeaf(head){
        if(head.port.id == "TRUE"){
            this.context.drawImage(this.energyFont[ON], head.x - LEAF_WIDTH/2, head.y - LEAF_HEIGHT/2, LEAF_WIDTH, LEAF_HEIGHT);
        }else if(head.port.id == "FALSE"){
            this.context.drawImage(this.energyFont[OFF], head.x - LEAF_WIDTH/2, head.y - LEAF_HEIGHT/2, LEAF_WIDTH, LEAF_HEIGHT);
        }
    }

    //desenha linha
    paintLine(x1, y1, x2, y2){
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    /*Desenha os atalhos para os nodes
    conectados ao node recebido pelo método
    além de iniciar a posição de seus
    botões*/
    paintShortcut(node){
        let angle;
        this.context.translate(node.x - SHORTCUT_WIDTH/2, node.y + PORT_HEIGHT);


        if(node.output != null){
            this.context.drawImage(this.shortcutImage, 0, 0, SHORTCUT_HEIGHT, SHORTCUT_HEIGHT);

            this.shortcutUI.setOutputButtonPosition(node.x - SHORTCUT_WIDTH/2, node.y + PORT_HEIGHT,  SHORTCUT_WIDTH, SHORTCUT_HEIGHT);
        }else{
            this.shortcutUI.setOutputButtonPosition(-100,-100,  0, 0);
        }

        if(node.Linput!=null && node.Linput.port.id!="TRUE" && node.Linput.port.id!="FALSE"){
           
                
            this.context.translate(- EDGE, 0);
                
            this.context.rotate(-Math.PI/2);
            this.context.drawImage(this.shortcutImage, 0 - SHORTCUT_WIDTH, 0 + SHORTCUT_HEIGHT, SHORTCUT_WIDTH, SHORTCUT_HEIGHT);
            this.context.rotate(+Math.PI/2);

            this.context.translate(+ EDGE, 0);

            this.shortcutUI.setLinputButtonPosition(node.x + SHORTCUT_WIDTH - EDGE, node.y + PORT_HEIGHT,  SHORTCUT_WIDTH, SHORTCUT_HEIGHT);
            
        }else{
            this.shortcutUI.setLinputButtonPosition(-100,-100,  0, 0);
        }

        if(node.Rinput!=null && node.Rinput.port.id!="TRUE" && node.Rinput.port.id!="FALSE"){
            
                
            this.context.translate(+ EDGE, 0);

            this.context.rotate(+Math.PI/2);
            this.context.drawImage(this.shortcutImage, 0, 0, SHORTCUT_HEIGHT, SHORTCUT_HEIGHT);
            this.context.rotate(-Math.PI/2);

            this.context.translate(- EDGE, 0);

            this.shortcutUI.setRinputButtonPosition(node.x - SHORTCUT_WIDTH*2 + EDGE, node.y + PORT_HEIGHT, SHORTCUT_WIDTH, SHORTCUT_HEIGHT);
            
        }else{
            this.shortcutUI.setRinputButtonPosition(-100,-100,  0, 0);
        }

        this.context.translate((node.x - SHORTCUT_WIDTH/2)*(-1), (node.y + PORT_HEIGHT)*(-1));
    }

    /*Calculo o angulo produzito por
    uma reta vertical que passa pela cordenada x
    de node1 e uma reta que intersecta node1 e
    node2*/
    angleCalculate(node1, node2){
        let x1 = 0;
        let y1 = -100 - node1.y;
        let x2 = node2.x - node1.x;
        let y2 = node2.y - node1.y + PORT_HEIGHT/2;

        let angle = Math.acos((x1*x2+y1*y2)/
                (Math.sqrt(x1*x1 + y1*y1)*Math.sqrt(x2*x2 + y2*y2)));

        angle *= 57.2958;

        if(x2 >= 0){
            return angle;
        }else{
            return -angle;
        }
    }

    executeShortcut(){
        this.inCutScene = true;
    }

    //Calcula o offset do frame
    offSetRecalculate(){
        if(this.focus){
            if(!this.inCutScene){
                if(this.horizontalPositiveMove){
                    this.offsetX += 10;
                }else if(this.horizontalNegativeMove){
                    this.offsetX -= 10;
                }
            
                if(this.verticalPositiveMove){
                    this.offsetY += 10;
                }else if(this.verticalNegativeMove){
                    this.offsetY -= 10;
                }
            }else{
                if(this.currentNode != null){
                    if(GAME_CANVA_WIDTH/2 - 10 <= this.currentNode.x && GAME_CANVA_WIDTH/2 + 10 >= this.currentNode.x &&
                    GAME_CANVA_HEIGHT/2 - 10 <= this.currentNode.y && GAME_CANVA_HEIGHT/2 + 10 >= this.currentNode.y){
                        this.inCutScene = false
                        this.horizontalPositiveMove = false;
                        this.horizontalNegativeMove = false;
                        this.verticalPositiveMove = false;
                        this.verticalNegativeMove = false ;
                    }else{
                        if(GAME_CANVA_WIDTH/2 - 10 > this.currentNode.x ){
                            this.offsetX -= 10;
                        }else if( GAME_CANVA_WIDTH/2 + 10 < this.currentNode.x ){
                            this.offsetX += 10;
                        }
                        
                        if(GAME_CANVA_HEIGHT/2 - 10 > this.currentNode.y ){
                            this.offsetY -= 10;
                        }else if( GAME_CANVA_HEIGHT/2 + 10 < this.currentNode.y ){
                            this.offsetY += 10;
                        }
                    }
                }
            }
        }
    }

    /*Define o nó acessador mais recentemente*/
    setCurrentNode(node){
        this.currentNode = node;
    }

    /*Retorna o offset horizontal*/
    getOffsetX(){
        return this.offsetX;
    }

    /*Retornao offset vertical*/
    getOffsetY(){
        return this.offsetY;
    }
    
    /*Define o centro do offset*/
    setOffsetCenter(x,y){
        this.offsetX = (x)  - GAME_CANVA_WIDTH/2;
        this.offsetY = (y);
    }

    /*Define todos os atributos de movimetação como
    false*/
    stopCam(){
        this.horizontalNegativeMove = false;
        this.horizontalPositiveMove = false;
        this.verticalNegativeMove = false;
        this.verticalPositiveMove = false;
    }

    /*Recupera o foco da UI*/
    requestFocus(){
        this.focus = true;
    }

    /*Libera o foco da UI*/
    releaseFocus(){
        this.focus = false;
    }

    setLevel(level){
        this.level = level;
        this.level.setUI(this);
    }
    
    replaceLevel(level){
        this.inTrasition = true;
        this.setLevel(level);
        this.canva.addEventListener('click', function(event){
            canvaGamaplayHandleClick(event, level);
        });
    }

    setTreeHead(head){
        this.treeHead = head;
    }

    executeTransition(){
        this.inTransition = true;
    }

}