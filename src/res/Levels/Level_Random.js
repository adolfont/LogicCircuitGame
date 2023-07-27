import { Level } from "./levelSuperClass.js";
import { GameTree } from "../../GameOperatingClasses/Gameplay/GameTree.js";

export class Level_Random extends Level{
    intervalCount = 0;

    constructor(levelMenager, nNodes, nMod){
        super(levelMenager);
        let thisLevel = this;
        this.gameTree = new GameTree();
        this.gameTree.initRandomized(nNodes,nMod);
        this.inEventFlag = true;

        this.scripts =[
            this.script_1,
            this.script_2
        ];

        this.gameTree.G[0].addOutputListener(function script(node){
            if(node.getOutput()){
                thisLevel.inEventFlag = true;
                thisLevel.scriptIndex = 1;
            }
        }, this.gameTree.nodesWithListener);
    }

     /*script de evento do Level*/
    script_1(level){

        
        if(level.intervalCount<500){
            level.UI.inCutScene = false;
            level.eventString = "Esse é um Nivel gerado de forma randomizada.";
        }else if (level.intervalCount<1000){

            level.UI.inCutScene = false;
            level.eventString = "Para finaliza-lo você deve energizar a torre!";
        }else{
            level.inEventFlag = false;
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
        }else{
            level.inEventFlag = false;
            level.finalizeLevel();
        }

        level.intervalCount ++;
    }
}