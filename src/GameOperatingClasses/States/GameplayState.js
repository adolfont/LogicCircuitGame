import {canvaGamaplayHandleClick, canvaGamaplayHandleMove} from "../../UIClasses/haddleListener.js";
import { canvaMiniMapHandleClick } from "../../UIClasses/haddleListener.js";
import {GameplayUi} from "../../UIClasses/GameplayUi.js";
import {GameTree} from "../Gameplay/GameTree.js"
import { GameplayMapUi } from "../../UIClasses/GameplayMapUI.js";
import { canvaMiniMapHandleMove } from "../../UIClasses/haddleListener.js";

export class GameplayState{
    wiondow;

    gameplayCanva;
    mapCanva;

    gameplayContext;
    mapContext;

    gameplayGui;
    mapUi;

    gameTree;

    constructor(canvaGameplay, canvaMap, window){
        this.gameplayCanva =  canvaGameplay;
        this.gameplayContext = canvaGameplay.getContext("2d");
        this.mapCanva = canvaMap;
        this.mapContext = canvaMap.getContext("2d");
        this.wiondow = window;
    }

    start(){
        let mousePositionX;
        let mousePositionY;
        let state = this;

        let jsonString = '[{    "id":"AND",    "mod":true,    "L":1,    "R":2    },    {        "id":"OR",        "mod":false,        "L":3,        "R":4            },                    {            "id":"AND",            "mod":false,            "L":5,            "R":6             },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    },        {        "id":"FALSE",        "mod":false,        "L": null,        "R": null    },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    }]';

        this.gameTree = new GameTree();
        this.gameTree.init(jsonString);

        this.gameplayGui = new GameplayUi(this.gameplayCanva, this.gameTree.G[0], this.gameTree.G.pop);

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
            this.gameplayGui.paintGameBoard(this.gameTree.G[0]);
            this.mapUi.paintGameBoard(this.gameTree.G[0]);
        }, 10)

    }
}