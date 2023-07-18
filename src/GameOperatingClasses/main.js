import {handleClick} from "../UIClasses/haddleListener.js";
import {GameplayUi} from "../UIClasses/GameplayUi.js";
import {GameTree} from "./Gameplay/GameTree.js"

export class Main{
    context;
    wiondow;
    canva;
    gui;
    

    constructor(canva, window){
        this.canva =  canva;
        this.context = canva.getContext("2d");
        this.wiondow = window;
    }

    start(){
        let ui;
        let mousePositionX;
        let mousePositionY;

        let gameTree = new GameTree();
        gameTree.init(20,20);

        this.gui = new GameplayUi(this.canva, gameTree.G[0], gameTree.G.pop);
        ui = this.gui;
        this.canva.addEventListener('click', function(event){
            handleClick(event, gameTree.G, ui);
        })

        setInterval(()=>{
            this.gui.paintGameBoard(gameTree.G[0]);
        }, 10)
    }
}