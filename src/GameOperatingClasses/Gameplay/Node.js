import {AndPort} from "../Ports/AndPort.js";
import {OrPort} from "../Ports/OrPort.js";
import { TruePort } from "../Ports/TruePort.js";
import {FalsePort} from "../Ports/FalsePort.js"

export class Node{
    gameTree;
    x = 0;
    y = 0;
    xInMap = 0;
    yInMap = 0;
    output = null;
    Linput = null;
    Rinput = null;
    port; //a porta atual do nó
    mod = false //define se o nó pode ou não se modificado
    vet = []; /* caso mod == true, define quais portas o atributo
        port pode assumir*/
    portIndex = 0; //define o elemento em vet
    outputVisualize = true;
    deniel = false;

    bifurcation = 0;    /*O peso que mede a quantide de nós
        em que seus filhos não são folhas,
        é utilizado para definir o espaçamento 
        horizontal e vertical entre o nó pai e o nó filho*/

    constructor(gameTree){
        this.gameTree = gameTree;
    }

    //retorna a saída da porta
    getOutput(){
        if(this.deniel){
            return !(this.port.result(this.Linput, this.Rinput));
        }else{
            return this.port.result(this.Linput, this.Rinput);
        }
    }

    //define o nó como modificavel
    setMod(vet){
        this.mod = true;
        this.vet = vet;
        this.portIndex = vet.length - 1;
        this.port = vet[this.portIndex];
    }

    //muda a porta do nó
    modify(){
        //Por que - 1? Sem está dando problema de overflow, mas não sei porque
        if(this.portIndex < this.vet.length - 1){
            this.portIndex++;
        }else{
            this.portIndex = 0;
        }
        
        this.port = this.vet[this.portIndex];

        this.gameTree.scoreUpdate();
    }

    denielApply(){
        this.deniel = true;
        this.gameTree.scoreUpdate();
    }

    addOutputListener(script, vetListeningNodes){
        this.script = script;

        if(vetListeningNodes[0] == undefined){
            vetListeningNodes[0] = this;
        }else{
            vetListeningNodes.push(this);
        }
    }

    listen(){
        this.script(this);
    }
}