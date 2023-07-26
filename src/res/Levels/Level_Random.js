import { Level } from "./levelSuperClass.js";
import { GameTree } from "../../GameOperatingClasses/Gameplay/GameTree.js";

export class Level_Random extends Level{
    constructor(levelMenager){
        super(levelMenager);
        this.gameTree = new GameTree();
        this.gameTree.initRandomized(20,20);
    }
}