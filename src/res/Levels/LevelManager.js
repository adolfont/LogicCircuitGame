import {Level_1} from "./Level_1.js"

export class LevelManager{
    currentLevel;

    constructor(){
        this.currentLevel = new Level_1();
    }

    getCurrentLevel(){
        return this.currentLevel;
    }
}