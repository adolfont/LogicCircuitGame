import {handleClick} from "../../UIClasses/haddleListener.js";
import {GameplayUi} from "../../UIClasses/GameplayUi.js";
import {GameTree} from "../Gameplay/GameTree.js"
import { GameplayMapUi } from "../../UIClasses/GameplayMapUI.js";

export class GameplayState{
    gameplayCanva;
    wiondow;
    gameplayContext;
    mapCanva;
    mapContext;

    gameplayGui;
    mapUi;
    

    constructor(canvaGameplay, canvaMap, window){
        this.gameplayCanva =  canvaGameplay;
        this.gameplayContext = canvaGameplay.getContext("2d");
        this.mapCanva = canvaMap;
        this.mapContext = canvaMap.getContext("2d");
        this.wiondow = window;
    }

    start(){
        let gameplayUi;
        let mousePositionX;
        let mousePositionY;

        let gameTree = new GameTree();
        gameTree.init(20,20);

        this.gameplayGui = new GameplayUi(this.gameplayCanva, gameTree.G[0], gameTree.G.pop);
        gameplayUi = this.gameplayGui;
        this.gameplayCanva.addEventListener('click', function(event){
            handleClick(event, gameTree.G, gameplayUi);
        })

        this.mapUi = new GameplayMapUi(this.mapCanva, gameTree.G[0], gameTree.G.pop);

        setInterval(()=>{
            this.gameplayGui.paintGameBoard(gameTree.G[0]);
            this.mapUi.paintGameBoard(gameTree.G[0]);
        }, 10)
        

        

    }
}