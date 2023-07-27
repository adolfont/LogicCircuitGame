import { Level } from "./levelSuperClass.js";
import { GameTree } from "../../GameOperatingClasses/Gameplay/GameTree.js";

export class Level_1 extends Level{
    intervalCount = 0;
    eventString;
    
    constructor(levelMenager){
        super(levelMenager);
        let thisLevel = this;
        let jsonString = '[{    "id":"AND",    "mod":true,    "L":1,    "R":2    },    {        "id":"OR",        "mod":false,        "L":3,        "R":4            },                    {            "id":"AND",            "mod":false,            "L":5,            "R":6             },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    },        {        "id":"FALSE",        "mod":false,        "L": null,        "R": null    },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    }]';
        this.gameTree = new GameTree();
        this.gameTree.init(jsonString);
        this.inEventFlag = true;

        this.scripts =[
            this.script_1,
            this.script_2
        ];

        this.gameTree.G[0].addOutputListener(function script(node){

            if(node.getOutput()){
                thisLevel.inEventFlag = true;
                thisLevel.scriptIndex = 1;

            }else{
                thisLevel.inEventFlag = false;
            }
        }, this.gameTree.nodesWithListener);

    }

    /*script de evento do Level*/
    script_1(level){
        if(level.intervalCount<500){
            level.eventString = "Obeserve a porta mais a direta na base. Suas duas entradas são verdadeiras e por isso, sendo uma porta AND, sua saída é verdadeira!"
            level.UI.setCurrentNode(level.gameTree.G[level.gameTree.G.length - 1]);
            level.UI.executeShortcut();
            level.UI.inCutScene = true;
        }else if (level.intervalCount<1000){

            level.eventString = "Porém, a mesma porta tem uma saída diferente caso qualquer uma das suas entradas seja falsa."
            level.UI.setCurrentNode(level.gameTree.G[level.gameTree.G.length - 2]);
            level.UI.executeShortcut();
            level.UI.inCutScene = true;
        }else{
            level.UI.inCutScene = false;
            level.eventString = "Tente interagir com a porta mais ao topo da arvore.";
        }

        level.intervalCount ++;
    }

    script_2(level){
        if(level.intervalCount<1000){
            level.intervalCount = 1000;
        }
        level.UI.setCurrentNode(level.gameTree.G[0]);
        level.UI.executeShortcut();

        if(level.intervalCount<1500){
            level.eventString = "Parabens! Você conseguiu energizar a torre!";
        }else if(level.intervalCount<2000){
            level.eventString = "Agora observe a porta OR no topo. Ela terá sua saída verdadeira sempre que qualquer uma de suas entradas for verdadeira.";
        }else{
            level.inEventFlag = false;
            level.finalizeLevel();
        }

        level.intervalCount ++;
    }
}