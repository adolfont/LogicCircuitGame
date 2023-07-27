import { FalsePort } from "../Ports/FalsePort.js";
import {Node} from "./Node.js";
import { TruePort } from "../Ports/TruePort.js";
import { AndPort } from "../Ports/AndPort.js"; 
import { OrPort } from "../Ports/OrPort.js"; 
import { getRandomIntInclusive } from "../auxFuncs.js";

const AND = 1;
const OR = 0;

const AND_SCORE = 3;
const OR_SCORE = 1


/*Representa o funcionamento interno do jogo,
sem interface de usuario, somente suas estruturas de dados.*/
export class GameTree{
    G = []; //todos os nós da arvore de jogo
    nodesWithListener = [];
    maximumScore = 0;
    currentScore = 0;


    ports = []; //todas as portas possiveis de serem
                // assumidas pelos nós
                
    TruePortNode = new Node();
    FalsePortNode = new Node();
    

    constructor(){
        this.ports[0] =(new OrPort());
        this.ports.push(new AndPort());

        this.TruePortNode.port = new TruePort();
        this.FalsePortNode.port = new FalsePort()
    }

    listen(){
        if(this.nodesWithListener[0]!=undefined){
            for(let i = 0; i<this.nodesWithListener.length ; i++){
                this.nodesWithListener[i].listen();
            }
        }
    }

    /*nNode é o numero total de nós que a arvore
    do jogo deve ter, enqquanto nMod é o numero 
    de nós modificaveis que a arvore de jogo deve ter.

    obs.: nós folas não inclusos*/
    initRandomized(nNode, nMod){
        this.G[0] = new Node();
        while(this.G.length<nNode){
            this.genRandomTree(this.G[this.G.length-1], nNode)
        }
        this.initTree(nNode, nMod);
        console.log(this.maximumScore);
    }
    
    init(stringJson){
        let jsonNodes = JSON.parse(stringJson);
        
        this.G[0] = new Node();

        this.initTreeJSON(0, this.G[0], jsonNodes);
        console.log(this.maximumScore);
    }

    initTreeJSON(i, node,jsonNodes){

        if(jsonNodes[i].id == "AND"){
            node.port = this.ports[AND];
        }else if(jsonNodes[i].id == "OR"){
            node.port = this.ports[AND];
        }

        if(jsonNodes[i].mod){
            node.mod = true;
            node.vet = this.ports;
        }

        if(jsonNodes[i].L!=null){
            if(jsonNodes[jsonNodes[i].L].id == "TRUE"){
                node.Linput = this.TruePortNode;
            }else if(jsonNodes[jsonNodes[i].L].id == "FALSE"){
                node.Linput = this.FalsePortNode;
            }else{
                node.Linput = new Node()
                node.Linput.output = node;
                this.G.push(node.Linput);
                this.initTreeJSON(jsonNodes[i].L, node.Linput, jsonNodes); 
            }
        }

        if(jsonNodes[i].R!=null){
            if(jsonNodes[jsonNodes[i].R].id == "TRUE"){
                node.Rinput = this.TruePortNode;
            }else if(jsonNodes[jsonNodes[i].R].id == "FALSE"){
                node.Rinput = this.FalsePortNode;
            }else{
                node.Rinput = new Node()
                node.Rinput.output = node;
                this.G.push(node.Rinput);
                this.initTreeJSON(jsonNodes[i].R, node.Rinput, jsonNodes);
            }
        }

        if(node.Rinput != null && node.Linput != null){
            node.bifurcation = node.Rinput.bifurcation + node.Linput.bifurcation + 1;
        }

        this.updateMaximumScore(node);
    }


    /*Método que percorre toda a arvore
    criando novos nós. i é o contador de nós criados,
    enquanto maxNodes é o número máximo de nós*/
    genRandomTree(node, maxNodes){

        let n = getRandomIntInclusive(0,5);
        
        if(n == 1){
            if(this.G.length + 1 <= maxNodes){
        
                node.Linput = new Node();
                node.Linput.output = node;
                this.G.push(node.Linput);
                this.genRandomTree(node.Linput, maxNodes);
    
            }
    
            if(this.G.length + 1 <= maxNodes){
               
                node.Rinput = new Node();
                node.Rinput.output = node;
                this.G.push(node.Rinput);
                this.genRandomTree(node.Linput, maxNodes);
    
            }
        }else if(n == 2){
            if(this.G.length + 1 <= maxNodes){
           
                node.Rinput = new Node();
                node.Rinput.output = node;
                this.G.push(node.Rinput);
                this.genRandomTree(node.Rinput, maxNodes);
    
            }

            if(this.G.length + 1 <= maxNodes){
        
                node.Linput = new Node();
                node.Linput.output = node;
                this.G.push(node.Linput);
                this.genRandomTree(node.Linput, maxNodes);
    
            }
        }else{
            if(this.G.length < 3){
                this.genRandomTree(node,maxNodes);
            }
        }

        
    }

    /*inicializa os nós da arvore*/
    initTree(nNode, nMod){
        this.initLeaf(this.G[0]);

        /*caso todos os nós possan ser modificados*/
        if(nNode == nMod){
            for(let i = 0 ; i < this.G.length ; i++){
                this.G[i].setMod(this.ports);
                if(getRandomIntInclusive(0,1) == 1){
                    this.G[i].modify();
                }
                
                this.updateMaximumScore(this.G[i]);
            }
        }

        /*caso nMod<nNode*/
        else{
            let modCount = 0;
            let index;

            /*Escolhe aleatoriamente os nós modificaveis*/
            while(modCount < nMod){
                index = getRandomIntInclusive(0, this.G.length - 1);

                if(this.G[index].mod == false){
                    this.G[index].setMod(this.ports);
                    modCount++;
                }
            }

            /*define a porta dos nós não modificaveis*/
            for(let i = 0 ; i<nNode ; i++){
                if(this.G[i].mod == false){
                    this.G[i].port = this.getRandomPort();
                }
                
                this.updateMaximumScore(this.G[i]);
            }
        }

    }

    /*incializa os nós folhas e define o valor de bifurcation para
    todos os nós da arvore*/
    initLeaf(node){
        if(node.Linput == null){
            node.Linput = this.getRandomBooleanPortNode();
        }else{
            this.initLeaf(node.Linput);
        }

        if(node.Rinput == null){
            node.Rinput = this.getRandomBooleanPortNode();
        }else{
            this.initLeaf(node.Rinput);
        }

        if(node.Rinput != null && node.Linput != null){
            node.bifurcation = node.Rinput.bifurcation + node.Linput.bifurcation + 1;
        }
    }

    /*retorna uma porta aleatoria*/
    getRandomPort(){
        let n = getRandomIntInclusive(0,1);

        return this.ports[n];
    }

    /*retorna uma porta booleana aleatoria*/
    getRandomBooleanPortNode(){
        let n = getRandomIntInclusive(0,1);

        

        if(n == 0){
            return this.TruePortNode;
        }
        
        else if(n == 1){
            return this.FalsePortNode;
        }
    }
    
    updateMaximumScore(node){
        let score = 0;
        if(node.port.id == "AND"){
            score = AND_SCORE;
        }else if(node.port.id == "OR"){
            score = OR_SCORE;
        }

        this.maximumScore+=score;
    }
}