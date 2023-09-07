import { DIALOG_BOX_TYPE, IMG_CARD_BOX_TYPE, NONE_TYPE, Level } from "./levelSuperClass.js";
import { GameTree } from "../../GameOperatingClasses/Gameplay/GameTree.js";
export class Level_1 extends Level{
    intervalCount = 0;
    eventString;
    imgCard = new Image();

    
    constructor(levelMenager){
        super(levelMenager);
        let thisLevel = this;
        let jsonString = '[{    "id":"AND",    "mod":true,    "L":1,    "R":2    },    {        "id":"OR",        "mod":false,        "L":3,        "R":4            },                    {            "id":"AND",            "mod":false,            "L":5,            "R":6             },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    },        {        "id":"FALSE",        "mod":false,        "L": null,        "R": null    },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    },    {        "id":"TRUE",        "mod":false,        "L": null,        "R": null    }]';
        this.gameTree = new GameTree(0);
        this.gameTree.init(jsonString);
        this.inEventFlag = true;
        this.scriptIndex = 0;

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
    
    /*ISSO AQUI PRECISA SER REVISTO NÃO ESTÁ FUNCIONANDO*/
    script_1(level){
        if(level.intervalCount==0){
            //level.imgCard.src = "/src/res/tutorialCards/tutorial1.png";
            level.imgCard.src = "/LogicCircuitGame/src/res/tutorialCards/tutorial1.png";
            level.UI.drawTemporaryImage(level.imgCard,300,300,240);
            level.UI.inCutScene = true;
            level.event = IMG_CARD_BOX_TYPE;
        }else if (level.intervalCount==400){
            //level.imgCard.src = "/src/res/tutorialCards/tutorial2.png";
            level.imgCard.src = "/LogicCircuitGame/src/res/tutorialCards/tutorial2.png";
            level.UI.drawTemporaryImage(level.imgCard,300,300,490);
            level.UI.inCutScene = true;
            level.event = IMG_CARD_BOX_TYPE;
        }else if (level.intervalCount==800){
            //level.imgCard.src = "/src/res/tutorialCards/tutorial3.png";
            level.imgCard.src = "/LogicCircuitGame/src/res/tutorialCards/tutorial3.png";
            level.UI.drawTemporaryImage(level.imgCard,300,300,740);
            level.UI.inCutScene = true;
            level.event = IMG_CARD_BOX_TYPE;
        }else if (level.intervalCount==1200){
            //level.imgCard.src = "/src/res/tutorialCards/tutorial4.png";
            level.imgCard.src = "/LogicCircuitGame/src/res/tutorialCards/tutorial4.png";
            level.UI.drawTemporaryImage(level.imgCard,300,300,990);
            level.UI.inCutScene = true;
            level.event = IMG_CARD_BOX_TYPE;
        }else if(level.intervalCount>1600){

            if(level.intervalCount<2000){
                level.eventString = "Obeserve a porta mais a direita na base. Suas duas entradas são verdadeiras e por isso, sendo uma porta AND, sua saída é verdadeira!"
                level.UI.setCurrentNode(level.gameTree.G[level.gameTree.G.length - 1]);
                level.UI.executeShortcut();
                level.UI.inCutScene = true;
                level.event = DIALOG_BOX_TYPE;
            }else if(level.intervalCount<2400){
                level.eventString = "Porém, a mesma porta tem uma saída diferente caso qualquer uma das suas entradas seja falsa."
                level.UI.setCurrentNode(level.gameTree.G[level.gameTree.G.length - 2]);
                level.UI.executeShortcut();
                level.UI.inCutScene = true;
                level.event = DIALOG_BOX_TYPE;
            }else{
                level.UI.inCutScene = false;
                level.eventString = "Tente interagir com a porta mais ao topo da arvore.";
                level.event = DIALOG_BOX_TYPE;
            }

        }

        level.intervalCount ++;
    }

    script_2(level){
        if(level.intervalCount<3000){
            level.intervalCount = 3000;
        }
        level.UI.setCurrentNode(level.gameTree.G[0]);
        level.UI.executeShortcut();

        if(level.intervalCount<3400){
            level.eventString = "Parabens! Você conseguiu energizar a torre!";
            level.event = DIALOG_BOX_TYPE;
        }else if(level.intervalCount<3800){
            level.eventString = "Agora observe a porta OR no topo. Ela terá sua saída verdadeira sempre que qualquer uma de suas entradas for verdadeira.";
            level.event = DIALOG_BOX_TYPE;
        }else{
            level.inEventFlag = false;
            level.finalizeLevel();
        }

        level.intervalCount ++;
    }
}