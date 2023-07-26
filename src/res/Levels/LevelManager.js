import {Level_1} from "./Level_1.js"
import { Level_Random } from "./Level_Random.js";

export class LevelManager{
    currentLevel;

    constructor(){
        this.currentLevel = new Level_1(this);
    }

    getCurrentLevel(){
        return this.currentLevel;
    }

    goToNextLevel(){
        this.currentLevel = new Level_Random(this);
    }
}