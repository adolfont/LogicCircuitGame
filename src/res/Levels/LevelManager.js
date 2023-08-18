import {Level_1} from "./Level_1.js"
import { Level_Random } from "./Level_Random.js";
import {PinsManager} from "../PinsManager.js"

const NEW_PIN_POINTS_INTERVAL = 300;

export class LevelManager{
    currentLevel;
    level = 1;
    pinManager = new PinsManager();
    playerScore = 200;

    constructor(){
        this.currentLevel = new Level_1(this);
    }

    getCurrentLevel(){
        return this.currentLevel;
    }

    goToNextLevel(){
        this.level+=1;
        this.playerScore = this.currentLevel.gameTree.getScore();
        this.currentLevel = new Level_Random(this, this.level, Math.floor(this.level*0.9),Math.floor(this.playerScore*0.002));
        this.currentLevel.gameTree.setInitScore(this.playerScore);
        this.pinsUpdate();
    }

    pinsUpdate(){
        if(Math.floor(this.playerScore/NEW_PIN_POINTS_INTERVAL)>this.pinManager.denielPinCount){
            this.pinManager.denielPinCount++;
            this.pinManager.addDenielPin();
        }
    }

    getPinManager(){
        return this.pinManager;
    }
}