import {canvaGamaplayHandleClick, canvaGamaplayHandleMove} from "../../UIClasses/haddleListener.js";
import { canvaMiniMapHandleClick } from "../../UIClasses/haddleListener.js";
import {GameplayUi} from "../../UIClasses/GameplayUi.js";
import {GameTree} from "../Gameplay/GameTree.js"
import { GameplayMapUi } from "../../UIClasses/GameplayMapUI.js";
import { canvaMiniMapHandleMove } from "../../UIClasses/haddleListener.js";
import {LevelManager} from "../../res/Levels/LevelManager.js"

export class GameplayState{
    wiondow;

    gameplayCanva;
    mapCanva;

    gameplayContext;
    mapContext;

    gameplayGui;
    mapUi;

    gameTree;
    levelManager;
    currentLevel;

    constructor(canvaGameplay, canvaMap, window){
        this.gameplayCanva =  canvaGameplay;
        this.gameplayContext = canvaGameplay.getContext("2d");
        this.mapCanva = canvaMap;
        this.mapContext = canvaMap.getContext("2d");
        this.wiondow = window;
        this.levelManager = new LevelManager();
        this.currentLevel = this.levelManager.getCurrentLevel();
    }

    start(){
        let mousePositionX;
        let mousePositionY;
        let state = this;

        this.gameTree = this.currentLevel.getGameTree();

        this.gameplayGui = new GameplayUi(this.gameplayCanva, this.gameTree.G[0], this.currentLevel);

        this.gameplayCanva.addEventListener('click', function(event){
            canvaGamaplayHandleClick(event, state);
        })

        this.mapUi = new GameplayMapUi(this.mapCanva, this.gameTree.G[0], this.gameplayGui);
        this.mapCanva.addEventListener('click', function(event){
            canvaMiniMapHandleClick(event, state);
        });

        this.mapCanva.addEventListener('mousemove', (event)=>{
            canvaMiniMapHandleMove(event, state);
        });

        setInterval(()=>{
            this.gameplayGui.paint();
            this.mapUi.paintGameBoard(this.gameTree.G[0]);
        }, 10)

    }
}