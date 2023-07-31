import { Level } from "./levelSuperClass.js";
import { GameTree } from "../../GameOperatingClasses/Gameplay/GameTree.js";

export class Level_Random extends Level{
    intervalCount = 0;
    nodeOfInterest = null;

    constructor(levelMenager, nNodes, nMod, nNoVisualizeOutput){
        super(levelMenager);
        let thisLevel = this;
        this.gameTree = new GameTree(this.levelMenager.playerScore);
        this.gameTree.initRandomized(nNodes,nMod,nNoVisualizeOutput);
        this.inEventFlag = true;

        this.scripts =[
            this.script_1,
            this.script_2,
            this.script_3
        ];

        if(nNoVisualizeOutput == 1){
            for(let i = 0; i<this.gameTree.G.length ; i++){
                if(this.gameTree.G[i].outputVisualize == false){
                    this.nodeOfInterest = this.gameTree.G[i];
                }
            }
        }

        this.gameTree.G[0].addOutputListener(function script(node){
            if(node.getOutput()){
                thisLevel.inEventFlag = true;
                thisLevel.scriptIndex = 1;
            }
        }, this.gameTree.nodesWithListener);

    }

     /*script de evento do Level*/
    script_1(level){
        if(level.nodeOfInterest!=null && level.intervalCount == 0){
            level.scriptIndex = 2;
        }
        
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

    script_3(level){
        if(level.intervalCount<100){
            level.UI.setCurrentNode(level.nodeOfInterest);
            level.UI.executeShortcut();
        }
        else if(level.intervalCount<500){
            level.eventString = "Observe a esta porta: não é possível visualizar a sua saída!"
            level.UI.inCutScene = true;
        }else if (level.intervalCount<1000){

            level.eventString = "Logo, você terá mais trabalho para resolve-la. Tente deduziar a sua saída apartir de suas entradas."
            level.UI.inCutScene = true;
        }else{
            level.UI.inCutScene = false;
            level.intervalCount = 0;
            level.scriptIndex = 0;
        }
        
        level.intervalCount++;
    }
}