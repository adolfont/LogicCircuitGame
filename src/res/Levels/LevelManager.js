import {Level_1} from "./Level_1.js"
import { Level_Random } from "./Level_Random.js";

export class LevelManager{
    currentLevel;
    level = 1;

    constructor(){
        this.currentLevel = new Level_1(this);
    }

    getCurrentLevel(){
        return this.currentLevel;
    }

    goToNextLevel(){
        this.level+=3;
        this.currentLevel = new Level_Random(this,this.level, Math.floor(this.level*0.9));
    }
}