import { Level } from "./levelSuperClass.js";
import { GameTree } from "../../GameOperatingClasses/Gameplay/GameTree.js";

export class Level_1 extends Level{
    inEventFlag = true;
    intervalCount = 0;
    scriptIndex = 0;
    scripts = [
        this.script_1
    ]
    eventString;
    
    constructor(){
        super();
        let thisLevel = this;
        let jsonString = '[{    "id":"AND",    "mod":true,    "L":1,    "R":2    },    {        "id":"OR",        "mod":false,        "L":3,        "R":4            },                    {            "id":"AND",            "mod":false,            "L":5,            "R":6             },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    },        {        "id":"FALSE",        "mod":false,        "L": null,        "R": null    },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    }]';
        this.gameTree = new GameTree();
        this.gameTree.init(jsonString);

        this.gameTree.G[0].addOutputListener(function script(node){

            /*if(node.getOutput()){
                thisLevel.inEventFlag = true;

            }else{
                thisLevel.inEventFlag = false;
            }*/
        });

    }

    /*Executa o script do evento do level*/
    executeEvent(){
        this.scripts[this.scriptIndex](this);
    }

    /*script de evento do Level*/
    script_1(level){

        if(level.intervalCount<500){
            level.eventString = "Obeserve a porta mais a direta na base. Suas duas entradas são verdadeiras e por isso, sendo uma porta AND, sua saída é verdadeira!"
            level.UI.setCurrentNode(level.gameTree.G[level.gameTree.G.length - 1]);
            level.UI.executeShortcut();
        }else if (level.intervalCount<1000){

            level.eventString = "Porém, a mesma porta tem uma saída diferente caso qualquer uma das suas entradas seja falsa."
            level.UI.setCurrentNode(level.gameTree.G[level.gameTree.G.length - 2]);
            level.UI.executeShortcut();
        }else{
           level.inEventFlag = false; 
        }

        level.intervalCount ++;
    }

    inEvent(){
        return this.inEventFlag;
    }

    getEventString(){
        return this.eventString;
    }

    getGameTree(){
        return this.gameTree;
    }
}