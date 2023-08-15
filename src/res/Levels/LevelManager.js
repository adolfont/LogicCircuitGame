import {Level_1} from "./Level_1.js"
import { Level_Random } from "./Level_Random.js";

export class LevelManager{
    currentLevel;
    level = 2;
    playerScore = 0;

    constructor(){
        this.currentLevel = new Level_1(this);
    }

    getCurrentLevel(){
        return this.currentLevel;
    }

    goToNextLevel(){
        this.level+=1;
        this.playerScore = this.currentLevel.gameTree.getScore();
        this.currentLevel = new Level_Random(this, this.level, Math.ceil(this.level*0.75),Math.floor(this.playerScore*0.002));
        this.currentLevel.gameTree.setInitScore(this.playerScore);
    }
}