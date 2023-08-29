import {canvaGamaplayHandleClick, canvaGamaplayHandleMove} from "../../UIClasses/haddleListener.js";
import { canvaMiniMapHandleClick } from "../../UIClasses/haddleListener.js";
import {GameplayUi} from "../../UIClasses/GameplayUi.js";
import {GameTree} from "../Gameplay/GameTree.js"
import { GameplayMapUi } from "../../UIClasses/GameplayMapUI.js";
import { canvaMiniMapHandleMove } from "../../UIClasses/haddleListener.js";
import {LevelManager} from "../../res/Levels/LevelManager.js";
import { handleMouseDown } from "../../UIClasses/haddleListener.js";
import { handleMouseUp } from "../../UIClasses/haddleListener.js";
import { mapIsVisible } from "../config.js";

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

        this.gameplayGui = new GameplayUi(this.gameplayCanva, this.gameTree.G[0], this.currentLevel, this.levelManager.getPinManager());

        

        this.gameplayCanva.addEventListener('click', function(event){
            canvaGamaplayHandleClick(event, state);
        });


        this.gameplayCanva.addEventListener('mousedown', function(event){
            handleMouseDown(state.gameplayGui, event);
        });

        this.gameplayCanva.addEventListener('touchstart', function(event){
            handleMouseDown(state.gameplayGui, event);
        });

        this.gameplayCanva.addEventListener('mouseup', function(event){
            handleMouseUp();
        });

        this.gameplayCanva.addEventListener('touchend', function(event){
            handleMouseUp();
        });
        
        if(mapIsVisible){
            this.mapUi = new GameplayMapUi(this.mapCanva, this.gameTree.G[0], this.gameplayGui);
            this.mapCanva.addEventListener('click', function(event){
                canvaMiniMapHandleClick(event, state);
            });

            this.mapCanva.addEventListener('mousemove', (event)=>{
                canvaMiniMapHandleMove(event, state);
            });
        }
        
        


        setInterval(()=>{
            this.gameTree.listen()
            this.gameplayGui.paint();
            if(mapIsVisible){ 
                this.mapUi.paint();
            }

            //Caso o nivel tenha sido alterado
            if(this.currentLevel != this.levelManager.currentLevel){
                this.gameplayGui.setLevel(this.levelManager.getCurrentLevel());
                if(mapIsVisible){
                    this.mapUi.setLevel(this.levelManager.getCurrentLevel());
                }
                this.currentLevel = this.levelManager.getCurrentLevel();
                this.gameTree = this.currentLevel.getGameTree();
            }
        }, 10)

    }
}